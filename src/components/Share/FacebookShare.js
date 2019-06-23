import React from 'react';
/* import PropTypes from 'prop-types'; */
import Share from 'react-native-share';
import { Image, TouchableHighlight } from 'react-native';
import { facebook as img } from './assets';
import { buttonStyle } from './Style';

const share = obj => () => Share.shareSingle(
  Object.assign(obj, {
    social: Share.Social.FACEBOOK,
  }),
).catch(() => {});

const FacebookShare = (props) => {
  const { url, title } = props;
  const shareOptions = {
    title,
    message: url,
    url,
    subject: `MaxPortal: ${title}`,
  };
  return (
    <TouchableHighlight
      style={[buttonStyle.wrapper]}
      onPress={share(shareOptions)}
    >
      <Image style={[buttonStyle.img]} source={img} resizeMode="center" />
    </TouchableHighlight>
  );
};
/* FacebookShare.defaultProps = {};
FacebookShare.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}; */

export default FacebookShare;
