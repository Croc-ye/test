import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, Switch} from 'react-router-dom';

import Login from './components/login.js';
import Person from './components/person.js';
import BlogPage from './components/blogpage.js';

import history from './common/history.js';
import SimpleCard from './components/github.js';

import { api } from './common/requestClient.js';
import mrouter from './common/mrouter.js';
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
          <Route exact path="/login" component={Login}/>
          <Route exact path="/person/:username" component={Person}/>
          <Route exact path="/person/:username/blog/:user_blog_id" component={BlogPage}/>
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
  // api.request(config.checkSession).then((success)=> {
  //   mrouter.goToPersonPage(success.username);
  // }, (error) => {
  //   log.info(error);
  // });
}

begin();
