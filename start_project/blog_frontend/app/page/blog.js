
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppTopBar from '../components/app_top_bar.js';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import {log} from '../common/logging.js';
import {api} from '../common/requestClient.js';
import hint from '../common/message.js';
import {account} from '../common/account.js';
import mrouter from '../common/mrouter.js';
const config = require('../common/config.js');

const styles = theme => ({
  main: {
    'display': 'flex',
    'flex-direction': 'column',
    'width': '100%',
    'height': '100%',
  },
  blog: {
    'display': 'flex',
    'flex-direction': 'column',
    'justify-content': 'flex-start',
    'margin-left': '20%',
    'margin-right': '20%',
  },
  blog_title: {
    'display': 'flex',
    'flex-direction': 'column',
    'font-size': theme.spacing.unit * 6,
    'margin-top': theme.spacing.unit * 3,
    'color': '#444441',
    "overflow": "hidden", 
    "textOverflow": "ellipsis",
    "whiteSpace": "nowrap",
  },
  blog_content: {
    'width': '20%',
    'margin-top': theme.spacing.unit * 3,
    'font-size': theme.spacing.unit * 2,
    "whiteSpace": "pre",
    'word-break':'break-all',
  },
  comment: {
    'display': 'flex',
    'flex-direction': 'column',
  },
  comment_user: {
    'display': 'flex',
    'flex-direction': 'column',
    'width': '20%',
    'height': '20%',
  },
  comment_comment: {
    'margin-top': theme.spacing.unit * 2,
    'margin-left': '5%',
  },
  comment_color: {
    'color': '#258ef7',
  },
  user: {
    'display': 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
  }
});

class BlogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: {
      },
      comment: [
      ],
      stack: null,
      hide: 'none',
    }
  }

  componentWillMount() {
    api.request(`${config.blog}${this.props.match.params.username}/${this.props.match.params.user_blog_id}/`).then(
      (success) => {
        api.request(config.getComment, {
          comment_list: success.comment,
        }).then(
          (comment) => {
            this.setState({
              blog: success,
              comment: comment,
            });
          },
          (error) => {
            this.setState({
              blog: success,
            });
            log.error(error);
          }
        );
      }, (error) => {
        log.error(error);
      }
    );
  }

  componentWillUnmount() {
  }

  changeCommentText() {
    this.setState({
      hide: this.state.hide === 'none' ? false : 'none',
    });
  }

  onCommentClick() {
    if (!account.hasLogin()) {
      account.tryLogin(this.changeCommentText, mrouter.goToLoginPage);
    } else {
      this.changeCommentText();
    }
  }

  onEnter(id) {
    this.state.stack = document.getElementById(id).style;
    document.getElementById(id).style.cursor="pointer";
    document.getElementById(id).style.color="blue";
    document.getElementById(id).style.fontSize="larger";
  }
  onOut(id) {
    document.getElementById(id).style=this.state.stack; 
  }

  confirmComment(e) {
    if (e.keyCode === 13) {
      const value = document.getElementById("blog_comment").value;
      if (!value) {
        hint.showDialog("warning", "comment can not be empty", null, null);
        return;
      }
      api.request(config.blogWriteComment, {
        username: this.props.match.params.username,
        user_blog_id: this.props.match.params.user_blog_id,
        content: value,
      }).then(
        (success) => {
          this.state.comment.unshift({
            user: account.user,
            comment: value,
          });
          this.setState({
            comment: this.state.comment,
          });
        },
        (error) => {
          log.error(error);
        }
      );
      this.changeCommentText();
    }
  }

  converBlog() {
    const {classes} = this.props;

    const Comment = () => (
      this.state.comment.map((value, idx) => (
        <div key={idx} style={{'display':'flex','flexDirection':'row', 'marginBottom':'2%'}}>
          <div className={classes.user} onClick={(e)=>mrouter.goToProfilePage(value.user.username)}>
            <Avatar src={value.user.avatar}> {value.user.username[0]} </Avatar>
            <font
              id={`comment_id_${idx}`}
              onMouseOver={(e)=>this.onEnter(`comment_id_${idx}`)}
              onMouseOut={(e)=>this.onOut(`comment_id_${idx}`)}
            > {value.user.username} </font>
          </div>

          <div className={classes.comment_comment}>
            <font> {value.comment} </font>
          </div>
        </div>
      ))
    );

    const result = () => (
      <main className={classes.main}>
        <AppTopBar />
        <div className={classes.blog}>

          <div className={classes.blog_title}>
            <font>{this.state.blog.title}</font>
          </div>

          <hr style={{"width":'100%'}}/>

          <div className={classes.blog_content}>
            <font>{this.state.blog.content} </font>
          </div>

          <div style={{"marginTop":100}}>
            <font
              id="liuyan"
              onMouseOver={(e)=>this.onEnter("liuyan")}
              onMouseOut={(e)=>this.onOut("liuyan")}
              className={classes.comment_color}
              onClick={(e)=>{this.onCommentClick()}}
            >留言:</font>
            <hr style={{"width":'100%'}} />

            <div style={{"display": this.state.hide}}>
              <TextField
                id="blog_comment"
                placeholder="Please enter you comment here, press enter to confirm."
                helperText="hello start project"
                fullWidth
                margin="normal"
                autoFocus
                variant="outlined"
                onKeyDown={(e)=>this.confirmComment(e)}
                InputLabelProps={{
                  autoFocus: true,
                  shrink: true,
                  required: true,
                }}
              />
            </div>

          </div>

          <div className={classes.comment}>
            <Comment />
          </div>

        </div>
      </main>
    );
    return result();
  }

  render() {
    return (
      <div>
        {this.converBlog()}
      </div>
    );
  }
}

export default withStyles(styles)(BlogPage);
