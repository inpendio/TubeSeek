import React, { useState, memo } from 'react';
import { View as RNView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Image, CheckBox } from 'react-native-elements';
import { View, Scene } from 'react-native-magic-move';
import { setBitchuteLoginData } from 'utils';
import { bitchuteLogo } from 'assets';
import {
  LoginWebView, Button, Loader, Text,
} from 'components';
import { actionAddBitchuteLoginData, actionBitchuteReloadAll } from 'store';
import styles from './styles';

function BitchuteLogin({ navigation }) {
  const bitchuteLoginData = useSelector(state => state.bitchute.loginData);
  const [key, setKey] = useState(bitchuteLoginData.key);
  const [saveLoginData, setSaveLoginData] = useState(false);
  const [password, setPassword] = useState(bitchuteLoginData.password);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const tryLoggin = () => {
    setModal(true);
  };

  return (
    <Scene>
      <View id="FeedSceneView" style={[styles.flex1, styles.wrapper]}>
        <View
          style={[styles.logoImage, styles.marginTop20s]}
          id="bitchute_logo"
        >
          <Image
            source={bitchuteLogo}
            style={{ height: 60 }}
            resizeMode="contain"
          />
        </View>

        <RNView style={[styles.centerAll, styles.flex1]}>
          <RNView>
            <Input
              containerStyle={[styles.marginTop20]}
              onChangeText={setKey}
              placeholder="username or email"
              leftIcon={{ type: 'font-awesome', name: 'user' }}
              value={key}
            />
            <Input
              containerStyle={[styles.marginTop20]}
              onChangeText={setPassword}
              placeholder="password"
              leftIcon={{ type: 'font-awesome', name: 'lock' }}
              errorMessage={error}
              value={password}
              secureTextEntry
            />
          </RNView>
          <RNView>
            <CheckBox
              center
              title="Save login credentials"
              checked={saveLoginData}
              onPress={() => setSaveLoginData(!saveLoginData)}
            />
            <Text body4 style={{ textAlign: 'center' }}>
              Your data will be stored only locally on this device.
            </Text>
          </RNView>
          <Button
            onPress={tryLoggin}
            title="LOGIN"
            containerStyle={[styles.marginTop20]}
            loading={modal}
          />
        </RNView>
        {modal && (
          <LoginWebView
            data={{ key, password }}
            onFailure={(data) => {
              setError(data.msg);
              setModal(false);
            }}
            onSuccess={() => {
              if (saveLoginData) setBitchuteLoginData({ key, password });
              dispatch(actionAddBitchuteLoginData({ key, password }));
              dispatch(actionBitchuteReloadAll());
              setModal(false);
              navigation.pop();
            }}
          />
        )}
      </View>
    </Scene>
  );
}

export default memo(BitchuteLogin);
