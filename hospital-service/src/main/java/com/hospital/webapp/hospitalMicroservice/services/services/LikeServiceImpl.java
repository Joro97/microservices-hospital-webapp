package com.hospital.webapp.hospitalMicroservice.services.services;

import com.hospital.webapp.hospitalMicroservice.models.entity.Like;
import com.hospital.webapp.hospitalMicroservice.repositories.LikesRepository;
import com.hospital.webapp.hospitalMicroservice.services.interfaces.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeServiceImpl implements LikeService {
    private final int LIKES_PER_USER_LIMIT = 10;
    private final LikesRepository likesRepository;

    @Autowired
    public LikeServiceImpl(LikesRepository likesRepository) {
        this.likesRepository = likesRepository;
    }

    @Override
    public int getDoctorTotalLikes(String doctorUsername) {
        List<Like> doctorsTotal = this.likesRepository.findAllByDoctorUsername(doctorUsername);
        return doctorsTotal == null ? 0 : doctorsTotal.size();
    }

    @Override
    public int getPatientLikesForDoctor(String doctorUsername, String patientUsername) {
        return this.likesRepository.findAllByDoctorUsernameAndPatientUsername(doctorUsername, patientUsername).size();
    }

    @Override
    public boolean addLikeForDoctor(String doctorUsername, String patientUsername) {
        int doneLikes =
                this.likesRepository.findAllByDoctorUsernameAndPatientUsername(doctorUsername, patientUsername).size();

        System.out.println(String.format("Trying to add like for %s by %s.\nDone likes: %s", doctorUsername,
                patientUsername, doneLikes));
        if (doneLikes < LIKES_PER_USER_LIMIT) {
            Like newLike = new Like(doctorUsername, patientUsername);
            this.likesRepository.save(newLike);
            return true;
        }

        return false;
    }
}
