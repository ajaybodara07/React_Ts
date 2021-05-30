import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex'
    },
    messagePaneRoot: { width: '100%', position: 'absolute', bottom: 0 },
    messageBubbleContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: 15
    },
    botText: {
      padding: 15,
      backgroundColor: '#8fccc1',
      maxWidth: '70%',
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
      color: '#383838',
      whiteSpace: 'pre-line',
    },
    userText: {
      padding: 12,
      maxWidth: '70%',
      backgroundColor: '#e8e8e8',
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      color: '#383838',
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
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    slider: {
      padding: '22px 0px',
    },
    sliderRoot: {
      width: 300,
    },
  }));

  export default useStyles;