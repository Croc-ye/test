import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Login from './components/login.js';

class  AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <Link to="/login"> goto </Link>
          </ul>
          <Route exact path="/*" component={Login}/>
          <Route path="/login" component={Login}/>
        </div>
      </BrowserRouter>
    );
  }
};

ReactDOM.render(
  <AppRouter />,
  document.getElementById('root'),
);
