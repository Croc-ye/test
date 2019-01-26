import base64
import imghdr

class Image:
    def __init__(self):
        pass

    @classmethod
    def decode_imgfile_to_base64(self, img):
        img_type = imghdr.what(img)
        data = img.read()
        result = "data:image/{};base64,{}".format(str(img_type), str(base64.b64encode(data), 'utf-8'))
        return result
