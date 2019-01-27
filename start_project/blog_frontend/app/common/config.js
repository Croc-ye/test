'use strict'

module.exports = {
  apiHostPrefix: 'http://localhost:8888',
  login: '/user/login/',
  logout: '/user/logout/',
  info: '/user/info/',
  checkSession: '/user/check_session/',
  blogs: '/blog/get_all_blog/',
  blog: '/blog/get_blog/',
  blogDelete: '/blog/delete/',
  blogLove: '/blog/love/',
  blogWriteComment: '/blog/write_comment/',
  blogWrite: '/blog/write_blog/',
  friendUser: '/user/friend_user/',
  userAvatar: '/user/update_user_avatar/',
  getComment: '/blog/get_comment/',
  blogSearch: '/blog/search/',
  latestBlog: '/blog/latest_blogs/',

  limitUserNameLength: 15,
  limitUserPasswordLength: 15,
  timeout: 10000, // in ms
}
