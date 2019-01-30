import flask
from flask import session, g, jsonify, make_response, request
from .decorator_tool import parse_user, parse_args
from lib.errors.expection import UnknownError, ArgsError
from models.blog import Blog
from models.comment import Comment
from lib.logger import log
import json

blog_api = flask.Blueprint('blog', __name__, url_prefix='/blog')

@blog_api.route('/write_blog/', methods=['POST'])
@parse_user()
@parse_args("title", str)
@parse_args("content", str)
def write_blog(title, content):
    title = json.dumps(title).replace("\\", "\\\\")
    content = json.dumps(content).replace("\\", "\\\\")
    blog = Blog.write_blog(g.current_user.id, title, content)
    return jsonify(blog.to_json())

@blog_api.route('/get_blog/<username>/<user_blog_id>/', methods=['GET'])
def get_blog(username, user_blog_id):
    try:
        user_blog_id = int(user_blog_id)
    except ValueError:
        raise ArgsError('Require {} type {}, but found {}'.format("user_blog_id", int, type(user_blog_id)))

    blog = Blog.get_blog(username, user_blog_id)
    return jsonify(blog.to_json())

@blog_api.route('/get_all_blog/<username>/', methods=['GET'])
def get_all_blog(username):
    blogs = Blog.get_all_blog(username)
    return jsonify([blog.to_json() for blog in blogs])

@blog_api.route('/delete/<user_blog_id>/', methods=['GET'])
@parse_user()
def delete(user_blog_id):
    try:
        user_blog_id = int(user_blog_id)
    except ValueError:
        raise ArgsError('Require {} type {}, but found {}'.format("user_blog_id", int, type(user_blog_id)))

    Blog.delete_by_user_blod_id(g.current_user.id, int(user_blog_id))
    return jsonify({
        "success": "blog alerady delete",
    });

@blog_api.route('/write_comment/', methods=['POST'])
@parse_user()
@parse_args("username", str)
@parse_args("user_blog_id", int)
@parse_args("content", str)
def write_comment(username, user_blog_id, content):
    content = json.dumps(content).replace("\\", "\\\\")
    comment_id = Comment.insert_comment(g.current_user.id, content);
    Blog.add_comment_for_blog(username, user_blog_id, comment_id)
    return jsonify({
        "success": "comment alerady add",
    });

@blog_api.route('/get_comment/', methods=['POST'])
@parse_args("comment_list", str)
def get_one_blog_comment(comment_list):
    try:
        comment_list = comment_list[:-1].split(",")
    except BaseExpection as e:
        log.error(e)
        raise ArgsError('args comment_list format error')

    comment_list = Comment.get_one_blog_comment(reversed(comment_list))
    return jsonify([comment.to_json() for comment in comment_list])

@blog_api.route('/love/<username>/<user_blog_id>/', methods=['GET'])
@parse_user()
def love_blog(username, user_blog_id):
    try:
        user_blog_id = int(user_blog_id)
    except ValueError:
        raise ArgsError('Require {} type {}, but found {}'.format("user_blog_id", int, type(user_blog_id)))
    incr_value = Blog.love_blog(g.current_user.id, username, user_blog_id)
    return jsonify({
        "success": incr_value,
    });

@blog_api.route('/search/', methods=['POST'])
@parse_args("username", str)
@parse_args("search_key_word", str)
def search_blog(username, search_key_word):
    blogs = Blog.search_blog(username, search_key_word)
    if blogs:
        return jsonify([blog.to_json() for blog in blogs])
    else:
        raise ArgsError('no search found')

@blog_api.route('/latest_blogs/', methods=['GET'])
def latest_blogs():
    blogs = Blog.latest_blogs()
    return jsonify([blog.to_json() for blog in blogs])

@blog_api.route('/latest_comment/', methods=['POST'])
@parse_args('username', str)
def latest_comment(username):
    comments = Comment.latest_comment(username)
    return jsonify(comments)
