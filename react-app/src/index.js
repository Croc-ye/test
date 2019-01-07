import withStyles from './singin.js';
import ReactDOM from 'react-dom';
import React from 'react';
console.log(withStyles);
const SignIn = withStyles.SignIn;

ReactDOM.render(
  <SignIn />,
  document.getElementById('root'),
);
