import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    messagePaneRoot: {
      width: '100%',
      position: 'absolute',
      bottom: 60,
      right: 2
    },
    messageBubbleContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: 15,
      marginTop: 25
    },
    botText: {
      padding: 15,
      maxWidth: '85%',
      // backgroundColor: '#8fccc1',
      backgroundColor:"#9ee0d469",
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
      color: '#383838',
      whiteSpace: 'pre-line',
    },
    userText: {
      padding: 12,
      paddingLeft:20,
      maxWidth: '85%',
      backgroundColor: '#e8e8e8',
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      borderBottomRightRadius: 15,
      whiteSpace: 'pre-line'
    },
    timestamp: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: -15
    },
    messageActions: {
      padding: 15
    },
    messageActionsAction: {
      marginLeft: 10,
      padding: 10
    }
  });
