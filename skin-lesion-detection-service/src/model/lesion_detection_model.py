import os
from keras.models import load_model
import keras.metrics
import keras.preprocessing.image as image
import numpy

def top_3_accuracy(y_true, y_pred):
    return keras.metrics.top_k_categorical_accuracy(y_true, y_pred, k=3)

def top_2_accuracy(y_true, y_pred):
    return keras.metrics.top_k_categorical_accuracy(y_true, y_pred, k=2)

keras.metrics.top_3_accuracy = top_3_accuracy
keras.metrics.top_2_accuracy = top_2_accuracy

class LesionDetectionModel:

    script_dir = os.path.dirname(__file__)
    root = os.path.abspath(os.path.join(os.path.join(script_dir, os.pardir), os.pardir))
    rel_path = 'model-weigths/model.h5'

    H5_MODEL_WEIGTHS_PATH = os.path.join(root, rel_path)

    # Retrieved from the training session. It is the ordered list of the folders.
    LABEL_MAP = {0: 'akiec', 1: 'bcc', 2: 'bkl', 3: 'df', 4: 'mel', 5: 'nv', 6: 'vasc'}

    def __init__(self):
        self._lesion_categorization_model = self._load_model_from_h5_file()

    def _load_model_from_h5_file(self):

        return load_model(self.H5_MODEL_WEIGTHS_PATH)

    def predict(self, lesion_image):
        '''
        :param lesion_image:  A PIL Image instance with size 224 X 224
        :return: A probability array
        '''
        img_arr = image.img_to_array(lesion_image)
        img_arr = numpy.expand_dims(img_arr, axis=0)

        #multi dim to one dim
        ready_image = numpy.vstack([img_arr])

        return self._lesion_categorization_model.predict(ready_image)

    def get_most_probable_result(self, prob):
        '''
        :param prob: Probability array returned from the predict method
        :return: (Most probable label, probability)
        '''
        label_index = numpy.argmax(prob)

        return self.LABEL_MAP[label_index], prob[0, label_index]