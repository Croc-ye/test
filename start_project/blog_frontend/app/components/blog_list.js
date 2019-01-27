
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Badge from '@material-ui/core/Badge';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import mrouter from '../common/mrouter.js';
import { api } from '../common/requestClient.js';
import { log } from '../common/logging.js';
const config = require('../common/config.js');

const styles = theme => ({
  main: {
    'display': 'flex',
    'flex-direction': 'row',
    'justify-content': 'flex-start',
    'align-items': 'center',
    'flex-wrap': 'wrap',
    'width': '100%',
    'height': '100%',
  },
  card: {
    'display': 'flex',
    'flex-direction': 'column',
    'align-items': 'flex-start',
    'height': 300,
    'width': 250,
    'margin-top': theme.spacing.unit * 4,
    'margin-right': theme.spacing.unit * 4,
    'margin-left': theme.spacing.unit * 4,
    'background-color': '#F5F4D7',
    'border':'#F5F4D7',
  },
  CardHeader: {
    'width': '100%',
    'height': '20%',
  },
  media: {
    'width': '100%',
    'height': '50%',
  },
  CardContent: {
    'width': '100%',
    'height': '77%',
  },
});

class BlogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [
      ],
      loveOrNot: ["", "red"],
      loveId: 0,
    }
  }

  onLoveOrNotClick(idx, username, user_blog_id) {
    // this.setState({
    //   loveId: this.state.loveId === 0 ? 1 : 0,
    // });
    api.request(`${config.blogLove}${username}/${user_blog_id}/`).then(
      (success) => {
        this.state.blogs[idx].love += success.success;
        this.setState({
          blogs: this.state.blogs,
        });
      },
      (error) => {
        log.error(error);
      }
    );
  }

  componentWillMount() {
    api.request(config.latestBlog).then(
      (success) => {
        console.log(success);
        this.setState({
          blogs: success,
        });
      },
      (error) => {
        log.error(error);
      }
    );
  }

  componentWillUnmount() {
  }

  converBlogToCards() {
    const {classes} = this.props;
    const result = (
      this.state.blogs.map((blog, idx) => (
        <Card className={classes.card} key={idx}>

          <CardHeader
            className={classes.CardHeader}
            avatar={
              <Avatar src={blog.user.avatar}> {blog.user.username[0]} </Avatar>
            }
            title={blog.title}
            subheader={blog.create_time}
          />

          <CardContent className={classes.CardContent}>
            <Typography component="p" style={{'whiteSpace':'pre'}}>
              {blog.content}
            </Typography>
          </CardContent>

        <CardActions className={classes.actions} disableActionSpacing>

          <IconButton 
            aria-label="Add to favorites" 
            style={{"color":this.state.loveOrNot[this.state.loveId]}} 
            onClick={(e)=>{this.onLoveOrNotClick(idx, blog.user.username, blog.user_blog_id)}}>
              <Badge badgeContent={blog.love} color="secondary">
                <FavoriteIcon />
              </Badge>
          </IconButton>

          <IconButton aria-label="Share" onClick={(e)=>{mrouter.goToBlogPage(blog.user.username, blog.user_blog_id)}}>
            <ShareIcon />
          </IconButton>

        </CardActions>

        </Card>
      ))
    );
    return result;
  }

  getBlogList() {
    const {classes} = this.props;
    const result = () => (
      <main className={classes.main}>
        {this.converBlogToCards()}
      </main>
    );
    return result();
  }

  render() {
    return (
      <div >
        {this.getBlogList()}
      </div>
    );
  }
}

export default withStyles(styles)(BlogList);
