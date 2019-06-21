import React from "react";
import { Text } from "react-native-elements";
import { Scene, View } from "react-native-magic-move";

export default function VideoScene() {
  return (
    <Scene>
      <View
        id="FeedSceneView"
        style={{
          width: 200,
          height: 200,
          backgroundColor: "purple",
          borderRadius: 0
        }}
      >
        <Text h3>VideoScene</Text>
      </View>
    </Scene>
  );
}
