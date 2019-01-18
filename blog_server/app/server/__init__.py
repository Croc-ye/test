from api.user import user_api
from api.blog import blog_api
from config import config
from errors.error_handler import flask_error_handler
from errors.expection_base import MyExpection

from flask import Flask
app = Flask(__name__)

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
    app.register_error_handler(MyExpection, flask_error_handler)

def setup():
    setup_app_config()
    setup_blueprint()
    setup_error_handler()

setup()
