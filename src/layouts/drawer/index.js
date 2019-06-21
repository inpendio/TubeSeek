import React, { useState, useEffect } from "react";
import { View as RNView, TouchableOpacity, Image } from "react-native";
import { View } from "react-native-magic-move";
import { Text, Button, Icon } from "react-native-elements";
import { bitchuteLogo } from "assets";
import { useSelector } from "react-redux";
import styles from "./styles";
import { FeedWebView } from "components";

const checkBitchuteFeed = f => f.subscribed.length <= 0;

function Drawer(props) {
  const {
    navigation: { navigate }
  } = props;
  const bitchuteLogin = useSelector(state => state.bitchute.loggedIn);
  const bitchuteFeed = useSelector(state => state.bitchute.feed);
  const [needCheck, setNeedCheck] = useState(true);

  useEffect(() => {
    setNeedCheck(true);
  }, [bitchuteLogin]);

  return (
    <RNView style={styles.wrapper}>
      <RNView>
        <Text>LOGO</Text>
        {needCheck && checkBitchuteFeed(bitchuteFeed) && (
          <FeedWebView
            onSuccess={() => {
              setNeedCheck(false);
            }}
            onFailure={() => {
              setNeedCheck(false);
            }}
          />
        )}
      </RNView>
      <RNView>
        <TouchableOpacity
          style={styles.tubeButton}
          onPress={() => {
            navigate("BitchuteLogin");
          }}
        >
          <View id="bitchute_logo">
            <Image
              source={bitchuteLogo}
              style={styles.buttonImage}
              resizeMode="contain"
            />
          </View>
          {bitchuteLogin ? (
            <Icon color="#0f0" name="check" type="feather" />
          ) : (
            <Icon name="log-in" type="feather" />
          )}
        </TouchableOpacity>
        <Button
          title="Logout"
          onPress={() => {
            navigate("Logouts");
          }}
        />
      </RNView>
    </RNView>
  );
}

export default Drawer;
