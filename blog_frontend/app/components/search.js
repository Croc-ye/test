import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';

import mrouter from '../common/mrouter.js';
import { api } from '../common/requestClient.js';
import { log } from '../common/logging.js';
const config = require('../common/config.js');

const styles = theme => ({
  main: {
    'display': 'flex',
    'flex-direction': 'row',
    'justify-content': 'center',
    'width': '100%',
    'height': '100%',
  },
  searchIcon: {
    'margin-top': theme.spacing.unit * 3,
  },
  searchInput: {
    'margin-top': theme.spacing.unit * 2,
    'margin-left': theme.spacing.unit * 2,
    'width': theme.spacing.unit * 20,
  }
});

class Seach extends React.Component {
  constructor(props) {
    super(props);
    this.buttonKey = 13;
    this.state = {
      username: props.username,
    };
  }

  getAllBlogs(username) {
    api.request(config.blogs + username + '/').then((res)=>{
      this.props.callback(res);
    },
    (error)=>{
      log.error(error);
    })
  }

  requestSearch() {
    const value = document.getElementById('input_search').value;
    api.request(config.blogSearch, {
      username:this.state.username,
      search_key_word: value,
    }).then(
      (success)=>{
        this.props.callback(success);
        console.log(success);
      },
      (error)=>{
        alert(error);
        this.getAllBlogs(this.state.username);
        log.error(error);
      }
    );
  }

  handleKeyDown(e) {
    if (e.keyCode === this.buttonKey) {
      this.requestSearch();
    }
  }

  search() {
    const {classes} = this.props;
    const searchPage = () => (
      <main className={classes.main}>

        <div className={classes.searchIcon}>
          <SearchIcon 
            onClick={()=>{this.requestSearch()}}
          />
        </div>

        <div className={classes.searchInput}>
          <Input
            id="input_search"
            placeholder={"Search in " + this.state.username}
            onKeyDown={(e)=>{this.handleKeyDown(e)}}
          />
        </div>

      </main>
    );
    return searchPage();
  }

  render() {
    return (
      <div>
        {this.search()}
      </div>
    );
  }
}

export default withStyles(styles)(Seach);
