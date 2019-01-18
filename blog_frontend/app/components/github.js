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
    backgroundColor: green[50],
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    color: blue[500],
  },
};

function SimpleCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;
  let { blog } = props;
  if (!blog) {
    blog = {
      title: "???",
      content: "fff",
    };
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
        <Button size="small" className={classes.button}>Learn More</Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
