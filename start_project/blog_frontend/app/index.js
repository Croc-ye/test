import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, Switch} from 'react-router-dom';

import First from './page/first.js';
import Profile from './page/profile.js';
import BlogPage from './page/blog.js';
import WriteBlog from './page/write_page.js';
import Login from './components/login.js';

import history from './common/history.js';
import { api } from './common/requestClient.js';
import mrouter from './common/mrouter.js';
import hint from './common/message.js';
import {account} from './common/account.js';
const config = require('./common/config.js');

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/blog" component={BlogPage}/>
          <Route exact path="/first" component={First}/>
          <Route exact path="/profile/:username" component={Profile}/>
          <Route path="*" component={Login}/>
        </Switch>
      </Router>
    );
  }
};

function begin() {
  ReactDOM.render(
    <AppRouter />,
    document.getElementById('root'),
  );
}

begin();
