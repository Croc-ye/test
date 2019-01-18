import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link} from 'react-router-dom';

import Login from './components/login.js';
import Person from './components/person.js';
import BlogPage from './components/blogpage.js';

import history from './common/history.js';
import SimpleCard from './components/github.js';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={Login}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/person/:username" component={Person}/>
          <Route exact path="/person/:username/blog/:user_blog_id" component={BlogPage}/>
        </div>
      </Router>
    );
  }
};

ReactDOM.render(
  <AppRouter />,
  document.getElementById('root'),
);
