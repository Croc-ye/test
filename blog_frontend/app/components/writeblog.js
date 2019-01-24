import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import AddIcon from '@material-ui/icons/Add';
import LockIcon from '@material-ui/icons/LockOutlined';
import BlogList from '../components/bloglist.js';
import mrouter from '../common/mrouter.js';
import { api } from '../common/requestClient.js';
import { log } from '../common/logging.js';

const config = require('../common/config.js');

const total_width = 200;
const total_height = 50;

const title_width = 200;
const title_height = 10;


const styles = theme => ({
  input_blog: {
    'display': 'flex',
    'flex-direction': 'column',
    'width': theme.spacing.unit * total_width,
    'height': theme.spacing.unit * total_height,
    'justify-content': 'center',
  },
  input_blog_title: {
    'width': theme.spacing.unit * title_width,
    'height': theme.spacing.unit * title_height,
  },
  input_blog_text: {
    'width': theme.spacing.unit * title_width,
    'height': theme.spacing.unit * (total_height - title_height),
  },
  hr: {
    'margin-top': theme.spacing.unit * 5,
  },
  write_button: {
    'display': 'flex',
    'flex-direction': 'row',
    'justify-content': 'flex-start',
  },
  write_button_confirm: {
  },
  write_button_cancel: {
    'margin-left': theme.spacing.unit * 20,
  },
});

class WriteBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    log.info('write blog page start');
  }

  componentWillUnmount() {
    log.info('write blog page end');
  }

  clickConfirm() {
    const title = document.getElementById('input_blog_title').value;
    const text = document.getElementById('input_blog_text').value;
    api.request(config.blogWrite, {
      title: title,
      content: text,
    }).then((success)=>{
      alert('success');
      mrouter.backOnePage();
    }, (error) => {
      alert(error);
      log.error(error);
    });
  }

  clickCancel() {
    mrouter.backOnePage();
  }

  writeBlogPage() {
    const { classes } = this.props;
    const Page = () => (
      <div className={classes.input_blog}>

        <div className={classes.input_blog_title}>
          <Input
            className={classes.input_blog_title}
            id="input_blog_title"
            name="input_blog_title" 
            type="text"
            autoFocus
            placeholder="input you blog title here"
          />
        </div>

        <hr />

        <div className={classes.input_blog_text_view}>
          <Input
            className={classes.input_blog_text}
            id="input_blog_text"
            name="input_blog_text" 
            placeholder="input you blog content here"
            type="text"
            multiline
            margin="dense"
          />
        </div>

        <div className={classes.write_button}>
          <div>
            <Button
              type="button"
              variant="contained"
              color="primary"
              className={classes.write_button_confirm}
              onClick={()=>{this.clickConfirm();}}
            >
              confirm
            </Button>
          </div>

          <div>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              className={classes.write_button_cancel}
              onClick={()=>{this.clickCancel();}}
            >
              cancel
            </Button>
          </div>
        </div>

      </div>
    );
    return Page;
  }

  render() {
    const { classes } = this.props;
    const Page = this.writeBlogPage();
    console.log(Page());
    return (
      Page()
    );
  }
};

export default withStyles(styles, {name:'class_name'})(WriteBlog);
