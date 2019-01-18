import flask
from flask import session, g, jsonify, make_response, request
from decorator.decorator_tools import parse_user, parse_access, parse_args
from errors.expection import UnknownError
from db.models.blog import Blog
from logger.logger import log

blog_api = flask.Blueprint('blog', __name__, url_prefix='/blog')

@blog_api.route('/write_blog/', methods=['POST'])
@parse_access()
@parse_user()
@parse_args(args_name=['title', 'content'])
def write_blog():
    blog = Blog.write_blog(g.user_id, g.args.get("title"), g.args.get("content"))
    return jsonify(blog.to_json())

@blog_api.route('/get_blog/<username>/<user_blog_id>/', methods=['GET'])
@parse_access()
def get_blog(username, user_blog_id):
    blog = Blog.get_blog(username, user_blog_id)
    return jsonify(blog.to_json())

@blog_api.route('/get_all_blog/<username>/', methods=['GET'])
@parse_access()
def get_all_blog(username):
    blogs = Blog.get_all_blog(username)
    return jsonify([blog.to_json() for blog in blogs])
