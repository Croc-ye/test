import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import AppTopBar from '../components/app_top_bar.js';
import BlogList from '../components/blog_list.js';
import UserList from '../components/user_list.js';
import HintMessage from '../components/hint.js';
import CssBaseline from '@material-ui/core/CssBaseline';

import mrouter from '../common/mrouter.js';
import { api } from '../common/requestClient.js';
import { log } from '../common/logging.js';
const config = require('../common/config.js');

const styles = theme => ({
  main: {
    'display': 'flex',
    'flex-direction': 'column',
    'width': '100%',
    'height': '100%',
    'background-color':"#F5F4D7",
  },
  blog_and_userlist: {
    'display': 'flex',
    'flex-direction': 'row',
    'width': '100%',
    'height': '100%',
  },
  blog_list: {
    'display': 'flex',
    'flex-direction': 'row',
    'width': '90%',
    'height': '100%',
  },
  user_list: {
    'display': 'flex',
    'flex-direction': 'column',
    'width': '10%',
    'height': '100%',
  },
  break_line: {
  }
});

class First extends React.Component {
  constructor(props) {
    super(props);
    this.buttonKey = 13;
    this.state = {
      username: props.username,
    };
  }

  render() {
    const {classes} = this.props;
    return (
      <main className={classes.main}>
        <AppTopBar />
        <div className={classes.blog_and_userlist}>
          <div className={classes.blog_list}>
            <BlogList />
          </div>

          <CssBaseline  />

          <div className={classes.user_list}>
            <UserList />
          </div>

        </div>
      </main>
    );
  }
}

export default withStyles(styles)(First);
