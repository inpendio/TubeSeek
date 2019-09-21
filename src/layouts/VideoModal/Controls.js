import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { actionToggleCurrentVideoPause } from 'store';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#00000099',
  },
  playWrapper: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  play: {
    fontSize: 44,
  },
});

function Controls({ style, closeControls, isFull }) {
  const dispatch = useDispatch();
  const paused = useSelector(s => s.video.currentVideo.paused);
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('pressed');
      }}
      style={{ zIndex: 999999 }}
    >
      <View style={[styles.wrapper, style]}>
        <View style={[styles.playWrapper]}>
          <Icon
            type="material"
            name={paused ? 'play-circle-outline' : 'pause'}
            color="white"
            size={66}
            style={styles.play}
            underlayColor="transparent"
            onPress={() => {
              closeControls();
              dispatch(actionToggleCurrentVideoPause());
            }}
          />
        </View>
        <View />
        <View />
      </View>
    </TouchableOpacity>
  );
}

Controls.propTypes = {};

export default Controls;
