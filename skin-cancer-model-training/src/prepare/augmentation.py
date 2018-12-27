import os
import shutil
import numpy

from definitions import *
from keras.preprocessing.image import ImageDataGenerator

class LesionImageAugmentor:

    def __init__(self, output_path, training_path):
        self._output_path = output_path
        self._training_path = training_path
        self._aug_path = os.path.join(self._output_path, 'aug')
        self._aug_sub_path = os.path.join(self._aug_path, 'sub')

    # Not augmenting 'nv' label since it has many images for this label
    # in the data set.
    LABELS_FOR_AUG = ['mel', 'bkl', 'bcc', 'akiec', 'vasc', 'df']

    def augment_training_lesion_images(self):

        LOGGER.info("=== Augmenting images ===")

        for label in self.LABELS_FOR_AUG:
            LOGGER.info("== Augmenting images for label {}. ==".format(label))

            self._create_temporary_augmentation_dir()

            img_label = '/' + label

            img_list_for_label = os.listdir(self._training_path + img_label)

            for image_file_name in img_list_for_label:
                image_path = os.path.join(self._training_path + img_label, image_file_name)

                image_destination_path = os.path.join(self._aug_sub_path, image_file_name)

                shutil.copyfile(image_path, image_destination_path)

            LOGGER.info("Training images count for label (BEFORE AUG) {} = {}"
                         .format(label, len(img_list_for_label)))

            save_path = os.path.join(self._training_path, label)

            img_generator = self._create_image_generator()

            batch_size = 50

            augmentation_generator = \
                img_generator.flow_from_directory(
                    self._aug_path,
                    save_to_dir=save_path,
                    save_format='jpg',
                    target_size=(224, 224),
                    batch_size=batch_size)

            augmented_images_desired_cnt = 6000

            num_files = len(os.listdir(self._aug_path))
            num_batches = int(numpy.ceil((augmented_images_desired_cnt - num_files) / batch_size))

            for i in range(0, num_batches):
                _, _ = next(augmentation_generator)

            img_list_for_label_after_aug = os.listdir(self._training_path + img_label)

            LOGGER.info("Training images count for label (AFTER AUG) {} = {}"
                         .format(label, len(img_list_for_label_after_aug)))

            shutil.rmtree(self._aug_path)

    def _create_image_generator(self):
        return ImageDataGenerator(
            rotation_range=180,
            width_shift_range=0.1,
            height_shift_range=0.1,
            zoom_range=0.1,
            horizontal_flip=True,
            vertical_flip=True,
            # brightness_range=(0.9,1.1),
            fill_mode='nearest')

    def _create_temporary_augmentation_dir(self):

        if os.path.exists(self._aug_path):
            shutil.rmtree(self._aug_path)

        os.mkdir(self._aug_path)
        os.mkdir(self._aug_sub_path)
