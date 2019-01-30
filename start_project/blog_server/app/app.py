from server import app
from lib.logger import log
if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=8888,
        threaded=True,
    )
