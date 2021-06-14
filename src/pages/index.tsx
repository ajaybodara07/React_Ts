import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

import Amplify, { Auth } from 'aws-amplify';
// @ts-ignore
// import { withAuthenticator } from 'aws-amplify-react';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';

import withRoot from '../withRoot';
import { Dashboard } from '../components/baseLayout/Dashboard';
import awsmobile from '../aws-exports';

Amplify.configure(awsmobile);

/*
This AWSAppSyncClient() funcation will set the credential of AWS appsync
*/
const client = new AWSAppSyncClient({
  url: awsmobile.aws_appsync_graphqlEndpoint,
  region: awsmobile.aws_appsync_region,
  auth: {
    // @ts-ignore
    type: awsmobile.aws_appsync_authenticationType,
    apiKey: awsmobile.aws_appsync_apiKey
  },
  complexObjectsCredentials: () => Auth.currentCredentials()
});

const styles = (theme: Theme) =>
  createStyles({
    root: {
      // textAlign: 'center',
      paddingTop: theme.spacing(20)
    }
  });

type State = {
  session: any;
};

const events = [{}];

class Index extends React.Component<WithStyles<typeof styles>, State> {
  state = { session: null };

  render() {
    return (
      <ApolloProvider client={client}>
        <Rehydrated>
          <Dashboard />
        </Rehydrated>
      </ApolloProvider>
    );
  }
}

export default withRoot(withStyles(styles)(Index));
