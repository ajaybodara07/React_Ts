import React, { useState, useEffect } from 'react';
// @ts-ignore
import { Scrollbars } from 'react-custom-scrollbars';
import withRoot from '../../../withRoot';
import InputTextField from './react+typescript_InputTextField';
import { getConvo } from '../../../graphql/queries';

import useStyles from './styles';

let activeConversation = {};
let subscription: any;

const dropPreviousConversation = async ({ updateMessages }: any) => {
  // clear messages array
  updateMessages([]);

  if (subscription)
    try {
      updateMessages([]);
      // unsubscribe from current message subscription
      subscription.unsubscribe();
      return;
    } catch (e) {
      console.log(e);
      return e;
    }
  return;
};

const updateActiveConversation = async ({
  ac,
  client,
  updateMessages
}: any) => {
  if (ac == activeConversation) {
  } else {
    activeConversation = ac;
    // clear, unsubscribe
    await dropPreviousConversation({ updateMessages });
    // fetch chat and start subscription
    const messages = await client.query({
      query: getConvo,
      fetchPolicy: 'network-only',
      variables: {
        id: ac.conversation.id,
        limit: 100
      }
    });
    // console.log(messages);
    if (messages.data.getConvo)
      updateMessages(messages.data.getConvo.messages.items.reverse());
    console.log('start sub');
  }
};

interface ILeftDrawerProps {
  client: any;
  activeConversation: any;
  userId: String;
}

const MessagePane: React.FC<ILeftDrawerProps> = ({ client, activeConversation, userId }) => {
  const classes = useStyles();
  const [botText, updateBotText] = useState('');
  const [dummyMessages, updateMessages]: [Array<any>, any] = useState([]);
  let scrollRef: any = React.createRef();


  useEffect(() => {
    if (activeConversation.id) {
      updateActiveConversation({
        ac: activeConversation,
        client,
        updateMessages
      });
    }
  }, [activeConversation]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollToBottom();
  });

  return (
    <div className={classes.messagePaneRoot}>
      <Scrollbars ref={scrollRef} autoHeight autoHeightMax={'85vh'}>
        {dummyMessages.map((message: any, index: number) => (
          <div></div>
        ))}
      </Scrollbars>

      <InputTextField
        client={client}
        authorId={userId}
        activeConversation={activeConversation}
        dummyMessages={dummyMessages}
        updateMessages={updateMessages}
        botText={botText}
        updateBotText={updateBotText}
      />
    </div>
  );
};

export default withRoot(MessagePane);
