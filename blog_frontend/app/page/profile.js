import ReactDOM from 'react-dom';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  main: {
    'display': 'flex',
    'flex-direction': 'row',
    'width': '100%',
    'height': '100%',
    'background-color': '#282D31',
  },
  user_and_blog: {
    'display': 'flex',
    'flex-direction': 'row',
    'width': '100%',
    'height': '100%',
    'background-color': '#22567B',
  },
  blog: {
    'display': 'flex',
    'flex-direction': 'column',
    'width': '80%',
    'height': '100%',
    'background-color': '#22567B',
  },
  userinfo: {
    'display': 'flex',
    'flex-direction': 'column',
    'width': '20%',
    'height': '100%',
    'background-color': 'black',
  }
});

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      needFetchUserInfo: true,
      username: null,
      user: {},
      blog: [
        {title:"blog", content:"I love react"},
        {title:"blog", content:"I love react"},
        {title:"blog", content:"I love react"},
      ],
    };
  }

  componentWillMount() {

  }

  componentWillUnmount() {
  }

  showProfile() {
    const {classes} = this.props;

    const Blog = () => (
      <div>
        123
      </div>
    );

    const UserInfo = () => (
      <div>
        456
      </div>
    );

    const result = () => (
      <div className={classes.user_and_blog}>
        <div className={classes.blog}>
          <Blog />
        </div>

        <div className={classes.userinfo}>
          <UserInfo />
        </div>

      </div>
    );

    return result();
  }

  render() {
    const {classes} = this.props;
    return (
      <main className={classes.main}>
        {this.showProfile()}
      </main>
    );
  }
}

export default withStyles(styles)(Profile);
