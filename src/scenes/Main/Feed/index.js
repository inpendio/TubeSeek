import React, { useState } from "react";
import { View as RNView } from "react-native";
import { Text, Button } from "react-native-elements";
import { Scene, View } from "react-native-magic-move";
import WebView from "react-native-webview";
import { LoginWebView, FeedWebView } from "components";
import { BitchuteLogin } from "layouts";

export default function FeedScene({ navigation }) {
  const [login, setLogin] = useState(false);
  const onMessage = event => {
    console.log(JSON.parse(event.nativeEvent.data));
  };
  return (
    <Scene>
      <RNView>
        <Text>Main</Text>
      </RNView>
    </Scene>
  );
}
