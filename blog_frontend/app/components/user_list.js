
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import hint from '../common/message.js';

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
  }

  componentWillUnmount() {
  }

  converUserToList() {
    const {classes} = this.props;
    const result = (
      this.state.users.map((user, idx) => (
        <div key={idx}>
          <IconButton aria-label="Share" onClick={(e)=>{hint.showDialog(1, 2, 3, 4)}}>
            <div className={classes.avatar_and_username}>
              <Avatar src={user.avatar} />
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
