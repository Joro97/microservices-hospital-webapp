import zipfile
from src.train import lesions_model, generators

from definitions import *

if __name__ == '__main__':

    if os.path.isfile(INPUT_ZIP_PATH) and not os.path.exists(INPUT_PATH):
        with zipfile.ZipFile(INPUT_ZIP_PATH, 'r') as zip_ref:
            zip_ref.extractall(ROOT_DIR)


    model = lesions_model.SkinLesionsModel()

    images_generators = generators.Generators()

    model.train(images_generators)

    model.evaluate_model(images_generators, generators.get_num_of_images(VALIDATION_FOLDER_PATH))
