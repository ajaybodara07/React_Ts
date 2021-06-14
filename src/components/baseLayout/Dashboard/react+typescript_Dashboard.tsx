import React, { useState  } from 'react';
import { ApolloConsumer } from 'react-apollo';
import {CssBaseline,Typography} from '@material-ui/core';

import { AppBar } from '../AppBar';
import { NorpacBottomNavigation } from '../BottomNavigation';
import { SimpleChatBot } from '../../SimpleChatBot';
import { TalkingPoints } from '../../TalkingPoints';
import { Help } from '../../Help';
import { Bills } from '../../TalkingPoints';
import { RandomUserIdWrapper } from '../../RandomUserIdWrapper';

import useStyles from './styles';

interface IDashboardProps {
  // userInfo: any;
}

const Dashboard: React.FC<IDashboardProps> = () => {
  const classes = useStyles();
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [bottomNav, setBottomNav] = useState('help');
  const [activeConversation, setActiveConversation] = useState({
    id: null,
    name: null,
    conversation: {
      id: null
    }
  });
  const [randUserIdAws, updateRandUserIdAws] = useState('');
  return (
    <ApolloConsumer>
      {client => (
        <div className={classes.root}>
          <RandomUserIdWrapper
            client={client}
            updateRandUserIdAws={updateRandUserIdAws}
          />
          <CssBaseline />
          <AppBar
            classes={classes}
            leftDrawer={{ leftDrawerOpen, setLeftDrawerOpen }}
            rightDrawer={{ rightDrawerOpen, setRightDrawerOpen }}
          />
          <main className={classes.content}>
            {bottomNav === 'chat' && (
              <>
                <Typography
                  style={{
                    position: 'absolute',
                    top: '8.5%',
                    width: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    right: 0,
                    left: 0,
                    background: '#f7f7f7',
                    zIndex: 1000,
                    color: '#444444de',
                    padding: '5px'
                  }}
                  onClick={() =>
                    window.open('https://artificial.chat/', '_blank')
                  }
                >
                  Powered by Artificial.chat
                </Typography>
                <SimpleChatBot
                  client={client}
                  activeConversation={activeConversation}
                  setActiveConversation={setActiveConversation}
                  userId={randUserIdAws}
                />
              </>
            )}
            {bottomNav === 'talking_points' && (
              <>
                <div className={classes.appBarSpacer} />
                <TalkingPoints classes={classes} />
              </>
            )}
            {bottomNav === 'bills' && (
              <>
                <div className={classes.appBarSpacer} />
                <Bills classes={classes} />
              </>
            )}
            {bottomNav === 'help' && (
              <>
                <div className={classes.appBarSpacer} />
                <Help classes={classes} />
              </>
            )}
          </main>
          <NorpacBottomNavigation
            bottomNav={bottomNav}
            setBottomNav={setBottomNav}
          />
        </div>
      )}
    </ApolloConsumer>
  );
};

export default Dashboard;
