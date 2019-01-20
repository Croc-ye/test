'use strict'

module.exports = {
  apiHostPrefix: 'http://localhost:8888',
  login: '/user/login/',
  info: '/user/info/',
  checkSession: '/user/check_session/',
  blogs: '/blog/get_all_blog/',
  blog: '/blog/get_blog/',
  blog_delete: '/blog/delete/',
  limitUserNameLength: 15,
  limitUserPasswordLength: 15,
  timeout: 10000, // in ms
}
