import React from 'react';

// @ts-ignore
import { ChatBot, AmplifyTheme } from 'aws-amplify-react';
import withStyles from '@material-ui/core/styles/withStyles';

import withRoot from '../../withRoot';
import { styles } from './styles';

const myTheme = {
	...AmplifyTheme,
	sectionHeader: {
		...AmplifyTheme.sectionHeader,
		backgroundColor: '#ff6600'
	}
};

interface IAmplifyChatbotProps {
	classes: any;
}

const AmplifyChatbot: React.FC<IAmplifyChatbotProps> = () => {
	return (
		<ChatBot
			title="My Bot"
			theme={myTheme}
			botName="enter you bot name"
			welcomeMessage="what is hr1561"
			onComplete={(err: any, confirmation: any) => {
				if (err) {
					alert('Bot conversation failed');
					return;
				}

				alert('Success: ' + JSON.stringify(confirmation, null, 2));
				return 'Trip booked. Thank you! what would you like to do next?';
			}}
			clearOnComplete={true}
			conversationModeOn={false}
		/>
	);
};

export default withRoot(withStyles(styles)(AmplifyChatbot));
