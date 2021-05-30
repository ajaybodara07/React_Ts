import React, { useState, useEffect } from 'react';

import { Scrollbars } from 'react-custom-scrollbars';

import withStyles from '@material-ui/core/styles/withStyles';
import withRoot from '../../withRoot';
import { styles } from './styles';

import MessageBubble from '../baseLayout/MessagePane/react+typescript_MessageBubble';
import InputTextField from './react+typescript_InputTextField';

import { getConversationsList, getConvo } from '../../graphql/queries';
import { createConvo, createConvoLink } from '../../graphql/mutations';
import { Typography } from '@material-ui/core';

const fetchUserConversations = async (id: any, client: any) => {
	let a = await client.query({
		query: getConversationsList,
		fetchPolicy: 'network-only',
		variables: {
			id
		}
	});
	// console.log(a)
	return a;
};

const helpMessages = [
	'Tell me about Biological clock',
	'Tell me about Current taxes on other assets',
	'Tell me about Cesium',
	'Tell me about Current transfers',
	'Tell me about Compaction',
	'Tell me about Epidemiology'
];

const fetchMessages = async (id: any, client: any) => {
	return await client.query({
		query: getConvo,
		fetchPolicy: 'network-only',
		variables: {
			id
		}
	});
};

interface ISimpleChatBotProps {
	classes: any;
	client: any;
	activeConversation: any;
	userId: any;
	setActiveConversation: Function;
}

// const SimpleChatBot: React.FC<ISimpleChatBotProps> = ({
const SimpleChatBot: React.FC<ISimpleChatBotProps> = ({
	classes,
	client,
	userId,
	activeConversation,
	setActiveConversation
}) => {
	const localUserId = localStorage.getItem('randUserIdAws') ? localStorage.getItem('randUserIdAws') : 'abc';

	var activeConversationDummy;
	const [ botText, updateBotText ] = useState('');
	const [ convoid, updateid ] = useState('');
	const [ name, updatename ] = useState('');
	const [autoSend, setAutoSend] = useState(false);

	const [ dummyMessages, updateMessages ]: [Array<any>, any] = useState([]);

	let scrollRef: any = React.createRef();

	useEffect(
		() => {
			if (scrollRef.current) scrollRef.current.scrollToBottom();
		},
		[ dummyMessages ]
	);

	useEffect(() => {
		if (scrollRef.current) scrollRef.current.scrollToBottom();
		// console.log()
		async function fetchData() {
			let data = await fetchUserConversations(localUserId, client);
			let messages = [];
			let id = '';

			if (
				data.data.getUser !== null &&
				typeof data.data.getUser.userConversations.items !== 'undefined' &&
				data.data.getUser.userConversations.items.length > 0
			) {
				id = data.data.getUser.userConversations.items[0].conversation.id;
				let m = await fetchMessages(id, client);
				setActiveConversation(data.data.getUser.userConversations.items[0]);
				messages = m.data.getConvo.messages.items.reverse();
			} else {
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
						userId: localUserId,
						name: 'norpac-bot'
					}
				});

				const createResponse = await Promise.all([ userConvoLink ]);
				setActiveConversation({
					id: createConvoResponse.id,
					name: 'NORPAC',
					conversation: { id: createConvoResponse.id }
				});
				id = createConvoResponse.id;
			}

			updateid(id);
			updatename(`norpac-user-${localUserId}`);
			updateMessages(messages);
		}
		fetchData();
	}, []);

	const autoMessage = (messageData: any) => {
		setAutoSend(true);
		updateBotText(`Tell me about ${messageData.replace("Amazon", "")}`);
	}

	console.log(dummyMessages);

	return (
		<div className={classes.messagePaneRoot}>
			{dummyMessages.length == 0 ? (
				<div
					style={{
						display: 'flex',
						width: '90%',
						flexDirection: 'column',
						justifyContent: 'center',
						margin: '5%',
						marginBottom: 10,
						padding: 30,
						border: '2px solid #ebebeb',
						borderRadius: 7,
						backgroundColor: '#fff'
					}}
				>
					{/* <img src="norpac_mission.png" style={{ height: 'auto', width: '100%', marginBottom: '20px' }} /> */}
					<Typography variant="subtitle2" style={{ marginBottom: 15 }}>
						A sampling of the questions you can ask:
					</Typography>
					{helpMessages.map((msg) => <Typography style={{ textAlign: 'left' }}>• {msg}</Typography>)}
				</div>
			) : (
				<Scrollbars ref={scrollRef} autoHeight autoHeightMax={'80vh'}>
					<div style={{ height: 40 }} />
					<div
						style={{
							display: 'flex',
							width: '90%',
							flexDirection: 'column',
							justifyContent: 'center',
							margin: '5%',
							marginBottom: 10,
							padding: 30,
							border: '2px solid #ebebeb',
							borderRadius: 7,
							backgroundColor: '#fff'
						}}
					>
						{/* <img src="norpac_mission.png" style={{ height: 'auto', width: '100%', marginBottom: '20px' }} /> */}
						<Typography variant="subtitle2" style={{ marginBottom: 15 }}>
							A sampling of the questions you can ask:
						</Typography>
						{helpMessages.map((msg) => <Typography style={{ textAlign: 'left' }}>• {msg}</Typography>)}
					</div>
					{dummyMessages.map((message: any, index: number) => (
						<MessageBubble authorId={userId} key={index} message={message} botText={botText} autoMsg={autoMessage}/>
					))}
				</Scrollbars>
			)}

			<InputTextField
				client={client}
				authorId={userId}
				activeConversation={activeConversation}
				dummyMessages={dummyMessages}
				updateMessages={updateMessages}
				botText={botText}
				updateBotText={updateBotText}
				autoSend={autoSend}
			/>
		</div>
	);
};

export default withRoot(withStyles(styles)(SimpleChatBot));
