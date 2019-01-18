import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import LockIcon from '@material-ui/icons/LockOutlined';

import { api } from '../common/requestClient.js';
import { log } from '../common/logging.js';

const config = require('../common/config.js');

const styles = theme => ({
  avatar_big: {
    width: theme.spacing.unit * 10,
    height: theme.spacing.unit * 10,
    backgroundColor: theme.palette.secondary.main,
  },
  avatar_small: {
    margin: theme.spacing.unit,
  }
});

class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      user: {},
    }
  }

  converBlogs(blogs) {
    const content = (
      <ul>
        {blogs.map((blog) => 
          <li key = {blog.title}>
            <h3> {blog.title} </h3>
            <p> {blog.content} </p>
          </li>
        )}
      </ul>
    );

    return (
      <div>
        {content}
      </div>
    );
  }

  getAllBlogs(username) {
    const blogs = [
      {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
      {id: 2, title: 'Installation', content: 'You can install React from npm.'}
    ];
    this.setState({
      blogs: blogs,
    });
  }

  getUserInfo(username) {
    api.request(config.info + username + '/').then((res) => {
      this.setState({
        user: res,
      });
    },
    (error) => {
      log.error('request getUserInfo error ' + JSON.stringify(error));
    });
  }

  componentWillMount() {
    log.info('person page start');
    this.getUserInfo(this.props.username ? this.props.username : this.props.match.params.username);
    this.getAllBlogs(this.props.username ? this.props.username : this.props.match.params.username);
  }

  componentWillUnmount() {
    log.info('person page end');
  }

  render() {
    const { classes } = this.props;
    return (
      <main>
        <ul>
          <Avatar src={this.state.user.avatar} className={classes.avatar_big} > User </Avatar>
          <li> {this.state.user.username} </li>
        </ul>

        <hr />
        <hr />

        {this.converBlogs(this.state.blogs)}
      </main>
    );
  }
};

export default withStyles(styles, {name:'class_name'})(Person);
