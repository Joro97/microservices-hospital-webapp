import os
import pandas
import shutil

from sklearn.model_selection import train_test_split
from definitions import *

class MetadataPreprocessor:

    LESSION_ID_COLUMN_NAME = 'lesion_id'

    def __init__(self, input_path):
        self._input_path = input_path
        self._metadata = self._read_metadata_as_dataframe()

    def get_metadata_no_duplicates(self):
        LOGGER.info("=== Preprocessing metadata ===")

        return self._mark_duplicates_by_lession_id()

    def _read_metadata_as_dataframe(self):
        '''
        Reads the metadata for the images from the CSV file.
        :return:  The metadata as a pandas DataFrame
        '''
        LOGGER.info("=== Reading metadata from CSV ===")

        metadata = pandas.read_csv(os.path.join(self._input_path, 'HAM10000_metadata.csv'))

        return metadata

    def _mark_duplicates_by_lession_id(self):
        '''
        Some lessions in the data set have multiple pictures. They are identified by the same lession_id
        but the pictures are different. They could be considered as already augmented.
        :return:
        '''

        LOGGER.info('=== Marking duplicates in metadata ===')

        metadata_by_lession_id = self._metadata.groupby(self.LESSION_ID_COLUMN_NAME).count()

        # Remove rows with more than one image per lession id
        metadata_by_lession_id = metadata_by_lession_id[metadata_by_lession_id['image_id'] == 1]

        metadata_by_lession_id.reset_index(inplace=True)

        # Create a duplicates column that is a copy of the lession_id column
        self._metadata['duplicates'] = self._metadata['lesion_id']

        def identify_duplicates(lession_id):

            unique_lession_ids = list(metadata_by_lession_id['lesion_id'])

            if lession_id in unique_lession_ids:
                return 'no_duplicates'
            else:
                return 'has_duplicates'

        self._metadata['duplicates'] = \
            self._metadata['duplicates'].apply(identify_duplicates)

        # now we filter out images that don't have duplicates (with duplicates column)
        metadata_by_lession_id = self._metadata[self._metadata['duplicates'] == 'no_duplicates']

        return metadata_by_lession_id


class MetadataSplitter:

    def __init__(self, metadata):
        self._metadata = metadata

    def create_training_and_validation_data_sets(self):
        '''
        Split the metadata into 2 sets.
        One that is used for training the model.
        The other is used to test the accuracy of the model after training.

        :return: A training_metadata, validation_metadata tuple.
        '''
        LOGGER.info("==== Creating training and validation data sets ====")
        dx_label = self._metadata[LABEL_COLUMN_NAME]

        _, validation_metadata = \
            train_test_split(self._metadata, test_size=0.15, random_state=101, stratify=dx_label)

        def identify_validation_rows(image_id):
            validation_image_ids = list(validation_metadata['image_id'])

            return 'validation' if str(image_id) in validation_image_ids else 'training'


        self._metadata['training_or_validation'] = self._metadata['image_id']
        self._metadata['training_or_validation'] = \
            self._metadata['training_or_validation'].apply(identify_validation_rows)

        # filter out train rows
        training_metadata = self._metadata[self._metadata['training_or_validation'] == 'training']


        LOGGER.info("Trainging metadata set size: {} \n "
                     "Validation metadata set size: {}."
                     .format(len(training_metadata), len(validation_metadata)))

        return training_metadata, validation_metadata

def put_images_from_metadata_in_directory(metadata, input_path, target_path):

    img_folder1 = os.listdir(os.path.join(input_path, 'img1'))
    img_folder2 = os.listdir(os.path.join(input_path, 'img2'))

    image_ids = list(metadata['image_id'])

    LOGGER.debug("Copying images {} to {}".format(image_ids, target_path))

    for image_id in image_ids:
        image_file_name = image_id + '.jpg'

        labels_for_image = metadata.loc[metadata['image_id'] == image_id, 'dx']

        label_for_image = labels_for_image.values[0]

        if image_file_name in img_folder1:
            img_folder_name = 'img1'
        elif image_file_name in img_folder2:
            img_folder_name = 'img2'
        else:
            # Should not happen
            LOGGER.warning("Image {} not found in directories {} and {}".format(
                image_file_name, img_folder1, img_folder2))

            continue

        image_path = os.path.join(os.path.join(
            input_path, img_folder_name), image_file_name)


        image_destination_path = os.path.join(target_path, label_for_image, image_file_name)


        shutil.copyfile(image_path, image_destination_path)

def create_training_and_validation_folders(output_path):
    '''
    Deletes the directories if they exist.
    '''

    training_path = os.path.join(output_path, 'training')
    validation_path = os.path.join(output_path, 'validation')

    if os.path.exists(training_path):
        shutil.rmtree(training_path)

    if os.path.exists(validation_path):
        shutil.rmtree(validation_path)

    os.mkdir(training_path)
    os.mkdir(validation_path)

    def create_label_folders(path):
        for label in LABELS:
            path2 = os.path.join(path, label)

            if os.path.exists(path2):
                shutil.rmtree(path2)

            os.mkdir(path2)

    create_label_folders(training_path)
    create_label_folders(validation_path)

    return training_path, validation_path
