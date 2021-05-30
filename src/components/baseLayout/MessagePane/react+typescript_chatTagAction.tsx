import React, { useState } from 'react';
import { makeStyles, Button, Dialog, DialogActions, DialogContent, DialogTitle, createMuiTheme, MuiThemeProvider, Slider, Typography } from '@material-ui/core';

interface IChatTagActions {
	open: any;
	chatClose: any;
	saveChatTag: any;
}

const useStyles = makeStyles(theme => ({
	margin: {
		height: theme.spacing(3),
	},
}));

const theme = createMuiTheme({
	overrides: {
		MuiDialog: {
			paperWidthSm: {
				width: '90%',
				overflow: 'hidden'
			},
		},
		MuiDialogContent: {
			root: {
				overflow: 'hidden'
			}
		},
		MuiSlider: {
			marked: {
				'& input + span ': {
					height: '13px',
					marginTop: '-5px',
					backgroundColor: "#3880ff"
				},
				'& input + span': {
					height: '13px',
					marginTop: '-5px',
					backgroundColor: "#bfbfbf"
				}
			},
			markActive: {
				backgroundColor: "#3880ff"
			},
			mark: {
				backgroundColor: "#bfbfbf"
			},
			thumb: {
				height: "25px",
				width: "25px",
				backgroundColor: "#fff",
				marginLeft: "-12px",
				marginTop: "-12px",
				boxShadow: "0 3px 1px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.02)"
			},
			valueLabel: {
				marginLeft: 12
			},
			track: {
				backgroundColor: "#3880ff"
			}
		}
	}
});

const marks = [
	{
		value: 0,
		label: '0',
	},
	{
		value: 10
	},
	{
		value: 20
	},
	{
		value: 30
	},
	{
		value: 40
	},
	{
		value: 50
	},
	{
		value: 60
	},
	{
		value: 70
	},
	{
		value: 80
	},
	{
		value: 90
	},
	{
		value:100,
		label: '10',
	},
];

function valuetext(value: any) {
	return `${value}`;
}

const ChatTagActions: React.FC<IChatTagActions> = ({ open, chatClose, saveChatTag }) => {
	const classes = useStyles();
	const [sliderVal1, setSliderVal1] = useState(0);
	const [sliderVal2, setSliderVal2] = useState(0);
	const [sliderVal3, setSliderVal3] = useState(0);

	const handleChange1 = (event: any, value: any) => {
		setSliderVal1(value);
	};

	const handleChange2 = (event: any, value: any) => {
		setSliderVal2(value);
	};

	const handleChange3 = (event: any, value: any) => {
		setSliderVal3(value);
	};

	const saveChatTageData = () => {
		saveChatTag({ ranking: sliderVal1 , stability: sliderVal2, value: sliderVal3 });
	}

	function valueLabelFormat(value : any) {
		return marks.findIndex(mark => mark.value === value);
	  }

	return (
		<MuiThemeProvider theme={theme}>
			<Dialog
				open={open}
				onClose={() => chatClose()}
				aria-labelledby="form-dialog-title"
				style={{ minWidth: '300px' }}
			>
				<DialogTitle id="form-dialog-title">Chat Tag</DialogTitle>
				<DialogContent>
					<div style={{ marginBottom: 10 }}></div>
					<Typography id="discrete-slider" gutterBottom>
					Sustainability
          			</Typography>
					<Slider
						value={sliderVal1}
						getAriaValueText={valuetext}
						valueLabelFormat={valueLabelFormat}
						aria-labelledby="discrete-slider"
						valueLabelDisplay="on"
						step={null}
						marks={marks}
						// min={10}
						// max={100}
						onChange={handleChange1}
					/>
					<div className={classes.margin} />
					<Typography id="discrete-slider" gutterBottom>
					Human Rights
                    </Typography>
					<Slider
						value={sliderVal2}
						getAriaValueText={valuetext}
						valueLabelFormat={valueLabelFormat}
						aria-labelledby="discrete-slider"
						valueLabelDisplay="on"
						step={null}
						marks={marks}
						// min={10}
						// max={100}
						onChange={handleChange2}
					/>
					<div className={classes.margin} />
					<Typography id="discrete-slider" gutterBottom>
					Public Awareness
                    </Typography>
					<Slider
						value={sliderVal3}
						getAriaValueText={valuetext}
						valueLabelFormat={valueLabelFormat}
						aria-labelledby="discrete-slider"
						valueLabelDisplay="on"
						step={null}
						marks={marks}
						// min={10}
						// max={100}
						onChange={handleChange3}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => chatClose()} color="primary">
						Cancel
          	</Button>
					<Button onClick={() => saveChatTageData()} color="primary">
						save changes
          </Button>
				</DialogActions>
			</Dialog>
		</MuiThemeProvider>
	);
};

export default ChatTagActions;