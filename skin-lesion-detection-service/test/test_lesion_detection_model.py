import os
import unittest
import src.model.lesion_detection_model as ldm

from keras.preprocessing import image

class LesionDetectionTest(unittest.TestCase):

    RESOURCES_PATH = os.path.abspath(os.path.dirname(__file__))

    def setUp(self):
        self._model = ldm.LesionDetectionModel()

    def tearDown(self):
        self._model = None

    def _load_image(self, path):
        img = image.load_img(path, target_size=(224, 224))

        return img

    def test_nv_lesion(self):
        img = self._load_image(os.path.join(self.RESOURCES_PATH, 'resources/nv.jpg'))

        result = self._model.predict(img)

        print(result)

        label, probability = self._model.get_most_probable_result(result)

        print(label)
        print(probability)

    def test_bcc_lesion(self):
        img = self._load_image(os.path.join(self.RESOURCES_PATH, 'resources/bcc.jpg'))

        result = self._model.predict(img)

        print(result)

        label, probability = self._model.get_most_probable_result(result)

        print(label)
        print(probability)

    def test_akiec_lesion(self):
        img = self._load_image(os.path.join(self.RESOURCES_PATH, 'resources/akiec.jpg'))

        result = self._model.predict(img)

        print(result)

        label, probability = self._model.get_most_probable_result(result)

        print(label)
        print(probability)

    def test_bkl_lesion(self):
        img = self._load_image(os.path.join(self.RESOURCES_PATH, 'resources/bkl.jpg'))

        result = self._model.predict(img)

        print(result)

        label, probability = self._model.get_most_probable_result(result)
        print(label)
        print(probability)

    def test_df_lesion(self):
        img = self._load_image(os.path.join(self.RESOURCES_PATH, 'resources/df.jpg'))

        result = self._model.predict(img)

        print(result)

        label, probability = self._model.get_most_probable_result(result)
        print(label)
        print(probability)

    def test_mel_lesion(self):
        img = self._load_image(os.path.join(self.RESOURCES_PATH, 'resources/mel.jpg'))

        result = self._model.predict(img)

        print(result)

        label, probability = self._model.get_most_probable_result(result)
        print(label)
        print(probability)

    def test_vasc_lesion(self):
        img = self._load_image(os.path.join(self.RESOURCES_PATH, 'resources/vasc.jpg'))

        result = self._model.predict(img)

        print(result)

        label, probability = self._model.get_most_probable_result(result)

        print(probability)

if __name__ == '__main__':
    unittest.main()