'use strict'

import {log} from './logging.js';

class Account {
  constructor() {
    log.info("account service start");
    this.isLogin = false;
    this.user = {};
  }

  login(user) {
    this.isLogin = true;
    this.user = user;
    log.info(this.user);
  }

  isOwner(username) {
    if (!this.isLogin) {
      return false;
    }
    return this.user.username === username;
  }

  logout() {
    this.isLogin = false;
    this.user = {};
  }

  hasLogin() {
    return this.isLogin;
  }

  test() {
    alert("???");
  }

};


export const account = new Account();
