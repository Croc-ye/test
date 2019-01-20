from cache.redis import Redis
from cache.util import format_user_avatar_key
import base64

class Image:
    def __init__(self):
        pass

    @classmethod
    def decode_imgfile_base64(user_id, img_file):
        filehex = img_file.read()
        print(filehex)
        