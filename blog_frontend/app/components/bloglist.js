import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import { api } from '../common/requestClient.js';
const styles = (theme) => ({
  card: {
    minWidth: 275,
    'background-color': '#f1f8e9',
    'marginTop': 20,
    'display': 'flex',
    'flex-direction': 'column',
    'flex-wrap': 'wrap',
    'word-break': 'break-all',
  },
  button_more: {
    color: blue[500],
  },
  button_delete: {
    color: red[500],
  },
  button_edit: {
    color: green[500],
  },
  button_view: {
    'display': 'flex',
    'flex-direction': 'row',
    'justify-content': 'space-between',
  },
  content: {
    'margin-top': theme.spacing.unit,
    'white-space':'pre',
  },
  content_title: {
    'white-space':'pre',
  }
});

function BlogList(props) {
  const { classes } = props;
  const { blog } = props;
  const { clickfunMore } = props;
  const { clickfunEdit } = props;
  const { clickfunDelete } = props;
  const { editAble } = props;
  if (!blog) {
    return;
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h4" component="h2" className={classes.content_title}>
          {blog.title}
        </Typography>
        <Typography component="p" className={classes.content}>
          {blog.content}
        </Typography>
      </CardContent>
      <div className={classes.button_view}>
        <Button size="small" className={classes.button_more} onClick={clickfunMore}>Learn More</Button>
        {
          editAble && 
          <Button size="small" className={classes.button_edit} onClick={clickfunEdit}>edit</Button>
        }
        {
          editAble && 
          <Button size="small" className={classes.button_delete} onClick={clickfunDelete}>delete</Button>
        }
      </div>
    </Card>
  );
}

BlogList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlogList);