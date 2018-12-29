import time
import io
import os
import lesion_detection_model
from PIL import Image
from cgi import parse_header, parse_multipart
from urllib.parse import parse_qsl
from http.server import BaseHTTPRequestHandler, HTTPServer

class LesionPredictCategoryController(BaseHTTPRequestHandler):

    script_dir = os.path.dirname(__file__)
    root = os.path.abspath(os.path.join(os.path.join(script_dir, os.pardir), os.pardir))
    rel_path = 'images/'

    SAVE_PATH = os.path.join(root, rel_path)

    MODEL = lesion_detection_model.LesionDetectionModel()

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

            if self._authorize(auth_token):

                image_byte_array = postvars['image'][0]

                try:
                    image = self._parse_image(image_byte_array)

                    prediction = self.MODEL.predict(image)
                    result = self.MODEL.get_most_probable_result(prediction)

                    self.send_response(200)
                    self.end_headers()
                    self.wfile.write(bytes(str(result), "utf-8"))

                    image.save(self.SAVE_PATH + '{}-{}-{}.jpg'
                               .format(str(time.strftime("%Y%m%d-%H%M%S")), result[0], result[1]))

                except:
                    import logging
                    logging.exception("ERROR")

                    self.send_response(400, "Param image is invalid")
                    self.end_headers()
            else:
                self.send_response(403, "Invalid auth_token")
                self.end_headers()

    def _authorize(self, auth_token):
        '''
        TODO: Fix
        :param auth_token:
        :return:
        '''
        return True

    def _parse_image(self, image_byte_array):
        # img = image.load_img(image_byte_array, target_size=(224, 224))

        image = Image.open(io.BytesIO(image_byte_array))
        image = image.resize((224, 224))
        return image

    def _extract_param_val(self, param_name, params):
        try:
            return params[param_name][0].decode("utf-8")
        except:
            return None

if __name__ == '__main__':

    hostName = "localhost"
    hostPort = 9000

    myServer = HTTPServer((hostName, hostPort), LesionPredictCategoryController)
    print(time.asctime(), "Server Starts - %s:%s" % (hostName, hostPort))

    try:
        myServer.serve_forever()
    except KeyboardInterrupt:
        pass

    myServer.server_close()
    print(time.asctime(), "Server Stops - %s:%s" % (hostName, hostPort))
