import time
import io
import os
import keras
import jwt
import shutil
import lesion_detection_model
import logging
import numpy
from PIL import Image
from keras.preprocessing.image import ImageDataGenerator
from cgi import parse_header, parse_multipart
from urllib.parse import parse_qsl
from http.server import BaseHTTPRequestHandler, HTTPServer

class LesionPredictCategoryController(BaseHTTPRequestHandler):

    script_dir = os.path.dirname(__file__)
    root = os.path.abspath(os.path.join(os.path.join(script_dir, os.pardir), os.pardir))
    rel_path = 'images/'

    SAVE_PATH = os.path.join(root, rel_path)
    SAVE_TMP_PATH = os.path.join(root, 'tmp/')

    MODEL = lesion_detection_model.LesionDetectionModel()

    PRIVILEGED_ROLES = {'ADMIN', 'DOCTOR'}

    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(bytes("<html><head><title>Lesion detection service</title></head>", "utf-8"))
        self.wfile.write(bytes("<body><p>The detection should be combined with a doctors opinion.</p>", "utf-8"))
        self.wfile.write(bytes("</body></html>", "utf-8"))

    def do_POST(self):

        if self.path == '/api/lesion':

            ctype, pdict = parse_header(self.headers.get('content-type'))

            pdict['boundary'] = bytes(pdict['boundary'], "utf-8")
            if ctype == 'multipart/form-data':
                postvars = parse_multipart(self.rfile, pdict)
            elif ctype == 'application/x-www-form-urlencoded':
                length = int(self.headers.get('content-length'))
                postvars = parse_qsl(self.rfile.read(length), keep_blank_values=1)
            else:
                postvars = {}

            auth_token = self._extract_param_val('auth_token', postvars)

            if self._authenticate_and_authorize(auth_token):

                image_byte_array = postvars['image'][0]

                try:

                    generator = self._prepare_generator(image_byte_array)

                    predictions = self.MODEL.predict_generator(generator)

                    prediction = self._avg_from_predictions(predictions)

                    shutil.rmtree(self.SAVE_TMP_PATH)

                    result = self.MODEL.get_most_probable_result(prediction)

                    self.send_response(200)
                    self._send_custom_headers()
                    self.end_headers()

                    res = '{"class":"' + str(result[0]) + '", "certainty":"' + str(result[1]) + '"}'

                    self.wfile.write(bytes(res, "utf-8"))

                except:
                    import logging
                    logging.exception("ERROR")

                    self.send_response(400, "Param image is invalid")
                    self._send_custom_headers()
                    self.end_headers()
            else:
                self.send_response(403, "Invalid auth_token")
                self._send_custom_headers()
                self.end_headers()

    def _send_custom_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS, DELETE')
        self.send_header('Access-Control-Allow-Headers', 'Authorization, Content-Type')
        self.send_header('Access-Control-Max-Age', '3600')

    def _authenticate_and_authorize(self, auth_token):
        try:
            token = jwt.decode(auth_token, '123')

            roles = set(token['authorities'])

            return len(roles.intersection(self.PRIVILEGED_ROLES))
        except:
            logging.exception('Error while parsing the token')

            return False

    def _avg_from_predictions(self, predictions):
        return numpy.average(predictions, axis=0)

    def _prepare_generator(self, image_byte_array):

        if os.path.exists(self.SAVE_TMP_PATH):
            shutil.rmtree(self.SAVE_TMP_PATH)

        os.mkdir(self.SAVE_TMP_PATH)

        class_tmp_folder = os.path.join(self.SAVE_TMP_PATH, 'temp')

        os.mkdir(class_tmp_folder)

        image = Image.open(io.BytesIO(image_byte_array))
        image.save(self.SAVE_PATH + '{}.jpg'.format(str(time.strftime("%Y%m%d-%H%M%S"))))

        image.save(class_tmp_folder + '/tmp.jpg')

        generator = ImageDataGenerator(
            preprocessing_function=
            keras.applications.mobilenet.preprocess_input,
            rotation_range=180,
            width_shift_range=0.1,
            height_shift_range=0.1,
            zoom_range=0.1,
            horizontal_flip=True,
            vertical_flip=True,
            fill_mode='nearest')

        generator_with_aug = generator.flow_from_directory(
            self.SAVE_TMP_PATH,
            target_size=(224, 224),
            batch_size=1) #There is only 1 picture in the directory

        return generator_with_aug

    def _extract_param_val(self, param_name, params):
        try:
            return params[param_name][0].decode("utf-8")
        except:
            return None

if __name__ == '__main__':

    hostName = ""
    hostPort = 9000

    myServer = HTTPServer((hostName, hostPort), LesionPredictCategoryController)
    print(time.asctime(), "Server Starts - %s:%s" % (hostName, hostPort))

    try:
        myServer.serve_forever()
    except KeyboardInterrupt:
        pass

    myServer.server_close()
    print(time.asctime(), "Server Stops - %s:%s" % (hostName, hostPort))
