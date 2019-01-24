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
import Search from '../components/search.js';
import mrouter from '../common/mrouter.js';
import FriendList from './friendlist.js';
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
  },
  root: {
    'display': 'flex',
    'flex-directon': 'row',
    'justify-content': 'space-between',
  },
  username: {
    'display': 'flex',
    'margin-top': theme.spacing.unit * 4,
    'justify-content': 'left',
    'margin-left': theme.spacing.unit,
  },
  write_blog: {
  },
  write_blog_icon: {
    'margin-top': theme.spacing.unit * 2,
  },
  avatar_with_username: {
    'display': 'flex',
    'flex-directon': 'row',
  },
  hidden: {
    'display': 'none',
  }
});

class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      user: {},
      username: this.props.username ? this.props.username : this.props.match.params.username,
      editAble: false,
    }
  }

  converBlogs(blogs) {
    const content = (
      blogs.map((blog, idx)=>
        <div key={blog.user_blog_id}>
          <BlogList 
            blog={blog}
            editAble={this.state.editAble}
            clickfunMore={(e)=>{
              mrouter.goToBlogPage(this.state.username, blog.user_blog_id);
            }}
            
            clickfunEdit={(e)=>{
              mrouter.goToBlogPage(this.state.username, blog.user_blog_id);
            }}

            clickfunDelete={(e)=>{
              api.request(`${config.blogDelete}${blog.user_blog_id}/`).then((success) => {
                alert("OK! blog success deleted");
                const newBlogs = [];
                for (let i = 0; i < blogs.length; i++) {
                  if (i == idx) {
                    continue;
                  }
                  newBlogs.push(blogs[i]);
                }
                this.setState({
                  blogs: newBlogs,
                });
              }, (error)=> {
                log.error(error);
                alert(error);
              });
            }}
          />
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

  setUserInfo(user, editAble) {
    this.setState({
      user: user,
      editAble: editAble,
    });
  }

  getUserInfo(username) {
    api.request(config.info + username + '/').then((res) => {
      api.request(config.checkSession).then((canEdit)=> {
        if (canEdit.username === username) {
          this.setUserInfo(res, true);
        } else {
          this.setUserInfo(res, false);
        }
      }, (notEdit) => {
        this.setUserInfo(res, false);
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

  onAvatarChange() {
    if (!this.state.editAble) {
      return;
    }
    const that = this;
    const file = document.getElementById('file');
    file.click(); // 调取系统选择图片的弹框
    
    // 监听input的file变化值
    file.onchange = function (event) {
        let file = event.target.files[0];
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
          alert('不是有效的图片文件!');
          return;
        }
        upload(file);
    }

    function upload(file) {
        let xhr = new XMLHttpRequest();
        let formData = new FormData();
        formData.set('filename', file);
        xhr.withCredentials = true;
        xhr.open('post', config.apiHostPrefix + config.userAvatar, true);
        xhr.send(formData);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              const user = JSON.parse(xhr.responseText);
              that.setState({
                user: user,
              });
            } else {
              alert(JSON.parse(xhr.responseText));
            }
          }
        }
    }
  }

  onClickWriteBlog() {
    mrouter.goToWriteBlogPage();
  }
  callback(blogs) {
    this.setState({
      blogs: blogs,
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <div className={classes.root}>
          <div className={classes.avatar_with_username}>
            <Avatar id="avatar" onClick={()=>{this.onAvatarChange();}} src={this.state.user.avatar} className={classes.avatar_big} > User </Avatar>
            <div className={classes.username}>
              {this.state.user.username} 
            </div>
            <form id="uploadForm" encType="multipart/form-data" method="post">
                <Input className={classes.hidden} type="file" name="file" id="file" accept="image/*" >更改头像 </Input>
            </form>
          </div>

          <div>
            <Search username={this.state.username} callback={(blogs)=>{this.callback(blogs)}}/>
          </div>

          {this.state.editAble && 
          <div className={classes.write_blog}>
            <Fab size="small" color="secondary" aria-label="Add" className={classes.write_blog_icon}>
              <AddIcon onClick={()=>{this.onClickWriteBlog()}} />
            </Fab>
          </div>}

        </div>

        <hr />
        <hr />
        {this.converBlogs(this.state.blogs)}

        <hr />
        <hr />
        <FriendList /> 

      </main>
    );
  }
};

export default withStyles(styles, {name:'class_name'})(Person);
