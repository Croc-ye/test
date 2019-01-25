
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppTopBar from '../components/app_top_bar.js';
import Avatar from '@material-ui/core/Avatar';

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
    'margin-top': theme.spacing.unit * 3,
    'font-size': theme.spacing.unit * 2,
    "whiteSpace": "pre",
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
        title: "flask系统文档教程",
        content: "jbo"
      },
      comment: [
        {user:{username:"weimingliu", avatar:"http://119.23.231.141:8082/mongo_img/cat.jpg"}, comment: "hello"},
        {user:{username:"ruiyangtang", avatar:"http://119.23.231.141:8082/mongo_img/cat.jpg"}, comment: "hello"},
        {user:{username:"pythonlan", avatar:"http://119.23.231.141:8082/mongo_img/cat.jpg"}, comment: "hello"},
      ],
      stack: null,
    }
  }

  componentWillMount() {
  }

  componentWillUnmount() {
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

  converBlog() {
    const {classes} = this.props;

    const Comment = () => (
      this.state.comment.map((value, idx) => (
        <div key={idx} style={{'display':'flex','flexDirection':'row', 'marginBottom':'2%'}}>
          <div className={classes.user}>
            <Avatar src={value.user.avatar} />
            <font
              id={value.user.username}
              onMouseOver={(e)=>this.onEnter(value.user.username)}
              onMouseOut={(e)=>this.onOut(value.user.username)}              
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

          <hr style={{"width":1000}}/>

          <div className={classes.blog_content}>
            {this.state.blog.content}
          </div>

          <div style={{"marginTop":100}}>
            <font
              id="liuyan"
              onMouseOver={(e)=>this.onEnter("liuyan")}
              onMouseOut={(e)=>this.onOut("liuyan")}
              className={classes.comment_color}
            >留言:</font>
            <hr style={{"width":1000}} />
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
