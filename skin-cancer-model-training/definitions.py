import os
import logging

LABEL_COLUMN_NAME = 'dx'

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

INPUT_PATH = os.path.join(ROOT_DIR, 'input')

TRAINING_FOLDER_PATH = os.path.join(INPUT_PATH, 'training')

VALIDATION_FOLDER_PATH = os.path.join(INPUT_PATH, 'validation')

MODEL_SAVE_PATH = os.path.join(ROOT_DIR, 'saved_models')

LABELS = [
    'nv',
    'mel',
    'bkl',
    'bcc',
    'akiec',
    'vasc',
    'df'
]

LOGGER = logging.getLogger(__name__)
LOGGER.setLevel(logging.DEBUG)
LOGGER.addHandler(logging.StreamHandler())