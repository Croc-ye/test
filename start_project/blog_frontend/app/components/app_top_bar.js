
import React from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import mrouter from '../common/mrouter.js';
import hint from '../common/message.js';
import { api } from '../common/requestClient.js';
import { log } from '../common/logging.js';
const config = require('../common/config.js');
const color = require('../common/config.js');

const styles = theme => ({
  main: {
    'display': 'flex',
    'flex-direction': 'row',
    'width': '100%',
    'height': '100%',
    'justify-content': 'flex-start',
    'align-items': 'flex-start',
  },
  appBar: {
    'display': 'flex',
    'flex-direction': 'row',
    'justify-content': 'space-between',
    'align-items': 'center',
    'width': '100%',
    'height': theme.spacing.unit * 6,
  },
  title: {
    'font-size': theme.spacing.unit * 3,
  },
  Search: {
    'display': 'flex',
    'flex-direction': 'row',
    'align-items': 'center',
    'color': 'white',
  },
  searchIcon: {
  },
  searchInput: {
    'margin-left': theme.spacing.unit,
    'color': 'white',
  },
  LogoUser: {
    'display': 'flex',
    'flex-direction': 'row',
    'align-items': 'center',
    'justify-content': 'space-between',
  },
  list: {
    'width': '100%',
    'display': 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    'justify-content': 'center',

  },
});

class AppTopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: false,
    }
  }

  getRightProfileList() {
    const {classes} = this.props;
    const profileList = (
      <div className={classes.list}>
        <List>

          <ListItem button onClick={(e)=>{mrouter.goToProfilePage()}}>
            <ListItemIcon><AccountCircle /></ListItemIcon>
            <ListItemText 
              primary="profile" 
            />
          </ListItem>

          <Divider />

          <ListItem button onClick={(e)=>{mrouter.goToLoginPage()}}>
            <ListItemIcon><DeleteIcon /></ListItemIcon>
            <ListItemText primary="logout" />
          </ListItem>

        </List>
      </div>
    );
    return profileList;
  }

  openRightProfile() {
    this.setState({
      profile: true,
    });
  }

  closeRightProfile() {
    this.setState({
      profile: false,
    }); 
  }

  appTopBar() {
    const {classes} = this.props;

    const Title = () => (
      <div onClick={(e)=>{mrouter.backOnePage()}}>
        <Tooltip title="Back to previous page">
          <IconButton color="inherit">
            <ThreeSixtyIcon />
          </IconButton>
        </Tooltip>
      </div>
    );

    const Search = () => (
      <div className={classes.Search}>
        <SearchIcon className={classes.searchIcon}/>
        <Input
          className={classes.searchInput}
          placeholder="search...."
        />
      </div>
    );

    const LogoUser = () => (
      <div className={classes.LogoUser}>

        <IconButton color="inherit">
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>

        <IconButton color="inherit" onClick={(e)=>{this.openRightProfile(e)}}>
            <AccountCircle />
        </IconButton>

      </div>
    );

    const RightProfile = () => (
      <Drawer open={this.state.profile} anchor="right"  onClick={(e)=>{this.closeRightProfile()}}>
        <div
          tabIndex={0}
          role="button"
        >
          {this.getRightProfileList()}
        </div>
      </Drawer>
    );

    const result = () => (
      <main className={classes.main}>
        <AppBar className={classes.appBar} position="static"> 
          <Title title={"Material-ui"} />
          <Search />
          <LogoUser />
          <RightProfile />
        </AppBar>
      </main>
    );
    return result();
  }

  render() {
    return (
      <div>
        {this.appTopBar()}
      </div>
    );
  }
}

export default withStyles(styles)(AppTopBar);
