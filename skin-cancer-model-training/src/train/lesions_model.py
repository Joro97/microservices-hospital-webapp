import keras
from keras.layers import Dense, Dropout
from keras.models import Model
from keras.metrics import categorical_accuracy, top_k_categorical_accuracy
from keras.optimizers import Adam
from definitions import *
import time
from keras.callbacks import ReduceLROnPlateau, ModelCheckpoint

class SkinLesionsModel:

    def __init__(self):
        mobile_net_model = keras.applications.mobilenet.MobileNet()
        self._model = self._modify_mobile_net_model_architecture(mobile_net_model)

    def _modify_mobile_net_model_architecture(self, mobilenet_base_model):
        '''
        The mobile net should be modified to be able to solve the lesions problem.
        '''

        LOGGER.info('=== Preparing base mobilenet model ===')

        # Exclude the last 5 layers of the above model.
        # This will include all layers up to and including global_average_pooling2d_1
        layers = mobilenet_base_model.layers[-6].output

        layers = Dropout(0.25)(layers)

        # Create a new dense layer for predictions
        # 7 corresponds to the number of classes
        layers = Dense(7, activation='softmax')(layers)

        # inputs=mobile.input selects the input layer, outputs=predictions refers to the
        # dense layer we created above.
        modified_model = Model(inputs=mobilenet_base_model.input, outputs=layers)

        # We need to choose how many layers we actually want to be trained.
        # Here we are freezing the weights of all layers except the
        # last 23 layers in the new model.
        # The last 23 layers of the model will be trained.
        for layer in modified_model.layers[:-23]:
            layer.trainable = False

        return modified_model

    def _compile_model(self):
        LOGGER.info("=== Compile model ===")
        def top_3_accuracy(y_true, y_pred):
            return top_k_categorical_accuracy(y_true, y_pred, k=3)

        def top_2_accuracy(y_true, y_pred):
            return top_k_categorical_accuracy(y_true, y_pred, k=2)

        self._model.compile(Adam(lr=0.01), loss='categorical_crossentropy',
                      metrics=[categorical_accuracy, top_2_accuracy, top_3_accuracy])

    def load_model_weights(self, path_to_h5_file):
        LOGGER.info("=== Loading model weights from path {} ===".format(path_to_h5_file))
        self._model.load_weights(path_to_h5_file)

    def train(self, generators, path_to_save_model_weights=MODEL_SAVE_PATH):
        self._compile_model()

        LOGGER.info('=== Starting training process ===')

        # Add weights to try to make the model more sensitive to melanoma
        class_weights = {
            0: 1.0,  # akiec
            1: 1.0,  # bcc
            2: 1.0,  # bkl
            3: 1.0,  # df
            4: 3.0,  # mel # Try to make the model more sensitive to Melanoma.
            5: 1.0,  # nv
            6: 1.0,  # vasc
        }

        save_path_and_name = os.path.join(
            path_to_save_model_weights,
            "{}-model.h5".format(str(time.strftime("%Y%m%d-%H%M%S"))))

        checkpoint = ModelCheckpoint(
            save_path_and_name,
            monitor='val_categorical_accuracy',
            verbose=1,
            save_best_only=True,
            mode='max')

        reduce_lr = ReduceLROnPlateau(
            monitor='val_categorical_accuracy',
            factor=0.5,
            patience=2,
            verbose=1,
            mode='max',
            min_lr=0.00001)

        callbacks_list = [checkpoint, reduce_lr]

        history = self._model.fit_generator(
            generators.train_batches,
            steps_per_epoch=generators.train_steps,
            class_weight=class_weights,
            validation_data=generators.valid_batches,
            validation_steps=generators.val_steps,
            epochs=30,
            verbose=1,
            callbacks=callbacks_list)

        return history

    def evaluate_model(self, generators, steps):
        self._compile_model()

        LOGGER.info("== Evaluating model ==")

        val_loss, val_cat_acc, val_top_2_acc, val_top_3_acc = \
            self._model.evaluate_generator(
                generators.test_batches,
                steps=generators.train_steps)

        LOGGER.info('val_loss: {} '.format(val_loss))
        LOGGER.info('val_cat_acc: {}'.format(val_cat_acc))
        LOGGER.info('val_top_2_acc: {}'.format(val_top_2_acc))
        LOGGER.info('val_top_3_acc: {}'.format(val_top_3_acc))

