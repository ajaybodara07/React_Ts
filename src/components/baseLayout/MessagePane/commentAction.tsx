import React from 'react';
import { DialogContentText, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';

interface IChatTagActions {
	open: any;
	commentClose: any;
}


const ChatTagActions: React.FC<IChatTagActions> = ({ open, commentClose }) => {

	return (
		<div>
			<Dialog open={open} onClose={commentClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Comment</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please enter your comment here. 
          </DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="comment"
						label="Enter comment"
						type="text"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={commentClose} color="primary">
						Cancel
          </Button>
					<Button onClick={commentClose} color="primary">
						Save
          </Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default ChatTagActions;