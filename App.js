import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-native-magic-move";
import { Provider as ReduxProvider } from "react-redux";
import Scenes from "scenes";
import store from "store";
import { init } from "utils";

function App() {
  init(store);
  return (
    <ReduxProvider store={store}>
      <Provider>
        <Scenes />
      </Provider>
    </ReduxProvider>
  );
}
export default App;
