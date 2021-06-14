import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import { Send, ExpandMore } from '@material-ui/icons';
import invokeBot from '../../graphql/AI/invokeBot';
import { createMessage, createLexChatErrors } from '../../graphql/mutations';
import uuid from 'uuid/v4';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
interface IInputTextFieldProps {
	botText: string;
	updateBotText: Function;
	dummyMessages: Array<any>;
	client: any;
	updateMessages: Function;
	authorId: String;
	activeConversation: any;
	autoSend: any;
}

const promptButtons = [
	'Tell me about Biological clock',
	'Tell me about Current taxes on other assets',
	'Tell me about Cesium',
	'Tell me about Current transfers',
	'Tell me about Compaction',
	'Tell me about Epidemiology'
];

const InputTextField: React.FC<IInputTextFieldProps> = ({
	botText,
	updateBotText,
	dummyMessages,
	client,
	updateMessages,
	authorId,
	activeConversation,
	autoSend
}) => {
	const [open, setOpen] = React.useState(false);

	const sendMessageToBot = async (data: any) => {
		localStorage.setItem('slugTerm', botText);
		if (data.sendToBot || data.keyCode == 13) {
			if (botText.trim().length === 0) {
				return;
			}
			updateMessages([
				...dummyMessages,
				{
					content: botText,
					owner: 'enter-user',
					createdAt: 'sending...'
				}
			]);
			console.log(activeConversation);
			try {
				if (activeConversation.conversation.id !== null) {
					const userMutation = client.mutate({
						mutation: createMessage,
						variables: {
							input: {
								content: botText,
								owner: 'enter-user',
								chatbot: false,
								isSent: true,
								messageConversationId: activeConversation.conversation.id
							}
						}
					});
					updateBotText('');
					const response = await client.query({
						query: invokeBot,
						fetchPolicy: 'network-only',
						variables: {
							bot: 'enter your bot name',
							text: data.auto ? `auto${botText}` : botText
						}
					});

					const botMutation = client.mutate({
						mutation: createMessage,
						variables: {
							input: {
								content: JSON.parse(response.data.invokeBot.response),
								owner: authorId,
								chatbot: true,
								isSent: true,
								messageConversationId: activeConversation.conversation.id
							}
						}
					});
					const mutationResponse = await Promise.all([userMutation, botMutation]);
					console.log(mutationResponse);
					updateMessages([
						...dummyMessages,
						mutationResponse[0].data.createMessage,
						mutationResponse[1].data.createMessage
					]);
					return;
				}
			} catch (e) {
				client.mutate({
					mutation: createLexChatErrors,
					variables: {
						input: {
							id: uuid(),
							botName: "enter your bot name",
							content: JSON.stringify(e),
							owner: 'enter-user',
							messageConversationId: " "
						}
					}
				});
				updateMessages([
					...dummyMessages,
					{ createdAt: new Date(), content: "Sorry, I'm unable to answer that. Please try a different question" }
				]);
			}
		} else return;
	};

	if (autoSend) {
		localStorage.setItem('slugTerm', autoSend);
		sendMessageToBot({ sendToBot: true, auto: true });
	}

	return (
		<div className="">
			<div className="px-3 py-2 bg-light">
				<div
					style={{
						display: 'flex',
						width: '100%',
						alignSelf: 'center',
						justifyContent: 'center'
					}}
				>
					<div
						style={{
							textAlign: 'right',
							color: 'rgba(0, 0, 0, 0.54)',
							fontSize: '13px',
							flex: 4,
							lineHeight: '27px'
						}}
					>
						<Typography>
							<span
								style={{
									display: 'block',
									fontSize: '16px',
									color: 'rgba(255, 152, 0, 1)',
									lineHeight: '29px',
									fontStyle: 'italic'
								}}
							>
								{' '}
								Conversation Starters
							</span>
						</Typography>
					</div>
					<ExpandMore
						style={{
							flex: 1,
							cursor: 'pointer',
							fontSize: '30px',
							color: '#ff9800'
						}}
						onClick={() => {
							setOpen(!open);
						}}
					/>
					<Menu
						open={open}
						onClose={() => {
							setOpen(false);
						}}
						style={{ marginLeft: '40%' }}
					>
						{promptButtons.map((button) => (
							<MenuItem
								onClick={() => {
									updateBotText(button);
									setOpen(false);
								}}
							>
								{button}
							</MenuItem>
						))}
					</Menu>
				</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<TextField
						id="outlined-full-width"
						label="Message"
						style={{
							height: 50,
							margin: 10,
							width: '95%'
						}}
						placeholder="Your message here..."
						variant="outlined"
						value={botText}
						onChange={(event) => updateBotText(event.target.value)}
						onKeyDown={sendMessageToBot}
						InputLabelProps={{
							shrink: true
						}}
					/>
					<Send
						onClick={() => {
							sendMessageToBot({ sendToBot: true });
						}}
						style={{ position: 'absolute', right: 30, color: '#3f50b5' }}
					/>
				</div>
			</div>
			<div style={{ position: 'relative', width: '80%' }}>{/* <Drawer */}</div>
		</div>
	);
};

export default InputTextField;
