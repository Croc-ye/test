import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link} from 'react-router-dom';

import Login from './components/login.js';
import Person from './components/person.js';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Login}/>
          <Route path="/login" component={Login}/>
          <Route path="/person/:username" component={Person}/>
          <ul>
            
          </ul>
        </div>
      </BrowserRouter>
    );
  }
};

ReactDOM.render(
  <AppRouter />,
  document.getElementById('root'),
);
