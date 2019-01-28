'use strict'

import { log } from './logging.js';

const config = require('./config.js');

class requestClient {
  constructor() {
    this.seq = 0;
    log.info("request client service start!");
  }

  converForm(form) {
    let query = "";
    for (const key in form) {
      query += `${key}=${form[key]}&`;
    }
    // TODO query.substring(0, query.length - 1)
    return query;
  }

  request(serverApiPath, form = null) {
    const seq = this.seq;
    this.seq += 1;
    // TODO promise bind this?
    const promise = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.timeout = config.timeout;
      xhr.withCredentials = true;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.responseText);
          }
        } else {
          // alert('still doing request');
          // still doing request
        }
      }
      console.log(config.apiHostPrefix + serverApiPath);
      if (!form) {
        xhr.open('GET', config.apiHostPrefix + serverApiPath);
        xhr.send();
      } else {
        xhr.open('POST', config.apiHostPrefix + serverApiPath);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send(this.converForm(form));
      }
    });
    return promise;
  }
}

export const api = new requestClient();
