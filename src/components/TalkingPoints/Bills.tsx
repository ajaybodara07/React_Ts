import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Divider,
  Button
} from '@material-ui/core';
import { styles } from './styles';
import withRoot from '../../withRoot';

interface IBillsProps {
  classes: any;
}

const Bills: React.FC<IBillsProps> = ({ classes }) => {
  return (
    <>
  <Card className={classes.card}>
      <CardContent>
        <img src="coming_soon.jpeg" style={{width:'100%',height:'auto'}}></img>
      <Typography component="p" color="textSecondary">
          UN.glossary.chat powered by <a href="https://artificial.chat/" target="_blank">Artificial.Chat</a>
        </Typography>
        </CardContent>
      </Card>
      <br />
      <br />
      <br />
    </>
  );
};

export default withRoot(withStyles(styles)(Bills));
