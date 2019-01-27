
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import hint from '../common/message.js';
import mrouter from '../common/mrouter.js';
import {api} from '../common/requestClient.js';
import {log} from '../common/logging.js';
const config = require('../common/config.js');

const styles = theme => ({
  main: {
    'display': 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    'flex-wrap': 'wrap',
    'width': '100%',
    'height': '100%',
  },
  avatar_and_username: {
    'display': 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    'width': '10%',
    'height': '10%',
    'margin-top': theme.spacing.unit * 4,
  },
  username: {
    'font-size': theme.spacing.unit * 2,
  },
  user_list: {
  }
});

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[
        {username:"weimingliu", avatar:"http://119.23.231.141:8082/mongo_img/cat.jpg"},
        {username:"weimingliu", avatar:"http://119.23.231.141:8082/mongo_img/cat.jpg"},
        {username:"weimingliu", avatar:"http://119.23.231.141:8082/mongo_img/cat.jpg"},
      ]
    }
  }

  componentWillMount() {
    api.request(config.friendUser).then(
      (success) => {
        this.setState({
          users: success,
        });
      },
      (error) => {
        log.error(error);
      }
    );
  }

  componentWillUnmount() {
  }

  converUserToList() {
    const {classes} = this.props;
    const result = (
      this.state.users.map((user, idx) => (
        <div key={idx}>
          <IconButton 
            aria-label="Share" 
            onClick={(e)=>{mrouter.goToProfilePage(user.username)}}
            className={classes.user_list}
          >
            <div className={classes.avatar_and_username}>
              <Avatar src={user.avatar} > {user.username[0]} </Avatar>
              <p className={classes.username}> {user.username} </p>
            </div>
          </IconButton>
        </div>
      ))
    );
    return result;
  }

  getUserList() {
    const {classes} = this.props;
    const result = () => (
      <main className={classes.main}>
        {this.converUserToList()}
      </main>
    );
    return result();
  }

  render() {
    return (
      <div>
        {this.getUserList()}
      </div>
    );
  }
}

export default withStyles(styles)(UserList);
