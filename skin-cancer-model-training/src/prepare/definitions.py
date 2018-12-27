import logging

LABEL_COLUMN_NAME = 'dx'

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