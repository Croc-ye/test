import flask
from flask import session, g, jsonify, make_response, request
from .decorator_tool import parse_user, parse_args
from lib.errors.expection import UnknownError, ArgsError
from models.user import User
from lib.logger.logger import log
from api.image import Image

user_api = flask.Blueprint('user', __name__, url_prefix='/user')

@user_api.route('/info/<username>/', methods=['GET'])
def info(username):
    u = User.by_username(username)
    return jsonify(u.to_json())

@user_api.route('/login/', methods=['POST'])
@parse_args("username", str)
@parse_args("password", str)
def login(username, password):
    u = User.load_or_create(username, password)
    session['user_id'] = u.user_id
    return jsonify(u.to_json())

@user_api.route('/delete/', methods=['GET'])
@parse_user()
def delele_by_id():
    User.delete_by_user_id(g.current_user.user_id)
    return jsonify({
        "success": "user alerady delete",
    });

@user_api.route('/check_session/', methods=['GET'])
@parse_user()
def check_session():
    return jsonify(g.current_user.to_json())

@user_api.route('/update_user_avatar/', methods=['POST'])
@parse_user()
def update_user_avatar():
    img = request.files.get("filename")
    if img is None:
        raise ArgsError("require image file")
    avatar = Image.decode_imgfile_to_base64(img)
    g.current_user.avatar = avatar
    g.current_user.update_user_info()
    return jsonify(g.current_user.to_json())

@user_api.route('/friend_user/', methods=['GET'])
@parse_user()
def friend_user():
    users = g.current_user.friend_user()
    return jsonify([user.to_json() for user in users])
