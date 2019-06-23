import React from 'react';
/* import PropTypes from 'prop-types'; */
import Share from 'react-native-share';
import { Image, TouchableHighlight } from 'react-native';
import { twitter as img } from './assets';
import { buttonStyle } from './Style';

const share = obj => () => {
  Share.shareSingle(obj).catch(() => {});
};

const TwitterShare = (props) => {
  const { url, title } = props;
  const shareOptions = {
    title,
    url,
    social: 'twitter',
  };
  return (
    <TouchableHighlight
      style={[buttonStyle.wrapper]}
      onPress={share(shareOptions)}
    >
      <Image style={[buttonStyle.img]} source={img} />
    </TouchableHighlight>
  );
};
/* TwitterShare.defaultProps = {};
TwitterShare.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}; */

export default TwitterShare;
