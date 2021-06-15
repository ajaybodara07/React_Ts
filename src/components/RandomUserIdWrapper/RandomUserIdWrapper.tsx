import React, { useEffect, useState } from 'react';
import { randomUserUuid } from '../../graphql/queries';
import { getConvo, getConversationsList } from '../../graphql/queries';
import { createConvo, createConvoLink } from '../../graphql/mutations';

const fetchConversationsList = async (id: String, client: any) => {
  return await client.query({
    query: getConversationsList,
    fetchPolicy: 'network-only',
    variables: {
      id
    }
  });
};

const populateConversationList = async ({
  client,
  // setConvoListAction,
  userId
}: // updateConversationsList,
// setActiveConversation
any) => {
  const data = await fetchConversationsList(userId, client);

  if (!data.data.getUser) {
    // const registerUserData = await client.mutate({
    //   mutation: registerUser,
    //   variables: {
    //     input: {
    //       id: user.id,
    //       registered: true,
    //       username: user.name
    //     }
    //   }
    // });
  }
  const convoList = data.data.getUser.userConversations.items;
  if (convoList.length == 0) {
    // setConvoListAction("Ha! I couldn't find anything");

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
        userId: userId,
        name: 'AWS'
      }
    });

    const botConvoLink = client.mutate({
      mutation: createConvoLink,
      variables: {
        convoId: createConvoResponse.id,
        userId: 'awsBot',
        name: 'AWS'
      }
    });

    const createResponse = await Promise.all([userConvoLink, botConvoLink]);
    // console.log(createResponse);
    // setActiveConversation({
    //   id: createConvoResponse.id,
    //   name: 'NORPAC',
    //   conversation: { id: createConvoResponse.id }
    // });
  }
};

const getRandomUserUuid = async (client: any, updateRandUserIdAws: Function) => {
  const apiData = await client.query({
    query: randomUserUuid,
    fetchPolicy: 'network-only'
  });
  console.log(apiData);

  localStorage.setItem('randUserIdAws', apiData.data.randomUserUuid);
  updateRandUserIdAws(apiData.data.randomUserUuid);
};

interface IRandomUserIdWrapperProps {
  client: any;
  updateRandUserIdAws: Function;
}

const RandomUserIdWrapper: React.FC<IRandomUserIdWrapperProps> = ({
  client,
  updateRandUserIdAws
}) => {
  useEffect(() => {
    if (localStorage.getItem('Aws') === null) {
      getRandomUserUuid(client, updateRandUserIdAws);
    } else {
      updateRandUserIdAws(localStorage.getItem('randUserIdAws'));

      populateConversationList({
        client,
        userId: localStorage.getItem('randUserIdAws')
      });
    }
  }, [client, updateRandUserIdAws]);
  return <></>;
};

export default RandomUserIdWrapper;
