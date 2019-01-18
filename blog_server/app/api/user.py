import flask
from flask import session, g, jsonify, make_response, request
from decorator.decorator_tools import parse_user, parse_access, parse_args
from errors.expection import UnknownError
from db.models.user import User
from logger.logger import log

user_api = flask.Blueprint('user', __name__, url_prefix='/user')

@user_api.route('/info/<username>/', methods=['GET'])
@parse_access()
def info(username):
    u = User.by_username(username)
    return jsonify(u.to_json())

@user_api.route('/login/', methods=['POST'])
@parse_access()
@parse_args(args_name=['username', 'password'])
def login():
    u = User.load_or_create(g.args.get('username'), g.args.get('password'))
    session['user_id'] = u.user_id
    return jsonify(u.to_json())

@user_api.route('/delete/', methods=['GET'])
@parse_access()
@parse_user()
def delele_by_id():
    User.delete_by_user_id(g.user_id)
    return jsonify({
        "success": "user alerady delete",
    });
