import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-spinkit';

import { AddToPlaylist, Player, Search } from '../../components';
import { actions as baseModalActions } from './';
import { actions as searchActions } from '../../modules/search';
import s from './styles';

class BaseModal extends Component {
  renderInner(show, playlistModal, searchModal) {
    const { actions } = this.props;
    const onPress = () => {
      actions.hideModal();
      actions.searchClear(null);
    };

    const downButtonProps = {
      onPress: searchModal ? onPress : actions.hideModal,
      style: s.downButton,
      name: 'ios-arrow-down',
      size: 30,
      color: '#fff',
    };

    const AnimatableView = {
      animation: show ? 'fadeInUp' : null,
      duration: 200,
    };

    return (
      <Animatable.View {...AnimatableView} style={s.innerContainer}>
        {playlistModal ? <AddToPlaylist /> : <Search />}
        <Icon {...downButtonProps} />
      </Animatable.View>
    );
  }

  renderLoad() {
    const AnimatableView = {
      animation: 'fadeIn',
      duration: 200,
    };

    return (
      <Animatable.View {...AnimatableView} style={s.loadContainer}>
        <Spinner type="Arc" size={40} color="#FFFFFF" />
        <Text style={s.loading}>Loading</Text>
      </Animatable.View>
    );
  }

  render() {
    const { baseModal } = this.props;
    const { loadModal, playlistModal, searchModal } = baseModal;
    const show = playlistModal || searchModal || loadModal;
    const container = show ? s.showContainer : s.hideContainer;
    const innerContainer = playlistModal ||
      searchModal ? this.renderInner(show, playlistModal, searchModal) : null;
    const load = loadModal ? this.renderLoad() : null;
    return (
      <View style={container}>
        <Player />
        {innerContainer}
        {load}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  baseModal: state.baseModal,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...baseModalActions,
    ...searchActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseModal);
