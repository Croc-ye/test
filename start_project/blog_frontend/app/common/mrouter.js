'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Redirect} from 'react-router-dom';
import {account} from './account.js';
import history from './history.js'; 

function issame(changePath) {
  if (history.location.pathname === changePath) {
    return true;
  } else return false;
}

function goToBlogPage(username) {
  const path = `/blog`;
  history.push(path);
}

function goToProfilePage() {
  if (account.hasLogin()) {
    const path = `/profile/${account.user.username}`;
    if (issame(path)) {
      return;
    }
    history.push(path);
  } else {
    goToLoginPage();
  }
}

function goToWriteBlogPage() {
  const path = "/person/blog/write_blog/";
  if (issame(path)) {
    return;
  }
  history.push(path);
}

function goToLoginPage() {
  account.logout(() => {
    const path = "/";
    if (issame(path)) {
      return;
    }
    history.push(path);
  });
}

function goToFirstPage() {
  const path = '/first';
  if (issame(path)) {
    return;
  }
  history.push(path);
}

function backOnePage() {
  history.go(-1);
}

export default {
  goToProfilePage,
  goToLoginPage,
  goToBlogPage,
  goToWriteBlogPage,
  backOnePage,
  goToFirstPage,
}
