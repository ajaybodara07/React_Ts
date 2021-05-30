import React, { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Chat, Description, SpeakerNotes, Help } from '@material-ui/icons';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import withRoot from '../../../withRoot';

interface INorpacBottomNavigationProps {
	classes: any;
	bottomNav: string;
	setBottomNav: Function;
}

const NorpacBottomNavigation: React.FC<INorpacBottomNavigationProps> = ({ classes, bottomNav, setBottomNav }) => {
	const [ value, setValue ] = React.useState(3);

	return (
		<BottomNavigation
			value={value}
			onChange={(event, newValue) => {
				console.log(newValue);
				// setBottomNav(newValue);
				setValue(newValue);
				newValue === 0 ? setBottomNav('bills') : newValue === 1 ? setBottomNav('chat') : setBottomNav('help');
				// newValue === 0
				// 	? setBottomNav('talking_points')
				// 	: newValue === 1
				// 		? setBottomNav('bills')
				// 		: newValue === 2 ? setBottomNav('chat') : setBottomNav('help');
			}}
			showLabels
			className={classes.root}
		>
			{/* <BottomNavigationAction label="Talking Points" icon={<SpeakerNotes />} /> */}
			<BottomNavigationAction label="Home" icon={<Description />} />
			<BottomNavigationAction label="UN Chat" icon={<Chat />} />
			<BottomNavigationAction label="Help" icon={<Help />} />
		</BottomNavigation>
	);
};

export default withRoot(withStyles(styles)(NorpacBottomNavigation));
