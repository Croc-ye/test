import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';

import { api } from '../common/requestClient.js';
import { log } from '../common/logging.js';
const config = require('../common/config.js');

const styles = {
  main: {
    'display': 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    'width': '40',
    'height': '40',
    'background-image': 'url(' + 'http://119.23.231.141/mongo_img/bb1a06cfdefa8febec1a598d89692cf.jpg' + ')',
  },
  blog_title: {
    'display': 'flex',
    'flex-direction': 'center',
    'flex-direction': 'row',
    'flex-wrap': 'wrap',
    'word-break': 'break-all',
  },
  blog_title_text: {
    'font-size': 40,
    'color': '#2979ff',
  },
  blog_content: {
    'display': 'flex',
    'flex-direction': 'center',
    'flex-direction': 'row',
    'flex-wrap': 'wrap',
    'word-break': 'break-all',
  },
  blog_content_text: {
    'font-size': 20,
  }
};

class BlogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: {
        title: null,
        content: null,
      },
    }
  }

  fetchBlogIfNeed() {
    const username = this.props.match.params.username;
    const user_blog_id = this.props.match.params.user_blog_id;
    api.request(`${config.blog}${username}/${user_blog_id}/`).then((res) => {
      this.setState({
        blog: res,
      });
    },
    (error) => {
      log.error(error);
    });
  }

  componentWillMount() {
    this.fetchBlogIfNeed();
    log.info('blog page start');
  }
  componentWillUnmount() {
    log.info('blog page end');
  }

  render() {
    const {classes} = this.props;
    return (
      <main className={classes.main}>
        <div className={classes.blog_title}>
          <div className={classes.blog_title_text}> {this.state.blog.title} </div>
        </div>
        <div className={classes.blog_content}>
          <div className={classes.blog_content_text}> {this.state.blog.content} </div>
        </div>
      </main>
    )
  }
}

export default withStyles(styles)(BlogPage);
