import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import Tooltip from '@material-ui/core/Tooltip';
import LockIcon from '@material-ui/icons/LockOutlined';

import { Link } from 'react-router-dom'
import { api } from '../common/requestClient.js';
import { log } from '../common/logging.js';
import { account } from '../common/account.js';
import mrouter from '../common/mrouter.js';
import hint from '../common/message.js';

const config = require('../common/config.js');

const styles = theme => ({
  main: {
    backgroundColor: green[700],
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: green[500],
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 16,
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.buttonKey = 13;
    
    if (account.hasLogin()) {
      mrouter.goToFirstPage();
    }
  }

  loginRequest(event) {
    const args = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    };
    if (!args.username || !args.password) {
      return;
    }
    api.request(config.login, args).then((success) => {
      log.info('success ' + JSON.stringify(success));
      account.login(success);
      mrouter.goToFirstPage();
    }, (error) => {
      hint.showDialog("Message", "unmatch password, please retry it!", null, null);
      log.error('error ' + JSON.stringify(error));
    });
  }

  pressEnterToLogin(e) {
    if (e.keyCode === this.buttonKey) {
      this.loginRequest();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar} >
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel>Username</InputLabel>
              <Input id="username" type="text" name="username" autoFocus autoComplete="username" placeholder="your username"/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel>Password</InputLabel>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                autoComplete="current-password"
                placeholder="your password"
                onKeyDown={(e)=>{this.pressEnterToLogin(e)}}
              />
            </FormControl>
            <Tooltip title="Confirm To Sing In" classes={{ tooltip: classes.tooltip }}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={()=>{this.loginRequest()}}
              >
                Sign in
              </Button>
            </Tooltip>
          </form>
        </Paper>
      </main>
    );
  }
};

export default withStyles(styles, {name:'class_name'})(Login);
