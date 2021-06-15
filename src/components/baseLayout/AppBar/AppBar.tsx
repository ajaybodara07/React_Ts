import React from 'react';
import classNames from 'classnames';
import withRoot from '../../../withRoot';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Avatar } from '@material-ui/core';

interface IAppBarProps {
	classes: any;
	leftDrawer: { leftDrawerOpen: Boolean; setLeftDrawerOpen: Function };
	rightDrawer: { rightDrawerOpen: Boolean; setRightDrawerOpen: Function };
}

const PrimaryAppBar: React.FC<IAppBarProps> = (props) => {
	const {
		classes,
		leftDrawer: { leftDrawerOpen, setLeftDrawerOpen },
		rightDrawer: { rightDrawerOpen, setRightDrawerOpen }
	} = props;
	return (
		<AppBar position="fixed" className={classNames(classes.appBar, leftDrawerOpen && classes.appBarShift)}>
			<Toolbar disableGutters={!leftDrawerOpen} className={classes.toolbar}>
				<Avatar src="UN_logo.png" style={{ display: 'inline-block', marginLeft: '10px' }} />
				<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
					UN Glossary Chat
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default withRoot(PrimaryAppBar);
