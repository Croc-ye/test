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
  card: {
    width: '100%',
    hight: 7000,
    backgroundColor: '#f1f8e9',
    marginTop: 20,
  },
  button: {
    color: blue[500],
  },
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
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4" component="h2">
            {this.state.blog.title}
          </Typography>
          <Typography component="p">
            {this.state.blog.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" className={classes.button}>Learn More</Button>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(BlogPage);
