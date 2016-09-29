import React from 'react';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import s from './entryStyles';

const Entry = ({ entry, type, hideModal, selectPodcast, getQueue, searchClear }) => {
  const onPress = () => {
    hideModal();
    searchClear();
    if (type === 'podcast') {
      selectPodcast(entry._id, [entry], 0, true);
    } else {
      getQueue(entry, `${type}s`);
    }
  };
  return (
    <Animatable.View animation="slideInLeft" duration={300} style={s.container} >
      <TouchableHighlight style={s.box} onPress={onPress}>
        <View style={s.info}>
          <Text numberOfLines={2} style={s.title}>{entry.title}</Text>
          <Text numberOfLines={2} style={s.description}>
            {type}
          </Text>
        </View>
      </TouchableHighlight>
    </Animatable.View>
  );
};


export default Entry;
