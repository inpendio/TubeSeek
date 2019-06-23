import React from 'react';
import {
  Animated, Easing, Dimensions, View,
} from 'react-native';
/* import PropTypes from 'prop-types'; */
import Gmail from './Gmail';
import Facebook from './FacebookShare';
import Twitter from './TwitterShare';
import Whatsapp from './WhatsappShare';
import Clipboard from './Clipboard';
import Generic from './Generic';
import { blockStyle as style } from './Style';

const ShareBlock = (props) => {
  const { link, title } = props;

  return (
    <View style={style.buttonWrapper}>
      <Facebook
        key={`facebookshare_${link}`}
        url={link}
        title={title}
        inline
        style={style.button}
      />
      <Whatsapp
        key={`WhatsappShare_${link}`}
        url={link}
        title={title}
        inline
        style={style.button}
      />
      <Gmail
        key={`Gmail_${link}`}
        url={link}
        title={title}
        inline
        style={style.button}
      />
      <Twitter
        key={`twittershare_${link}`}
        url={link}
        title={title}
        inline
        style={style.button}
      />
      <Clipboard
        key={`Clipboardshare_${link}`}
        url={link}
        title={title}
        inline
        style={style.button}
      />
      <Generic
        key={`genericshare_${link}`}
        url={link}
        title={title}
        inline
        style={style.button}
      />
    </View>
  );
};

/* ShareBlock.propTypes = {
  link: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}; */

export default ShareBlock;
