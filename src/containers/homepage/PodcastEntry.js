import React from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { DEFAULT_IMAGE } from '../../constants';

import s from './entryStyles';

const PodcastEntry = ({ entry, selectPodcast, player }) => {
  let changePodcast = false;
  if (player.queueId !== entry._id) {
    changePodcast = true;
  }

  return (
    <TouchableHighlight onPress={() => selectPodcast(entry._id, [entry], 0, changePodcast)}>
      <View style={s.box}>
        <Image source={{ uri: entry.image || DEFAULT_IMAGE, height: 120 }} />
        <Text numberOfLines={1} style={s.title}>{entry.title}</Text>
        <Text numberOfLines={1} style={s.description}>{entry.description}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default PodcastEntry;
