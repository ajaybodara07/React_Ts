import React from 'react';
import { Typography, Avatar } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import uuid from 'uuid/v4';
import axios from 'axios';
import { Auth } from 'aws-amplify';
import MessageActions from './react+typescript_MessageActions';
import ChatTagAction from './react+typescript_chatTagAction';
import CommentAction from './commentAction';
import Dictate from '../../AI/Dictate';
import DetectSentiment from '../../AI/DetectSentiment';
import DetectEntities from '../../AI/DetectEntities';
import TranslateCard from '../../AI/TranslateCard';
import awsConfig from '../../../aws-exports';
import useStyles from './styles';

const VISIBILITY = 'protected';

interface IMessageBubbleProps {
	message: {
		owner: String;
		content: String;
		createdAt: string;
		id: any;
		chatbot: boolean;
		isSent: boolean;
		messageConversationId: String;
	};
	authorId: String;
	autoMsg: any;
	botText: any;
}

const chatTagData = [
	{ numberData: 1, mainData: "Lowest" },
	{ numberData: 2, mainData: "Significantly Below Average" },
	{ numberData: 3, mainData: "Clearly Below Average " },
	{ numberData: 4, mainData: "Below Average" }
];

const MessageBubble: React.FC<IMessageBubbleProps> = ({ message, authorId, autoMsg, botText }) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [ViewMore, setViewMore] = React.useState(false);
	const [ViewLess, setViewLess] = React.useState(false);
	const [actionOpen, setActionOpen] = React.useState(false);
	const [mic, setMic] = React.useState(false);
	const [chatOpen, setChatOpen] = React.useState(false);
	const [commentOpen, setCommentOpen] = React.useState(false);
	const [selectedLanguage, setSelectedLanguage] = React.useState(null);
	const [keyPath, setKeyPath] = React.useState('en');
	const [dictate, setDictate] = React.useState(false);
	const [bucket, setBucket] = React.useState(awsConfig.aws_user_files_s3_bucket);
	const [sentiment, setSentiment] = React.useState(false);
	const [voice, setVoice] = React.useState('');
	const [toDictate, setToDictate] = React.useState(null);
	const [messageData, setmessageData] = React.useState(message.content);

	const open = Boolean(anchorEl);
	var options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
	let abc = message.createdAt;

	let date = abc != 'sending...' ? new Date(abc).toLocaleString('en-US', options) : abc;

	const viewMore = () => {
		setViewMore(true);
	}

	const viewLess = () => {
		setViewMore(false);
		setViewLess(true);
	}

	const closeActionMenu = () => {
		setActionOpen(false)
	}

	const callDictate = () => {
		doDictate(message.content, true);
		setActionOpen(false)
	};

	const dictateTranslated = () => {
		doDictate(messageData, false);
	};

	const doDictate = async (messageTape: any, original: Boolean) => {
		const { identityId } = await Auth.currentCredentials();
		const key = `${VISIBILITY}/${identityId}/${uuid()}`;
		let voice = 'Russell';
		if (selectedLanguage === "ar") {
			voice = "Zeina";
		} else if (selectedLanguage === "zh") {
			voice = "Zhiyu";
		}
		setKeyPath(key);
		setVoice(voice);
		setToDictate(messageTape);
		setDictate(true);
	};

	const finishedDictating = () => {
		setDictate(false);
	};

	const setTranslation = (code: any) => {
		if (code === "he") {
			setMic(true);
		} else {
			setMic(false);
		}
		setSelectedLanguage(code);
		setActionOpen(false);
	}

	const openMessageAction = (event: any) => {
		setActionOpen(true);
		setAnchorEl(event.currentTarget)
	}

	const comprehend = () => {
		setSentiment(true);
		setActionOpen(false);
	};

	const closeTranslateCard = () => {
		setSelectedLanguage(null);
		setDictate(false);
	};

	const applyState = (state: any) => {
		setmessageData(state.translated);
	};

	const openDesc = (resp: any) => {
		autoMsg(resp);
	}

	const chaTag = () => {
		setActionOpen(false);
		setChatOpen(true);
	}

	const closeChatTag = () => {
		setChatOpen(false);
	}

	const addComment = () => {
		setActionOpen(false);
		setCommentOpen(true);
	}

	const closeComment = () => {
		setCommentOpen(false);
	}

	/*
	[Param]: (data: any)
	This function is used to save data in chatTag dynamo table 
	*/
	const saveChatTag = async (data: any) => {
		let slugData: any = localStorage.getItem('slugTerm');
		let SustainabilityData = "Unranked";
		let HumanData = "Unevaluated";
		let PublicData = "Unevaluated";
		let sludDetail = slugData.length > 0 ? slugData.split("about")[1].trim().replace(" ", "-").toLowerCase() : 'aws';
		let ranking = data.ranking === 100 ? parseInt(('' + data.ranking)[0]) + 9 : parseInt(('' + data.ranking)[0]);
		let stability = data.stability === 100 ? parseInt(('' + data.stability)[0]) + 9 : parseInt(('' + data.stability)[0]);
		let value = data.value === 100 ? parseInt(('' + data.value)[0]) + 9 : parseInt(('' + data.value)[0]);
		chatTagData.map((data) => {
			if (ranking === data.numberData) {
				SustainabilityData = data.mainData;
			} if (stability === data.numberData) {
				HumanData = data.mainData;
			} if (value === data.numberData) {
				PublicData = data.mainData;
			}
		})


		axios.post('https://XXXXXXXX.execute-api.XX-XXXX-X.amazonaws.com/v1/', {
			"siteId": "XXX.glossary.bot",
			"slugId": `${sludDetail}#${localStorage.getItem('randUserIdAws')}`,
			"ranking": SustainabilityData,
			"stability": HumanData,
			"value": PublicData,
			"total": (ranking + stability + value)
		})
			.then(function (response) {
				setChatOpen(false);
				alert("Add chatTag successfully");
			})
			.catch(function (error) {
				console.log("error: ", error);
			});
	}

	return !message.chatbot ? (
		<div key={message.id} className={classes.messageBubbleContainer}>
			<div className={classes.botText} style={{ marginLeft: 'auto' }}>
				<Typography variant="body1" gutterBottom color="inherit" style={{ fontSize: '15px' }}>
					{message.content}
				</Typography>
				<div className={classes.timestamp}>
					<div />
					<Typography
						variant="caption"
						gutterBottom
						color="inherit"
						style={{ color: 'grey', fontSize: '10px' }}
					>
						{date}
					</Typography>
				</div>
			</div>
		</div>
	) : (
			<div key={message.id} className={classes.messageBubbleContainer}>
				<div>
					<div style={{ display: 'flex', maxWidth: '100%' }}>
						<Avatar src="UN_logo.png" style={{ height: '30px', width: '30px', marginRight: '5px', marginTop: '5px' }} />
						<div className={classes.userText}>
							<div style={{ display: 'flex' }}>
								<Typography
									variant="body1"
									gutterBottom
									color="inherit"
									style={{ fontSize: '15px' }}
								>
									{ViewMore ? <div>{
										message.content.includes(":-") ?
											message.content.split(":-")[1].split(",").map((resp, index) => (
												<div>
													{index === 0 && message.content.split(":")[0] + `: `}
													<a key={index} href="#" style={{ color: "blue" }} onClick={() => openDesc(resp)}>{`${resp}, `}</a>
												</div>
											)) : <div><b>{message.content.split(":")[0]}</b>{`:- ${message.content.split(":")[1]}`}</div>
									}<a href="#" style={{ color: "#3eb2a1" }} onClick={viewLess}>view less</a></div>
										: message.content.length > 75 ?
											ViewLess ? <div>{message.content.substring(0, 75) + `... `}<a href="#" style={{ color: "#3eb2a1" }} onClick={viewMore}>view more</a></div> :
												<div><b>{message.content.substring(0, 75) + `... `}</b><a href="#" style={{ color: "#3eb2a1" }} onClick={viewMore}>view more</a></div>
											: <div><b>{message.content.split(":")[0]}</b>{`:- ${message.content.split(":")[1]}`}</div>}
								</Typography>
								<ArrowDropDown
									aria-owns={'message-actions'}
									aria-haspopup="true"
									onClick={(event) => openMessageAction(event)}
								/>
								<MessageActions actionOpen={actionOpen} callSetAction={() => closeActionMenu()} callDictate={() => callDictate()}
									setTranslation={setTranslation} comprehend={() => comprehend()} anchorEl={anchorEl} chaTag={() => chaTag()}
									addComment={() => addComment()} />
							</div>
							{dictate && (
								<Dictate
									bucket={bucket}
									path={keyPath}
									voice={voice}
									text={toDictate}
									completed={finishedDictating}
								/>
							)}
							{sentiment && (
								<div>
									<div className="text-dark">
										<hr />
									</div>
									<span>
										<small>Sentiment Analysis:</small>
									</span>{' '}
									<small>
										<button
											type="button"
											className="close text-right"
											aria-label="Close"
											onClick={() => setSentiment(false)}
										>
											<span aria-hidden="true">&times;</span>
										</button>
									</small>
									<br />
									<DetectSentiment
										language='en'
										text={message.content}
									/>
									<DetectEntities
										language='en'
										text={message.content}
									/>
								</div>
							)}
							{selectedLanguage && (
								<TranslateCard
									closeTranslateCard={closeTranslateCard}
									dictateTranslated={dictateTranslated}
									selectedLanguage={selectedLanguage}
									applyState={applyState}
									text={messageData}
									mic={mic}
								/>
							)}
							<div className={classes.timestamp}>
								<Typography
									variant="caption"
									gutterBottom
									color="inherit"
									style={{ color: '#5f5f5f', fontSize: '10px', marginTop: '10px' }}
								>
									{date}
								</Typography>
							</div>
						</div>
						<ChatTagAction open={chatOpen} saveChatTag={saveChatTag} chatClose={() => closeChatTag()} />
						<CommentAction open={commentOpen} commentClose={() => closeComment()} />
					</div>
				</div>
			</div>
		);
};

export default MessageBubble;