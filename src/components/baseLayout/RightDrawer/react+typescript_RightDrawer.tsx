import React from 'react';
import { Drawer } from '@material-ui/core';
import withRoot from '../../../withRoot';
import classNames from 'classnames';
import { MessagePane } from '../MessagePane';
import useStyles from './styles';

interface IRightDrawerProps {
  rightDrawerOpen: boolean;
  setRightDrawerOpen: any;
  client: any;
  activeConversation: any;
  userId: String;
}

const RightDrawer: React.FC<IRightDrawerProps> = ({
  rightDrawerOpen,
  client,
  userId,
  activeConversation
}) => {
  const classes = useStyles();
  return (
    <Drawer
      anchor="right"
      variant="permanent"
      classes={{
        paper: classNames(
          classes.drawerPaper,
          !rightDrawerOpen && classes.drawerPaperClose
        )
      }}
      open={rightDrawerOpen}
    >
      {rightDrawerOpen ? (
        <MessagePane
          activeConversation={activeConversation}
          userId={userId}
          client={client}
        />
      ) : (
          <div />
        )}
    </Drawer>

  )
};

export default withRoot(RightDrawer);
