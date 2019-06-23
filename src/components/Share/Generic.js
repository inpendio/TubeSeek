import React from 'react';
/* import PropTypes from 'prop-types'; */
import Share from 'react-native-share';
import { Image, TouchableHighlight } from 'react-native';
import { generic as img } from './assets';
import { buttonStyle } from './Style';

const share = obj => () => {
  Share.open(obj).catch(() => {});
};

const GenericShare = (props) => {
  const { url, title } = props;
  const shareOptions = {
    title,
    url,
    subject: title,
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
/* GenericShare.defaultProps = {};
GenericShare.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}; */

export default GenericShare;
