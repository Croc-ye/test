'use strict'

const timeUtil = require('./timeUtil.js');

class Logging {
  constructer() {
    this.info("log service start");
  }

  convertLogMessage(msg, level) {
    return {
      time: timeUtil.getTime(),
      msg: msg,
      level: level, 
    };
  }

  info(msg) {
    console.log(this.convertLogMessage(msg, 'info'));
  }

  debug(msg) {
    console.log(this.convertLogMessage(msg, 'debug'));
  }

  error(msg) {
    console.log(this.convertLogMessage(msg, 'error'));
  }
}

export const log = new Logging();
