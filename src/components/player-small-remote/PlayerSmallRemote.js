import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from 'react-native-slider';
import * as Animatable from 'react-native-animatable';

import { actions as playerActions } from '../../modules/player';
import s from './styles';

class PlayerSmallRemote extends Component {
  slideChange(value) {
    this.props.actions.setCurrentTime(Math.round(value * this.props.playerRemote.duration));
  }

  slideComplete() {
    this.props.playerRemote.audio.seek(this.props.playerRemote.currentTime);
    this.props.actions.togglePlay();
  }

  render() {
    const { player, playerRemote, actions } = this.props;
    const { togglePlay, nextPodcast, previousPodcast } = actions;
    const index = player.currentIndex;
    const podcast = player.podcastList[index];
    const prevButton = {
      onPress: index > 0 ? previousPodcast : null,
      style: s.rewind,
      name: 'ios-rewind',
      size: 25,
      color: index > 0 ? '#fff' : '#333',
    };

    const hasPodcast = podcast.enclosure.url !== 'http://';
    const toggleButton = {
      onPress: hasPodcast ? togglePlay : null,
      style: s.play,
      name: player.playing ? 'ios-pause' : 'ios-play',
      size: 30,
      color: hasPodcast ? '#fff' : '#333',
    };

    const hasNext = index < player.podcastList.length - 1;
    const nextButton = {
      onPress: hasNext ? nextPodcast : null,
      style: s.forward,
      name: 'ios-fastforward',
      size: 25,
      color: hasNext ? '#fff' : '#333',
    };

    return (
      <View style={s.container}>
        <View style={s.sliderContainer}>
          <Slider
            disabled={!hasPodcast}
            onSlidingStart={actions.slide}
            onValueChange={(value) => this.slideChange(value)}
            onSlidingComplete={() => this.slideComplete()}
            minimumTrackTintColor="#FFF"
            style={s.slider}
            trackStyle={s.sliderTrack}
            thumbStyle={s.sliderThumb}
            value={playerRemote.currentTime / playerRemote.duration}
          />
        </View>
        <View style={s.infoContainer}>
          <Animatable.View animation={playerRemote.animation} duration={150} style={s.info}>
            <Text numberOfLines={1} style={s.title}>
              {podcast.title}
            </Text>
            <Text numberOfLines={1} style={s.description}>
              {podcast.description}
            </Text>
          </Animatable.View>
          <View style={s.controlContainer}>
            <Icon {...prevButton} />
            <Icon {...toggleButton} />
            <Icon {...nextButton} />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
  playerRemote: state.playerRemote,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(playerActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSmallRemote);
