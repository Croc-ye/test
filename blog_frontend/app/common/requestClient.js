'use strict'

import { log } from './logging.js';

const config = require('./config.js');

class requestClient {
  constructor() {
    this.seq = 0;
    log.info("request client service start!");
  }

  request(serverApiPath, form = null) {
    const seq = this.seq;
    this.seq += 1;
    log.info(`start requesting ${serverApiPath} with seq = ` + seq);
    const promise = new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.timeout = config.timeout;
      xhr.withCredentials = true;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          log.info(`finish requesting ${serverApiPath} with seq = ` + seq);
          if (xhr.status === 200) {
            alert(!xhr.responseText ? "???" : xhr.responseText)
            resolve(xhr.responseText);
          } else {
            reject(xhr.status);
          }
        } else {
          // still doing request
        }
      }
      if (!form) {
        console.log(config.apiHostPrefix + serverApiPath);
        xhr.open('GET', config.apiHostPrefix + serverApiPath);
        xhr.send();
      } else {
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.open('POST', config.apiHostPrefix + serverApiPath);
        xhr.send(JSON.stringify(form));
      }
    });
    return promise;    
  }
}

export const api = new requestClient();
