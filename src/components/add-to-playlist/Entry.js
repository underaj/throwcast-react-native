import React from 'react';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import s from './entryStyles';

const Entry = ({ entry, podcast, updatePlaylist }) => (
  <TouchableHighlight
    style={s.container}
    onPress={() => {
      if (updatePlaylist) {
        updatePlaylist(entry, podcast);
      }
    }}
  >
    <Animatable.View animation="slideInLeft" duration={300} style={s.box}>
      <View style={s.info}>
        <Text numberOfLines={2} style={s.title}>{entry.title}</Text>
        <Text
          numberOfLines={2}
          style={s.description}
        >
          {entry.podcasts.length} Podcasts
        </Text>
      </View>
    </Animatable.View>
  </TouchableHighlight>
);

export default Entry;
