import React from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AuthForm, { actions as authFormActions } from '../auth-form';
import { actions as authActions } from '../../modules/auth';
import s from './styles';

const SignIn = props => {
  const { actions, auth, authForm } = props;
  return (
    <View style={s.container}>
      <Image source={require('../../img/background.jpg')} style={s.backgroundImage} />
      <View style={s.innerContainer}>
        <View style={s.row}>
          <Text style={s.title}>Throwcast</Text>
        </View>
        <View style={s.row}>
          <AuthForm authForm={authForm} {...actions} />
        </View>
        <View style={s.row}>
          <TouchableHighlight
            style={s.button}
            onPress={() => actions.signIn(authForm)}
            disabled={auth.pending}
          >
            <Text style={s.buttonText}>Sign in</Text>
          </TouchableHighlight>
          <Text style={s.signUp} onPress={actions.toSignUp}>Sign Up</Text>
          {auth.message && <Text style={s.notification}>{auth.message}</Text>}
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  authForm: state.authForm,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...authActions, ...authFormActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
