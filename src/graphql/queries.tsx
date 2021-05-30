import React from 'react';
import gql from 'graphql-tag';

export const getUser = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      registered
      userConversations {
        items {
          id
          name
          status
          conversation {
            id
            name
            createdAt
            associated {
              items {
                convoLinkUserId
                user {
                  id
                  username
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getConversationsList = gql`
  query GetConversationsList($id: ID!) {
    getUser(id: $id) {
      userConversations {
        items {
          name
          id
          conversation {
            id
          }
        }
      }
    }
  }
`;

export const getConvo = gql`
  query GetConvo($id: ID!, $limit: Int, $nextToken: String) {
    getConvo(id: $id) {
      id
      messages(sortDirection: DESC, limit: $limit, nextToken: $nextToken) {
        nextToken
        items {
          id
          content
          createdAt
          owner
          chatbot
          isSent
          file {
            bucket
            region
            key
          }
          messageConversationId
          conversation {
            id
            name
            createdAt
          }
        }
      }
    }
  }
`;

export const searchMessages = gql`
  query SearchMessages(
    $filter: SearchableMessageFilterInput
    $sort: SearchableMessageSortInput
    $limit: Int
    $nextToken: Int
  ) {
    searchMessages(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
        createdAt
        owner
        chatbot
        isSent
        file {
          bucket
          region
          key
        }
        messageConversationId
        conversation {
          id
          name
          createdAt
        }
      }
      nextToken
    }
  }
`;
export const searchUsers = gql`
  query SearchUsers(
    $filter: SearchableUserFilterInput
    $sort: SearchableUserSortInput
    $limit: Int
    $nextToken: Int
  ) {
    searchUsers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        registered
        userConversations {
          items {
            id
            name
            status
            convoLinkUserId
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const searchConvoLinks = gql`
  query SearchConvoLinks(
    $filter: SearchableConvoLinkFilterInput
    $sort: SearchableConvoLinkSortInput
    $limit: Int
    $nextToken: Int
  ) {
    searchConvoLinks(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        status
        convoLinkUserId
        user {
          id
          username
          registered
        }
        conversation {
          id
          name
          createdAt
        }
      }
      nextToken
    }
  }
`;

export const randomUserUuid = gql`
  query RandomUserUuid {
    randomUserUuid
  }
`;
