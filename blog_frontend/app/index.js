import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, Switch} from 'react-router-dom';

import First from './page/first.js';
import Login from './components/login.js';

import history from './common/history.js';
import { api } from './common/requestClient.js';
import mrouter from './common/mrouter.js';
import hint from './common/message.js';
const config = require('./common/config.js');

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={First}/>
          <Route exact path="/per" component={First}/>
          <Route path="*" component={First}/>
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
