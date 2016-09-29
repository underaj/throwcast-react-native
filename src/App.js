import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Scene, Router, Actions, Modal } from 'react-native-router-flux';
import store from 'react-native-simple-store';

import reducers from './reducers';
import { SignIn, SignUp } from './components';
import { BaseModal, Homepage, PlayerRemote, Queue, Profile } from './containers';
import { actions as authActions } from './modules/auth';

const reduxStore = createStore(reducers, applyMiddleware(thunk));

class App extends Component {
  componentWillMount() {
    StatusBar.setHidden(true, 'none');
    reduxStore.dispatch(authActions.authPending());
    store.get('@Auth:token').then(token => {
      if (token) {
        reduxStore.dispatch(authActions.authCheck(token));
      } else {
        reduxStore.dispatch(authActions.authFailure(null));
      }

      Actions.baseModal();
    });
  }

  render() {
    return (
      <Provider store={reduxStore}>
        <Router>
          <Scene key="modal" component={Modal} >
            <Scene key="root" hideNavBar>
              <Scene key="signIn" component={SignIn} type="reset" />
              <Scene key="signUp" component={SignUp} direction="vertical" />
              <Scene key="main" tabs type="reset">
                <Scene key="homepage" component={Homepage} hideNavBar initial />
                <Scene key="profilepage" component={Profile} hideNavBar />
              </Scene>
              <Scene key="queue" component={Queue} />
              <Scene key="playerRemote" component={PlayerRemote} />
            </Scene>
            <Scene key="baseModal" component={BaseModal} />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

export default App;
