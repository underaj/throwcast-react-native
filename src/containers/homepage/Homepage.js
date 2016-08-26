import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Navbar, PlayerSmallRemote } from '../../components';
import PodcastEntry from './PodcastEntry';
import ListEntry from './ListEntry';
import { actions as podcastActions } from '../../modules/podcast';
import { actions as playlistActions } from '../../modules/playlist';
import { actions as stationActions } from '../../modules/station';
import { actions as favoriteActions } from '../../modules/favorite';
import { getQueue } from '../queue/queueActions';
import { selectPodcast } from '../../modules/player/playerActions';
import s from './homepageStyles';


class Homepage extends Component {
  componentWillMount() {
    const { actions } = this.props;
    actions.getPodcasts();
    actions.getStations();
    actions.getPlaylists();
    actions.getFavorites();
  }

  render() {
    const { stations, podcasts, actions, player, playlists } = this.props;
    return (
      <View style={s.outerContainer}>
        <View style={s.header}>
          <Navbar />
        </View>
        <ScrollView style={s.innerContainer}>
          <View>
            <Text style={s.listTitle}>Stations</Text>
            <View style={s.scrollContainer}>
              <ScrollView automaticallyAdjustContentInsets={false} horizontal>
                {stations.list.map((entry) =>
                  <ListEntry key={entry._id} {...actions} entry={entry} type="stations" />
                )}
              </ScrollView>
            </View>
            <Text style={s.listTitle}>Popular podcasts</Text>
            <View style={s.scrollContainer}>
              <ScrollView automaticallyAdjustContentInsets={false} horizontal>
                {podcasts.list.map((entry) =>
                  <PodcastEntry
                    key={entry._id}
                    {...actions}
                    entry={entry}
                    player={player}
                  />
                )}
              </ScrollView>
            </View>
            <Text style={s.listTitle}>Popular playlists</Text>
            <View style={s.scrollContainer}>
              <ScrollView automaticallyAdjustContentInsets={false} horizontal>
                {playlists.list.map((entry) =>
                  <ListEntry key={entry._id} {...actions} entry={entry} type="playlists" />
                )}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
        <View style={s.footer}>
          <PlayerSmallRemote />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  stations: state.station,
  podcasts: state.podcast,
  player: state.player,
  playlists: state.playlist,
  favorites: state.favorite,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getQueue,
    selectPodcast,
    ...podcastActions,
    ...stationActions,
    ...favoriteActions,
    ...playlistActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
