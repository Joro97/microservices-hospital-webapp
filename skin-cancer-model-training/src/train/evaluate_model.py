import zipfile
import numpy as np
import lesions_model
import generators
from sklearn.metrics import classification_report, confusion_matrix

from definitions import *

if __name__ == '__main__':

    if os.path.isfile(INPUT_ZIP_PATH) and not os.path.exists(INPUT_PATH):
        with zipfile.ZipFile(INPUT_ZIP_PATH, 'r') as zip_ref:
            zip_ref.extractall(ROOT_DIR)

    model = lesions_model.SkinLesionsModel()

    model.load_model_weights(os.path.join(MODEL_SAVE_PATH, 'val_cat_acc_82.h5'))

    images_generators = generators.Generators()

    model.evaluate_model(images_generators)
