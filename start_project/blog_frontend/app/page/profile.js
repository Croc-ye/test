
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import AppTopBar from '../components/app_top_bar.js';
import {account} from '../common/account.js';
import {api} from '../common/requestClient.js';
import hint from '../common/message.js';
import {log} from '../common/logging.js';
import mrouter from '../common/mrouter.js';
const config = require('../common/config.js');

const styles = theme => ({
  main: {
    'display': 'flex',
    'flex-direction': 'column',
    'width': '100%',
    'height': '100%',
  },
  user_and_blog: {
    'display': 'flex',
    'flex-direction': 'row',
    'width': '100%',
    'height': '100%',
    'margin-top': '2%',
  },
  blog: {
    'display': 'flex',
    'flex-direction': 'column',
    'width': '80%',
    'height': '100%',
  },
  info: {
    'display': 'flex',
    'flex-direction': 'column',
    'width': '20%',
    'height': '100%',
    'margin-left': theme.spacing.unit * 1,
  },
  blog_list_view: {
    'display': 'flex',
    'flex-direction': 'column',
    'width': '100%',
    'height': '100%',
  },
  one_blog: {
    'width': '100%',
    'height': '50%',
    'margin-bottom': theme.spacing.unit * 3,
  },
  user: {
    'display': 'flex',
    'flex-direction': 'column',
    'width': '100%',
    'height': '10%',
    'justify-content': 'flex-end',
  },
  blog_list_title: {
    'color': '#258ef7',
    'font-size': theme.spacing.unit * 3,
    'width': '100%',
  },
  blog_list_content: {
    'font-size': theme.spacing.unit * 2,
  },
  blog_list_other: {
    'font-size': theme.spacing.unit * 2,
    'margin-top': theme.spacing.unit * 2,
  },
  userinfo: {
    'display': 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
  },
  avatar: {
    'width': theme.spacing.unit * 7,
    'height': theme.spacing.unit * 7,
    'background-color': 'red',
  },
  username: {
  },
  info_view: {
    'display': 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
  },
  comment: {
    'display': 'flex',
    'flex-direction': 'column',
  },
  new_comment: {
    'margin-top': "25%",
    'margin-left': theme.spacing.unit * 2,
  },
  comment_item: {
    'display': 'flex',
    'flex-direction': 'row',
    'margin-top': theme.spacing.unit * 1,
  },
  comment_item_username: {
    "color":"#f41835", 
    "marginLeft": "20px",
    'fontSize': theme.spacing.unit * 2,
  },
  new_blog: {
    "color":'#258ef7',
    'margin-left': theme.spacing.unit * 2,
  }
});

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      user: {
        username: this.props.match.params.username,
      },
      comment: [
      ],
      stack: null,
      blogs: [],
    };
  }

  componentWillMount() {
    api.request(`${config.info}${this.state.user.username}/`).then(
      (success)=>{
        this.setState({
          user: success,
        })
      },
      (error)=> {
        hint.showDialog("Server:", "sorry, internal error", mrouter.goToLoginPage, mrouter.goToLoginPage);
      }
    );
    api.request(`${config.blogs}${this.state.user.username}/`).then(
      (success)=>{
        this.setState({
          blogs: success,
        });
      },
      (error)=>{
        hint.showDialog("Server:", "please login", mrouter.goToLoginPage, mrouter.goToLoginPage);
      }
    );
    api.request(config.latestComment, {username:this.state.user.username}).then(
      (success) => {
        this.setState({
          comment: success,
        });
      },
      (error) => {
        log.error(error);
      }
    );
  }

  componentWillUnmount() {
  }

  handleOnBlogClick(idx) {
    mrouter.goToBlogPage(this.state.user.username, idx);
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
  converBlogToList() {
    const {classes} = this.props;
    const result = (
      this.state.blogs.map((blog, idx) => (
        <div key={idx}>
          <div className={classes.one_blog}>
            <div className={classes.blog_list_title} >
              <font 
                id={`blog_title_${idx}`} 
                onMouseOver={(e)=>this.onEnter(`blog_title_${idx}`)}
                onMouseOut={(e)=>this.onOut(`blog_title_${idx}`)}
                onClick={(e)=>{this.handleOnBlogClick(blog.user_blog_id)}}
              > 
                {blog.title + `    (${blog.create_time}) `}
              </font>
            </div>
            <hr />
            <font className={classes.blog_list_content}> 
              {blog.content.length > 200 ? blog.content.substring(0, 200) + " ..." : blog.content}
            </font>

          </div>
        </div>
      ))
    );
    return result;
  }

  handleOnAvatarClick(e) {
    if (!account.isOwner(this.state.user.username)) {
      return;
    }
    const that = this;
    const file = document.getElementById('input_avatar');
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
            log.error(JSON.parse(xhr.responseText));
            hint.showDialog("Error", "sorry, internal error, change fail", null, null);
          }
        }
      }
    }
  }

  searchPerson(e) {
    if (e.keyCode === 13) {
      const value = document.getElementById("input_search").value;
      api.request(config.blogSearch, {
        username: this.state.user.username,
        search_key_word: value,
      }).then(
        (success) => {
          this.setState({
            blogs: success,
          });
        },
        (error) => {
          hint.showDialog("nothing", "sorry, nothing found", null, null);
          log.error(error);
        }
      );
    }
  }

  showProfile() {
    const {classes} = this.props;

    const UserInfo = () => (
      <div className={classes.userinfo}>
        <Avatar 
          src={this.state.user.avatar} 
          className={classes.avatar}
          onClick={(e)=>{this.handleOnAvatarClick(e)}}
        >
          {this.state.user.username[0]} 
        </Avatar>
        <font className={classes.username}>  {this.state.user.username} </font> 

        <input id="input_avatar" hidden type="file" name="file" accept="image/png,image.jpg" />

      </div>
    );

    const Blog = () => (
      <div className={classes.blog_list_view} >
        {this.converBlogToList()}
      </div>
    );

    const Comment = () => (
      this.state.comment.map((value, idx) => (
        <div className={classes.comment_item} key={idx}
          onClick={(e)=>{mrouter.goToBlogPage(this.state.user.username, value.user_blog_id)}}
        >
          <font 
            id={`comment_${idx}`}
            className={classes.comment_item_username}
            onMouseOver={(e)=>this.onEnter(`comment_${idx}`)}
            onMouseOut={(e)=>this.onOut(`comment_${idx}`)}
          > 
            {value.username}
          </font>
          <font> : </font>
          <font 
            style={{
              "marginLeft": "20px", 
              "overflow": "hidden", 
              "textOverflow": "ellipsis",
              "whiteSpace": "nowrap",
            }}> {value.comment} </font>
        </div>
      ))
    );

    const Info = () => (
      <div>

        <div className={classes.new_comment}>
          <font>最新评论:</font>
          <div className={classes.comment}>
            <Comment />
          </div>
        </div>

        
        <hr />

      </div>
    );

    const result = () => (
      <div className={classes.user_and_blog}>
        <div className={classes.blog}>
          <UserInfo />
          <Blog />
        </div>
        <hr />
        <div className={classes.info}>
          <Info />
        </div>

      </div>
    );

    return result();
  }

  render() {
    const {classes} = this.props;
    return (
      <main className={classes.main}>
        <AppTopBar need={true} onBarKeyDown={(e)=>{this.searchPerson(e)}}/>
        {this.showProfile()}
      </main>
    );
  }
}

export default withStyles(styles)(Profile);
