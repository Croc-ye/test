'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Redirect} from 'react-router-dom';
import history from './history.js'; 
import Person from '../components/person.js';

function goToPersonPage(username) {
  const path = `/person/${username}`;
  history.push(path);
}

function goToBlogPage(username, user_blog_id) {
  const path = `/person/${username}/blog/${user_blog_id}`;
  history.push(path);
}

function goToWriteBlogPage() {
  const path = "/person/blog/write_blog/";
  history.push(path);
}

function backOnePage() {
  history.go(-1);
}

export default {
  goToPersonPage,
  goToBlogPage,
  goToWriteBlogPage,
  backOnePage,
}
