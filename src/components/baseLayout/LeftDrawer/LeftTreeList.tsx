import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Collapse, ListItemAvatar, Avatar, makeStyles, Divider } from '@material-ui/core';
import { ExpandLess, ExpandMore, GroupWork, Person, Chat, Description, KeyboardVoice } from '@material-ui/icons';
import { talkingPoints, bills } from './Bills';
import { getConversationsList } from '../../../graphql/queries';
import { createConvo, createConvoLink, registerUser } from '../../../graphql/mutations';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	},
	nested: {
		paddingLeft: theme.spacing(3)
	}
}));

const fetchConversationsList = async (id: String, client: any) => {
	return await client.query({
		query: getConversationsList,
		fetchPolicy: 'network-only',
		variables: {
			id
		}
	});
};

const populateConversationList = async ({
	client,
	setConvoListAction,
	user,
	updateConversationsList,
	setActiveConversation
}: any) => {
	const data = await fetchConversationsList(user.id, client);
	if (!data.data.getUser) {
		const registerUserData = await client.mutate({
			mutation: registerUser,
			variables: {
				input: {
					id: user.id,
					registered: true,
					username: user.name
				}
			}
		});
	}
	const convoList = data.data.getUser.userConversations.items;
	updateConversationsList(convoList);
	if (convoList.length == 0) {
		setConvoListAction("Ha! I couldn't find anything");

		const data: any = await client.mutate({
			mutation: createConvo,
			variables: {
				input: { name: 'direct' }
			}
		});
		const createConvoResponse = data.data.createConvo;
		const userConvoLink = client.mutate({
			mutation: createConvoLink,
			variables: {
				convoId: createConvoResponse.id,
				userId: user.id,
				name: 'NORPAC'
			}
		});

		const botConvoLink = client.mutate({
			mutation: createConvoLink,
			variables: {
				convoId: createConvoResponse.id,
				userId: 'norpacBot',
				name: 'NORPAC'
			}
		});

		const createResponse = await Promise.all([userConvoLink, botConvoLink]);
		// console.log(createResponse);
		setActiveConversation({
			id: createConvoResponse.id,
			name: 'NORPAC',
			conversation: { id: createConvoResponse.id }
		});
	} else {
		setActiveConversation(convoList[0]);
	}
};

interface ILeftDrawerProps {
	open: boolean;
	selected: Function;
	client: any;
	user: any;
	setActiveConversation: any;
}

const LeftTreeList: React.FC<ILeftDrawerProps> = ({ open, selected, client, user, setActiveConversation }) => {
	// hook to manage tree open/close
	const classes = useStyles();
	const [peopleOpen, togglePeopleOpen] = useState(false);
	const [channelsOpen, toggleChannelsOpen] = useState(true);
	const [chatListOpen, toggleChatListOpen] = useState(false);
	const [conversationsList, updateConversationsList]: any = useState([]);
	const [convoListAction, setConvoListAction] = useState('loading...');

	// componentDidMount for hooks
	useEffect(
		() => {
			if (user.id) {
				console.log(user.id);
				populateConversationList({
					client,
					setConvoListAction,
					user,
					updateConversationsList,
					setActiveConversation
				});
			} else console.log('no id');
		},
		[user]
	);

	return (
		<List component="nav" className={classes.root}>
			{/* conversations left menu item */}
			{/* <ListItem button onClick={() => toggleChatListOpen(!chatListOpen)}>
        <ListItemIcon>
          <Chat />
        </ListItemIcon>
        <ListItemText inset primary="Conversations" />
        {chatListOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open && chatListOpen} timeout="auto" unmountOnExit>
        <List disablePadding dense>
          {conversationsList.length == 0 ? (
            <Typography key={'noConvo'} align="center">
              {convoListAction}
            </Typography>
          ) : (
            conversationsList.map((conversation: any) => (
              <ListItem
                button
                className={classes.nested}
                onClick={() => {
                  setActiveConversation(conversation);
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={conversation.name} />
              </ListItem>
            ))
          )}
        </List>
      </Collapse> */}
			{/* conversations left menu item */}

			{/* list of talking points */}
			<ListItem button onClick={() => togglePeopleOpen(!peopleOpen)}>
				<ListItemIcon>
					<KeyboardVoice />
				</ListItemIcon>
				<ListItemText inset primary="Talking Points" />
				{peopleOpen ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={open && peopleOpen} timeout="auto" unmountOnExit>
				<List disablePadding dense>
					{Object.keys(talkingPoints).map((point) => (
						<ListItem button className={classes.nested} onClick={() => selected(talkingPoints[point])}>
							<ListItemAvatar>
								<Avatar>
									<Person />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary={point} />
						</ListItem>
					))}
				</List>
			</Collapse>

			{/* list of bills */}
			<ListItem button onClick={() => toggleChannelsOpen(!channelsOpen)}>
				<ListItemIcon>
					<Description />
				</ListItemIcon>
				<ListItemText inset primary="Bills" />
				{channelsOpen ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={open && channelsOpen} timeout="auto" unmountOnExit>
				<List disablePadding dense>
					{Object.keys(bills).map((bill) => (
						<ListItem button className={classes.nested} onClick={() => selected(bills[bill])}>
							<ListItemAvatar>
								<Avatar>
									<GroupWork />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary={bill} />
						</ListItem>
					))}
				</List>
			</Collapse>
			<Divider />
			<ListItem button>
				<ListItemIcon>
					<Chat />
				</ListItemIcon>
				<ListItemText inset primary="AWS Glossary Chat" />
			</ListItem>
			{/* <ListItem
        button
        onClick={() => {
          Auth.signOut();
        }}
      >
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText inset primary="Logout" />
      </ListItem> */}
		</List>
	);
};

export default LeftTreeList;
