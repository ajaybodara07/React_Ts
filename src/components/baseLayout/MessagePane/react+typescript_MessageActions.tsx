import React, { useState } from 'react';
import { Popover, Divider, createMuiTheme, MuiThemeProvider, Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import useStyles from './styles';

const theme = createMuiTheme({
  overrides: {
    MuiPopover: {
      paper: {
        maxHeight: "242px",
      },
    },
  }
});

interface IMessageActions {
  actionOpen: any;
  callSetAction: any;
  callDictate: any;
  setTranslation: any;
  comprehend: any;
  anchorEl: any;
  chaTag: any;
  addComment: any;
}

const langMap = [
  { code: "ar", lang: "Arabic" },
  { code: "zh", lang: "Chinese, Mandarin" },
  { code: "da", lang: "Danish" }

];

const MessageActions: React.FC<IMessageActions> = ({ actionOpen, callSetAction, callDictate, setTranslation, comprehend, anchorEl, chaTag, addComment }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Popover
        id="simple-popper"
        open={actionOpen}
        anchorEl={anchorEl}
        onClose={() => callSetAction()}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <ListItem button onClick={() => callDictate()}>
          <ListItemText primary="Text to Speech" />
        </ListItem>
        <Divider />
        <ListItem button onClick={handleClick}>
          <ListItemText primary="Translate" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {langMap.map(l => (
              <ListItem button className={classes.nested} onClick={() => { setTranslation(l.code) }}>
                <ListItemText primary={l.lang} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <Divider />
        <ListItem button onClick={() => chaTag()}>
          <ListItemText primary="ChaTag &trade;" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => addComment()}>
          <ListItemText primary="Comment" />
        </ListItem>
      </Popover>
    </MuiThemeProvider>
  );
};

export default MessageActions;