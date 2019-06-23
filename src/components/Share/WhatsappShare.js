import React from 'react';
/* import PropTypes from 'prop-types'; */
import Share from 'react-native-share';
import { Image, TouchableHighlight } from 'react-native';
import { whatsapp as img } from './assets';
import { buttonStyle } from './Style';

const share = obj => () => {
  Share.shareSingle(obj).catch(() => {});
};

const WhatsappShare = (props) => {
  const { url, title } = props;
  const shareOptions = {
    title,

    url,
    social: 'whatsapp',
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
/* WhatsappShare.defaultProps = {};
WhatsappShare.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}; */

export default WhatsappShare;
