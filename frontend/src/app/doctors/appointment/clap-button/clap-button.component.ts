import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DoctorService } from '../../../core/services/doctor.service';
import { Doctor } from '../../../core/models/doctor';


const minDeg = 1;
const maxDeg = 73;
const particlesClasses = [
  {
    class: 'pop-top'
  },
  {
    class: 'pop-top-left'
  },
  {
    class: 'pop-top-right'
  },
  {
    class: 'pop-bottom-right'
  },
  {
    class: 'pop-bottom-left'
  },
];

@Component({
  selector: 'app-clap-button',
  templateUrl: './clap-button.component.html',
  styleUrls: ['./clap-button.component.scss']
})
export class ClapButtonComponent implements OnInit, OnDestroy {
  @Input() doctor: Doctor;
  totalCount: number;
  accCounter: number;


  constructor(
    private doctorsService: DoctorService,
  ) { }

  ngOnInit() {
    this.accCounter = 0;
    this.totalCount = this.doctor.likes;
    console.log(this.totalCount);
    this.setupComponent();
  }

  setupComponent() {
    document.getElementById('totalCounter').innerText = this.totalCount.toString();
  }

  onMouserOver() {
    const sonarClap = document.getElementById('sonar-clap');
    sonarClap.classList.add('hover-active');
    setTimeout(() => {
      sonarClap.classList.remove('hover-active');
    }, 2000);
  }

  onClapClick() {
    const clap = document.getElementById('clap');
    const clickCounter = document.getElementById('clicker');
    const particles = document.getElementById('particles');
    const particles2 = document.getElementById('particles-2');
    const particles3 = document.getElementById('particles-3');
    clap.classList.add('clicked');
    this.upClickCounter();

    this.runAnimationCycle(clap, 'scale');

    if (!particles.classList.contains('animating')) {
      this.animateParticles(particles, 700);
    } else if (!particles2.classList.contains('animating')) {
      this.animateParticles(particles2, 700);
    } else if (!particles3.classList.contains('animating')) {
      this.animateParticles(particles3, 700);
    }
  }

  upClickCounter() {
    const clickCounter = document.getElementById('clicker');
    const totalClickCounter = document.getElementById('totalCounter');
    // this.totalCount = parseInt(totalClickCounter.innerText, 10);

    this.accCounter++;
    clickCounter.children[0].innerText = '+' + this.accCounter;
    totalClickCounter.innerText = (this.totalCount + this.accCounter).toString();

    if (clickCounter.classList.contains('first-active')) {
      this.runAnimationCycle(clickCounter, 'active');
    } else {
      this.runAnimationCycle(clickCounter, 'first-active');
    }
    this.runAnimationCycle(totalClickCounter, 'fader');
  }

  runAnimationCycle(el, className) {
    if (el && !el.classList.contains(className)) {
      el.classList.add(className);
    } else {
      el.classList.remove(className);
      void el.offsetWidth; // Trigger a reflow in between removing and adding the class name
      el.classList.add(className);
    }
  }

  runParticleAnimationCycle(el, className, duration) {
    if (el && !el.classList.contains(className)) {
      el.classList.add(className);
      setTimeout(() => {
        el.classList.remove(className);
      }, duration);
    }
  }

  animateParticles(particles, dur) {
    this.addRandomParticlesRotation(particles.id, minDeg, maxDeg);
    for (let i = 0; i < particlesClasses.length; i++) {
      this.runParticleAnimationCycle(particles.children[i], particlesClasses[i].class, dur);
    }
    // Boolean functionality only to activate particles2, particles3 when needed
    particles.classList.add('animating');
    setTimeout(() => {
      particles.classList.remove('animating');
    }, dur);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min  + 1)) + min;
  }

  addRandomParticlesRotation(particlesName, minDeg, maxDeg) {
    const particles = document.getElementById(particlesName);
    const randomRotationAngle = this.getRandomInt(minDeg, maxDeg) + 'deg';
    particles.style.transform = `rotate(${randomRotationAngle})`;
  }

  ngOnDestroy(): void {
    const totalClickCounter = document.getElementById('totalCounter');
    this.totalCount = parseInt(totalClickCounter.innerText, 10);
    this.doctor.likes = this.totalCount;
    this.doctorsService.updateDoctor(this.doctor)
      .subscribe(doc => console.log(doc));
  }
}
