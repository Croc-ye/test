import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import LockIcon from '@material-ui/icons/LockOutlined';
import BlogList from '../components/bloglist.js';
import mrouter from '../common/mrouter.js';
import { api } from '../common/requestClient.js';
import { log } from '../common/logging.js';

const config = require('../common/config.js');

const styles = theme => ({
  main: {
  },
  avatar_big: {
    width: theme.spacing.unit * 10,
    height: theme.spacing.unit * 10,
    backgroundColor: '#f1f8e9',
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
      username: this.props.username ? this.props.username : this.props.match.params.username,
    }
  }

  converBlogs(blogs) {
    const content = (
      blogs.map((blog)=>
        <div key={blog.user_blog_id}>
          <BlogList blog={blog} clickfun={(e)=>{
            mrouter.goToBlogPage(this.state.username, blog.user_blog_id);
          }}/>
        </div>
      )
    );

    return (
      <div>
        {content}
      </div>
    );
  }

  getAllBlogs(username) {
    api.request(config.blogs + username + '/').then((res)=>{
      this.setState({
        blogs: res,
      });
    },
    (error)=>{
      log.error(error);
    })
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
    this.getUserInfo(this.state.username);
    this.getAllBlogs(this.state.username);
  }

  componentWillUnmount() {
    log.info('person page end');
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
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
