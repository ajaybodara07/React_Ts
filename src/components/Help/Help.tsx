import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Divider,
  Button,
  Avatar
} from '@material-ui/core';
import { styles } from './styles';
import withRoot from '../../withRoot';

interface IHelpProps {
  classes: any;
}

const Help: React.FC<IHelpProps> = ({ classes }) => {
  return (
    <>

      <br />

      <Card className={classes.card}>
      <CardContent>
        <img src="ac_logo.png" style={{width:'100%',height:'auto'}}></img>
      <Typography component="p" color="textSecondary">
          UN.glossary.chat powered by <a href="https://artificial.chat/" target="_blank">Artificial.Chat</a>
        </Typography>
        </CardContent>
      </Card>
      <br />
      <br />
      <br />
      <br />

    </>
  );
};

export default withRoot(withStyles(styles)(Help));
