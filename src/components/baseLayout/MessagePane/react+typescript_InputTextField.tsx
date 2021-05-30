import React from 'react';
import { TextField } from '@material-ui/core';
import invokeBot from '../../../graphql/AI/invokeBot';
import { createMessage } from '../../../graphql/mutations';
// import uuid from 'uuid/v4';

interface IInputTextFieldProps {
	botText: string;
	updateBotText: Function;
	dummyMessages: Array<any>;
	client: any;
	updateMessages: Function;
	authorId: String;
	activeConversation: any;
}

const InputTextField: React.FC<IInputTextFieldProps> = ({
	botText,
	updateBotText,
	dummyMessages,
	client,
	updateMessages,
	authorId,
	activeConversation
}) => {
	const sendMessageToBot = async (data: any) => {
		if (data.keyCode == 13) {
			if (botText.trim().length === 0) {
				return;
			}
			updateMessages([
				...dummyMessages,
				{
					content: botText,
					owner: authorId,
					createdAt: 'sending...'
				}
			]);
			console.log(activeConversation);
			const userMutation = client.mutate({
				mutation: createMessage,
				variables: {
					input: {
						content: botText,
						owner: authorId,
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
					text: botText
				}
			});

			const botMutation = client.mutate({
				mutation: createMessage,
				variables: {
					input: {
						// id: uuid(),
						content: JSON.parse(response.data.invokeBot.response),
						owner: authorId,
						chatbot: true,
						isSent: true,
						messageConversationId: activeConversation.conversation.id
						// createdAt: Date.now()
					}
				}
			});
			const mutationResponse = await Promise.all([ userMutation, botMutation ]);
			console.log(mutationResponse);
			updateMessages([
				...dummyMessages,
				mutationResponse[0].data.createMessage,
				mutationResponse[1].data.createMessage
			]);
			return;
		} else return;
	};
	return (
		<div className="entry">
			<div className="px-3 py-2 bg-light">
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
			</div>
		</div>
	);
};

export default InputTextField;
