
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
    'margin-bottom': theme.spacing.unit * 5,
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
    'font-size': theme.spacing.unit,
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
      needFetchUserInfo: true,
      username: null,
      user: {
        username: this.props.match.params.username,
      },
      comment: [
        {username:"weimingliu", comment:"http://119.23.231.141:8082/mongo_img/cat.jpg"},
        {username:"ruiyangtang", comment:"数量的开发技术的路口及分类考试的积分"},
        {username:"forever", comment:"hello"},
        {username:"go", comment:"hello"},
        {username:"python", comment:"hello"},
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
                {blog.title} 
              </font>
            </div>
            <hr />
            <font className={classes.blog_list_content}> {blog.content}</font>

            <font className={classes.blog_list_other}> other </font>
          </div>
        </div>
      ))
    );
    return result;
  }

  showProfile() {
    const {classes} = this.props;

    const UserInfo = () => (
      <div className={classes.userinfo}>
        <Avatar src={this.state.user.avatar} className={classes.avatar}> {this.state.user.username[0]} </Avatar>
        <font className={classes.username}>  {this.state.user.username} </font> 
      </div>
    );

    const Blog = () => (
      <div className={classes.blog_list_view} >
        {this.converBlogToList()}
      </div>
    );

    const Comment = () => (
      this.state.comment.map((value, idx) => (
        <div className={classes.comment_item} key={idx}>
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
        <div>
          <font 
            id="write_blog"
            className={classes.new_blog}
            onMouseOver={(e)=>this.onEnter("write_blog")}
            onMouseOut={(e)=>this.onOut("write_blog")}
          >写写博客</font>
        </div>
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
        <AppTopBar />
        {this.showProfile()}
      </main>
    );
  }
}

export default withStyles(styles)(Profile);
