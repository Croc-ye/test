
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppTopBar from '../components/app_top_bar.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import hint from '../common/message.js';
import {api} from '../common/requestClient.js';
import {account} from '../common/account.js';
import mrouter from '../common/mrouter.js';
const config = require('../common/config.js');
const styles = theme => ({
  main: {
    'dispaly': 'flex',
    'flex-direction': 'column',
    'width': '100%',
    'height': '100%',
  },
  with_icon: {
    'display': 'flex',
    'flex-direction': 'column',
    'width': '100%',
    'height': '100%',
  },
  write_blog: {
    'display': 'flex',
    'flex-direction': 'column',
    'margin-top': '3%',
    'margin-left': '20%',
    'margin-right': '20%',
  },
  'write_blog_title': {
    'display': 'flex',
    'flex-direction': 'row',
  },
  'write_blog_content': {
    'margin-top': '1%',
    'display': 'flex',
    'fiex-direction': 'row',
    'height': theme.spacing.unit * 50,
    'width': '100%',
    'background-color': '#F5F4D7',
    'resize':'none',
    'overflow-y':'visible',
  },
  'write_blog_content_text': {
    'height': theme.spacing.unit * 50,
    'color': '#258ef7',
  },
  icon_send: {
    'justify-content': 'flex-end',
    'margin': theme.spacing.unit,
    'margin-left': '86%',
    'margin-top': '-34%',
  },
});

class WriteBlog extends React.Component {
  constructor(props) {
    super(props);
    this.tab = 9;
    this.indent = "  ";
    this.state = {
    }
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  onTextAreaKeyDown(e) {
    if (e.keyCode === 9) {
      e.preventDefault();
      document.getElementById("blog_content").value += this.indent;
    }
  }

  onSendClick() {
    const title = document.getElementById("blog_title").value;
    const content = document.getElementById("blog_content").value;
    if (!title) {
      hint.showDialog("Warning", "title can not be empty", null, null);
      return;
    }
    if (!content) {
      hint.showDialog("Warning", "content can not be empty", null, null); 
      return;
    }
    api.request(config.blogWrite, {
      title: title,
      content: content,
    }).then(
      (success) => {
        hint.showDialog("finish", "blog already send", 
          () => {mrouter.goToBlogPage(account.user.username, success.user_blog_id)},
          () => {mrouter.goToBlogPage(account.user.username, success.user_blog_id)});
      },
      (error) => {
        log.error(error);
      }
    );
  }

  writeBlog() {
    const {classes} = this.props;
    const result = () => (
      <div className={classes.with_icon}>

        <div className={classes.write_blog}>
          <div className={classes.write_blog_title}>
            <TextField
              id="blog_title"
              label="Title"
              placeholder="Please enter you title here"
              helperText="hello start project"
              fullWidth
              margin="normal"
              autoFocus
              variant="outlined"
              InputLabelProps={{
                shrink: true,
                required: true,
              }}
            />
          </div>
          <div className={classes.write_blog_content}>
            <textarea 
              id="blog_content"
              className={classes.write_blog_content}
              type="text"
              placeholder="please enter you content here"
              onKeyDown={(e)=>{this.onTextAreaKeyDown(e)}}
            />
          </div>

          
        </div>

        <div className={classes.icon_send} onClick={(e)=>{this.onSendClick()}}>
          <Fab variant="extended" color="primary" aria-label="Add">
            <NavigationIcon />
            send it
          </Fab>
        </div>

      </div>
    );
    return result();
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.main}>
        <AppTopBar />
        {this.writeBlog()}
      </div>
    );
  }
}

export default withStyles(styles)(WriteBlog);
