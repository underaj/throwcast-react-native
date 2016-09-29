import _ from 'lodash';
import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from 'react-native-slider';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-spinkit';

import { formattedTime } from './utils';
import { actions as playerActions } from '../../modules/player';
import { actions as favoriteActions } from '../../modules/favorite';
import s from './styles';

class PlayerRemote extends Component {
  slideChange(value) {
    this.props.actions.setCurrentTime(Math.round(value * this.props.playerRemote.duration));
  }

  slideComplete() {
    this.props.playerRemote.audio.seek(this.props.playerRemote.currentTime);
    this.props.actions.togglePlay();
  }

  renderAddFavorite() {
    const { actions, favorite, player } = this.props;
    const podcastId = player.podcastList[player.currentIndex]._id;
    const favInfo = { localField: podcastId, from: 'podcasts' };
    const isFavorite = _.find(favorite.podcasts, { _id: podcastId });
    const pickColor = isFavorite ? '#ff1aff' : '#FFF';
    let onPress;
    let icon;
    if (favorite.pending) {
      onPress = null;
      icon = <Spinner type="Wave" size={22} color="#FFFFFF" style={s.load} />;
    } else {
      onPress = isFavorite ?
      onPress = () => actions.deleteFavorite(favInfo) :
      onPress = () => actions.addFavorite(favInfo);
      icon = (<Icon
        name="md-checkbox"
        marginLeft={100}
        size={30}
        color={pickColor}
        onPress={onPress}
      />);
    }
    return (
      <View style={s.addFavorite}>
        <Text style={s.title} marginRight={10}>Add as Favorite</Text>
        <View style={s.addIcon}>
          {icon}
        </View>
      </View>
    );
  }
  renderInfo() {
    const { player, playerRemote } = this.props;
    const index = player.currentIndex;
    const podcast = player.podcastList[index];
    return (
      <Animatable.View style={s.infoContainer} animation={playerRemote.animation} duration={100}>
        <Image style={s.image} source={{ uri: podcast.image }} />
        <View style={s.info}>
          <Text numberOfLines={2} style={s.title}>
            {podcast.title}
          </Text>
          <Text numberOfLines={2} style={s.description}>
            {podcast.description}
          </Text>
        </View>
      </Animatable.View>
    );
  }

  render() {
    const { player, playerRemote, actions } = this.props;
    const { togglePlay, nextPodcast, previousPodcast } = actions;
    const index = player.currentIndex;
    const prevButton = {
      onPress: index > 0 ? previousPodcast : null,
      style: s.rewind,
      name: 'ios-rewind',
      size: 30,
      color: index > 0 ? '#fff' : '#333',
    };

    const toggleButton = {
      onPress: togglePlay,
      style: s.play,
      name: player.playing ? 'ios-pause' : 'ios-play',
      size: 50,
      color: '#fff',
    };

    const hasNext = index < player.podcastList.length - 1;
    const nextButton = {
      onPress: hasNext ? nextPodcast : null,
      style: s.forward,
      name: 'ios-fastforward',
      size: 30,
      color: hasNext ? '#fff' : '#333',
    };

    return (
      <View style={s.container}>
        <View style={s.backButton}>
          <Icon onPress={Actions.pop} name="ios-arrow-back" size={30} color="#FFF" />
        </View>
        <View style={s.innerContainer}>
          {this.renderInfo()}
        </View>
        <View style={s.sliderContainer}>
          <Slider
            onSlidingStart={actions.slide}
            onValueChange={(value) => this.slideChange(value)}
            onSlidingComplete={() => this.slideComplete()}
            minimumTrackTintColor="#ff1aff"
            style={s.slider}
            trackStyle={s.sliderTrack}
            thumbStyle={s.sliderThumb}
            value={playerRemote.currentTime / playerRemote.duration}
          />
          <View style={s.timeInfo}>
            <Text style={s.timeLeft}>
              {formattedTime(playerRemote.currentTime)}
            </Text>
            <Text style={s.timeRight}>
              {formattedTime(playerRemote.duration)}
            </Text>
          </View>
        </View>
        <View style={s.controlContainer}>
          <Icon {...prevButton} />
          <Icon {...toggleButton} />
          <Icon {...nextButton} />
        </View>
        <View style={s.addButton}>{this.renderAddFavorite()}</View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
  playerRemote: state.playerRemote,
  favorite: state.favorite,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...playerActions, ...favoriteActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerRemote);
