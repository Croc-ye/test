import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import mrouter from '../common/mrouter.js';
import { api } from '../common/requestClient.js';
import { log } from '../common/logging.js';
const config = require('../common/config.js');

const styles = theme => ({
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
    'white-space':'pre',
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
    'white-space':'pre',
  },
  blog_comment: {
    'display': 'flex',
    'flex-direction': 'column',
    'margin-top': theme.spacing.unit * 5,
    'background-image': 'url(' + 'http://119.23.231.141/mongo_img/bb1a06cfdefa8febec1a598d89692cf.jpg' + ')',
    'justify-content': 'flex-start',
  },
  blog_comment_title: {
    'color': '#2979ff',
  },
  blog_comment_view: {
    'display': 'flex',
    'flex-direction': 'row',
  },
  blog_comment_view_avatar: {
    width: theme.spacing.unit * 5,
    height: theme.spacing.unit * 5,
    backgroundColor: '#f1f8e9',
    'margin-left': theme.spacing.unit * 6,
  },
  blog_comment_content: {
    'display': 'flex',
    'flex-direction': 'row',
    'flex-wrap': 'wrap',
    'word-break': 'break-all',
    'margin-left': theme.spacing.unit * 4,
  },
  blog_comment_conten_text: {
    'color': '#009688',
    'margin-top': theme.spacing.unit,
    'font-size': theme.spacing.unit * 4,
  },
  blog_comment_user: {
    'display': 'flex',
    'flex-direction': 'column',
  },
  love: {
    'display': 'flex',
    'flex-direction': 'row',
    'justify-content': 'center',
  },
  love_icon: {
    'margin-top': theme.spacing.unit * 2,
    'width': theme.spacing.unit * 3,
    'height': theme.spacing.unit * 3,
  },
  add_comment_view: {
    'display': 'flex',
    'flex-direction': 'column',
  },
  add_comment_confirm: {
    'margin-left': theme.spacing.unit,
  },

  add_comment_cancel: {
    'margin-left': theme.spacing.unit * 4,
  },
  add_comment_button: {
    'display': 'flex',
    'flex-direction': 'row',
    'justify-content': 'flex-start',
  }
});

class BlogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: {
        title: null,
        content: null,
      },
      username: this.props.match.params.username,
      user_blog_id: this.props.match.params.user_blog_id,
      hidden: true,
    }
    this.buttonKey = 13;
  }

  fetchBlogIfNeed() {
    const username = this.props.match.params.username;
    const user_blog_id = this.props.match.params.user_blog_id;
    api.request(`${config.blog}${username}/${user_blog_id}/`).then((res) => {
      api.request(`${config.getComment}`, {
        comment_list: res.comment || "",
      }).then((success) => {
        res.comment = success;
        this.setState({
          blog: res,
        });
      }, (error) => {
        res.comment = null;
        this.setState({
          blog: res,
        });
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

  converBlogComment(comment) {
    console.log(comment);
    const {classes} = this.props;
    const result = comment.map((value, idx) => 
      <div key={idx} >
        <div className={classes.blog_comment_view}>
          <div className={classes.blog_comment_user}>
            <Avatar src={value.user.avatar} className={classes.blog_comment_view_avatar} > User </Avatar>
            <ul>{value.user.username}</ul>
          </div>
          <div className={classes.blog_comment_content}>
            <div className={classes.blog_comment_conten_text}>
              {value.comment}
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
    return (
      <div>
        {result}
      </div>
    );
  }

  clickLove() {
    api.request(`${config.blogLove}${this.state.username}/${this.state.user_blog_id}/`).then(
      (success)=>{
        this.state.blog.love += success.success,
        this.setState({
        });
      },
      (error)=>{
        log.error(error);
      }
    );
  }
  clickAddCommentComfirm() {
    const value = document.getElementById('comment_text').value;
    api.request(config.blogWriteComment, {
      username: this.state.username,
      user_blog_id: this.state.user_blog_id,
      content: value,
    }).then((success)=> {
      this.fetchBlogIfNeed();
      this.setState({
        hidden: true,
      });
    }, (error) => {
      alert(JSON.stringify(error));
      log.error(error);
    })
  }
  pressEnterToComment(e) {
    if (e.keyCode === this.buttonKey) {
      this.clickAddCommentComfirm();
    }
  }
  clickComment() {
    const { classes } = this.props;
    this.state.hidden = !this.state.hidden;
    this.setState({
      hidden: this.state.hidden,
    });
    if (this.state.hidden) {
      return;
    }
    const CommentBar = () => (
      <div className={classes.add_comment_view} hidden={this.state.hidden} id="comment_bar">
        <div>
          <TextField
            id="comment_text"
            hidden={this.state.hidden}
            label="comment:"
            style={{ margin: 8 }}
            placeholder="Useful for me, thanks!"
            helperText="you are adding a comment"
            fullWidth
            margin="normal"
            autoFocus
            onKeyDown={(e)=>{this.pressEnterToComment(e)}}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className={classes.add_comment_button}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            className={classes.add_comment_confirm}
            onClick={()=>{this.clickAddCommentComfirm();}}
          >
            confirm
          </Button>

          <Button
            type="button"
            variant="contained"
            color="secondary"
            className={classes.add_comment_cancel}
            onClick={()=>{this.clickComment();}}
          >
            cancel
          </Button>

        </div>
      </div>
    );
    ReactDOM.render(
      <CommentBar />,
      document.getElementById('comment'),
    );
  }

  render() {
    const {classes} = this.props;
    return (
      <main>
        <div className={classes.main}>
          <div className={classes.blog_title}>
            <div className={classes.blog_title_text}> {this.state.blog.title} </div>
          </div>
          <div className={classes.blog_content}>
            <div className={classes.blog_content_text}> {this.state.blog.content} </div>
          </div>
        </div>

        <hr />
        <div className={classes.love}>
          <BottomNavigation
            showLabels
            onClick={()=>{this.clickLove();}}
          >
            <BottomNavigationAction label={this.state.blog.love} icon={<FavoriteIcon />} />
          </BottomNavigation>
        </div>
        <div className={classes.blog_comment}>
          <div>
            <Button size="medium" className={classes.blog_comment_title} onClick={()=>{this.clickComment();}}>comment:</Button>
          </div>
          <div  id="comment"  hidden={this.state.hidden} />
          {
            this.state.blog.comment &&
            this.converBlogComment(this.state.blog.comment)
          }
        </div>
      </main>
    )
  }
}

export default withStyles(styles)(BlogPage);
