'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Redirect} from 'react-router-dom';
import { history } from './history.js'; 
import Person from '../components/person.js';

function goToPersonPage(username) {
  const path = `/person/${username}`;
  history.push(path);
  ReactDOM.render(
    <Person username={username} />,
    document.getElementById('root'),
  );
}

export default {
  goToPersonPage,
}
