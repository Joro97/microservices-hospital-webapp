import zipfile

from argparse import ArgumentParser
import lesions_model
import generators

from definitions import *

if __name__ == '__main__':
    parser = ArgumentParser()

    parser.add_argument('-o', '--output')

    args = parser.parse_args()

    output_path = args.output

    if os.path.isfile(INPUT_ZIP_PATH) and not os.path.exists(INPUT_PATH):
        with zipfile.ZipFile(INPUT_ZIP_PATH, 'r') as zip_ref:
            zip_ref.extractall(ROOT_DIR)

    model = lesions_model.SkinLesionsModel()

    images_generators = generators.Generators()

    if not os.path.exists(output_path):

        LOGGER.warning('Model save path {} does not exist. Using default path'.format(output_path))

        model.train(images_generators)

    else:
        model.train(images_generators, output_path)

    model.evaluate_model(images_generators, generators.get_num_of_images(VALIDATION_FOLDER_PATH))