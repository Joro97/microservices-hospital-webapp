import preprocessor
import augmentation
from argparse import ArgumentParser

def process_dataset(args):


    print(args)
    input_path = args.input
    output_path = args.output

    if not input_path or not output_path:
        raise Exception('Input path {} or output path {} are invalid'.format(input_path, output_path))

    training_path, validation_path = \
        preprocessor.create_training_and_validation_folders(output_path)

    metadata_preprocessor = preprocessor.MetadataPreprocessor(input_path)

    no_duplicates_metadata = metadata_preprocessor.get_metadata_no_duplicates()

    metadata_splitter = preprocessor.MetadataSplitter(no_duplicates_metadata)

    training_metadata, validation_metadata = \
        metadata_splitter.create_training_and_validation_data_sets()

    preprocessor.put_images_from_metadata_in_directory(training_metadata, input_path, training_path)
    preprocessor.put_images_from_metadata_in_directory(validation_metadata, input_path,  validation_path)

    training_imgs_augmentor = augmentation.LesionImageAugmentor(output_path, training_path)
    training_imgs_augmentor.augment_training_lesion_images()


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-i', '--input')

    parser.add_argument('-o', '--output')

    args = parser.parse_args()

    process_dataset(args)
