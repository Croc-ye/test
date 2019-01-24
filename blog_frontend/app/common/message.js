'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import HintMessage from '../components/hint.js';

function showDialog(title, message, callbackOK, callbackCancel) {
  ReactDOM.render(
    <HintMessage title={title} message={message} callbackOK={callbackOK} callbackCancel={callbackCancel}/>,
    document.getElementById('modal'),
  );
}
  

export default {
  showDialog,
}