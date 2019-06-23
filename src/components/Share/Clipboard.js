import React from 'react';
import { Image, TouchableHighlight, Clipboard } from 'react-native';
import { clipboard as img } from './assets';
import { buttonStyle } from './Style';

const share = obj => () => {
  if (obj.url) {
    Clipboard.setString(obj.url);
  }
};

const ClipboardShare = (props) => {
  const { url, title } = props;
  const shareOptions = {
    title,
    url,
    /* message: url, */
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

/* ClipboardShare.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}; */

export default ClipboardShare;
