'use strict'

import {log} from './logging.js';
import {api} from './requestClient.js';
import hint from './message.js';
const config = require('./config.js');

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

  logout(callback) {
    this.isLogin = false;
    this.user = {};
    api.request(config.logout).then(
      (success) => {
        log.info(success);
        if (callback) {
          callback();
        }
      }, (error) => {
        log.error(error);
        if (callback) {
          callback();
        }
      }
    );
  }

  hasLogin() {
    return this.isLogin;
  }

  test() {
    alert("???");
  }

  tryLogin(successCallBack, failCallBack) {
    api.request(config.checkSession).then(
      (success)=>{
        this.login(success);
        if (successCallBack) {
          successCallBack();
        }
      },
      (error) => {
        if (failCallBack) {
          failCallBack();
        }
      }
    );
  }

};


export const account = new Account();
