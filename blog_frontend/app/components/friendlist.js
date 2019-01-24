import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';

import mrouter from '../common/mrouter.js';
import { api } from '../common/requestClient.js';
import { log } from '../common/logging.js';
const config = require('../common/config.js');

const styles = theme => ({
  friendlist_view: {
    'display': 'flex',
    'flex-direction': 'column',
    'margin-top': theme.spacing.unit * 3,
    'width': '100%',
    'height': '100%',
    'flex-wrap': 'wrap',
  },
  main: {
    'display': 'flex',
    'justify-content': 'flex-star',
    'flex-direction': 'row',
  },
  avatar_username_view: {
    'margin-left': theme.spacing.unit * 2,
    'display': 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    'width': theme.spacing.unit * 20,
    'height': theme.spacing.unit * 20,
  },
  avatar_view: {
    'margin-top': theme.spacing.unit * 2,
    'width': theme.spacing.unit * 10,
    'height': theme.spacing.unit * 10,
  },
  username_view: {
    'font-size': theme.spacing.unit * 3,
  }
});

class FriendList extends React.Component {
  constructor(props) {
    super(props);
    this.buttonKey = 13;
    this.state = {
      friend: [],
    }
  }

  fetchFriends() {
    api.request(config.friendUser).then(
      (success)=>{
        this.setState({
          friend: success,
        })
      },
      (error)=> {
        log.error(error);
      }
    );
  }

  componentWillMount() {
    this.fetchFriends();
    log.info('FriendList page start');
  }
  componentWillUnmount() {
    log.info('FriendList page end');
  }

  friend() {
    const {classes} = this.props;
    const friendPage = () => (
      this.state.friend.map((value, idx) => (
        <div className={classes.main} key={idx}>
          <div className={classes.avatar_username_view}>
            <Avatar id="avatar" onClick={()=>{mrouter.goToPersonPage(value.username);window.location.reload();}} src={value.avatar} className={classes.avatar_view} > User </Avatar>
            <p className={classes.username_view} > {value.username} </p>
          </div>
        </div>
      ))
    );
    return friendPage();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.friendlist_view}>
        <div>
          User In Blog:
        </div>
        <div className={classes.main}>
          {this.friend()}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FriendList);
