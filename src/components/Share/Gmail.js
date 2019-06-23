import React from 'react';
/* import PropTypes from 'prop-types'; */
import Share from 'react-native-share';
import { Image, TouchableHighlight } from 'react-native';
import { email as img } from './assets';
import { buttonStyle } from './Style';

const share = obj => () => {
  Share.shareSingle(obj).catch(() => {});
};

const GmailShare = (props) => {
  const { url, title } = props;
  const shareOptions = {
    title,
    url,
    subject: title,
    social: 'email',
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

/* GmailShare.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}; */

export default GmailShare;
