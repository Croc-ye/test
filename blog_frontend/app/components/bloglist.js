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
const styles = {
  card: {
    minWidth: 275,
    backgroundColor: '#f1f8e9',
    marginTop: 20,
  },
  button: {
    color: blue[500],
  },
};

function BlogList(props) {
  const { classes } = props;
  const { blog } = props;
  const { clickfun } = props;
  if (!blog) {
    return;
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h4" component="h2">
          {blog.title}
        </Typography>
        <Typography component="p">
          {blog.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" className={classes.button} onClick={clickfun}>Learn More</Button>
      </CardActions>
    </Card>
  );
}

BlogList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlogList);