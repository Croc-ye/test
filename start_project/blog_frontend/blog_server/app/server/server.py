from api import user_api, blog_api
from config import config
from lib.errors.error_handler import blog_server_error_handler
from lib.errors.expection_base import BlogServerBaseExpection
from flask_cors import CORS
from flask import Flask

app = Flask(__name__)
CORS(app, supports_credentials=True)

def setup_logging():
    pass

def setup_blueprint():
    app.register_blueprint(user_api)
    app.register_blueprint(blog_api)

def setup_app_config():
    app.config['SECRET_KEY'] = config.SECRET_KEY
    app.config['JSON_AS_ASCII'] = config.JSON_AS_ASCII
    app.config['JSON_SORT_KEYS'] = config.JSON_SORT_KEYS
    app.config["SESSION_COOKIE_HTTPONLY"] = config.SESSION_COOKIE_HTTPONLY

def setup_error_handler():
    app.register_error_handler(BlogServerBaseExpection, blog_server_error_handler)

def setup():
    setup_app_config()
    setup_blueprint()
    setup_error_handler()

setup()
