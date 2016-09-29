import React from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { DEFAULT_IMAGE } from '../../constants';

import s from './entryStyles';

const ListEntry = ({ entry, getQueue, type }) => {
  let description;
  if (type === 'playlists') {
    description = `${entry.podcasts.length} podcasts`;
  } else {
    description = entry.description ? entry.description.short : entry.description.long;
  }
  return (
    <TouchableHighlight onPress={() => getQueue(entry, type)}>
      <View style={s.box}>
        <Image source={{ uri: entry.image || DEFAULT_IMAGE, height: 120 }} />
        <Text numberOfLines={1} style={s.title}>{entry.title}</Text>
        <Text numberOfLines={1} style={s.description}>
          {description}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default ListEntry;
