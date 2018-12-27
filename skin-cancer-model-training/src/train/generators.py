import numpy
import keras
from keras.preprocessing.image import ImageDataGenerator
from definitions import *


class Generators:

    def __init__(self):
        self.train_steps = None
        self.val_steps = None
        self.train_batches = None
        self.valid_batches = None
        self.test_batches = None

        self._prep_generators()

    def _prep_generators(self):

        os.listdir(TRAINING_FOLDER_PATH)

        num_train_samples = get_num_of_images(TRAINING_FOLDER_PATH)
        num_val_samples = get_num_of_images(VALIDATION_FOLDER_PATH)

        train_batch_size = 10
        val_batch_size = 10
        image_size = 224

        self.train_steps = numpy.ceil(num_train_samples / train_batch_size)
        self.val_steps = numpy.ceil(num_val_samples / val_batch_size)

        datagen = ImageDataGenerator(
            preprocessing_function= \
            keras.applications.mobilenet.preprocess_input)

        self.train_batches = datagen.flow_from_directory(TRAINING_FOLDER_PATH,
                                                    target_size=(image_size,image_size),
                                                    batch_size=train_batch_size)

        self.valid_batches = datagen.flow_from_directory(VALIDATION_FOLDER_PATH,
                                                    target_size=(image_size,image_size),
                                                    batch_size=val_batch_size)

        # Note: shuffle=False causes the test dataset to not be shuffled
        self.test_batches = datagen.flow_from_directory(VALIDATION_FOLDER_PATH,
                                                    target_size=(image_size,image_size),
                                                    batch_size=1,
                                                    shuffle=False)

def get_num_of_images(path):
    num = 0

    for label in LABELS:
        imgs = os.listdir(os.path.join(path, label))
        num += len(imgs)

    LOGGER.info('There are {} images in {}'.format(path, num))

    return num
