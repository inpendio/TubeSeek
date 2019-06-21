import React, { useState } from 'react';
import { View as RNView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Image } from 'react-native-elements';
import { View, Scene } from 'react-native-magic-move';
import { setBitchuteLoginData } from 'utils';
import { bitchuteLogo } from 'assets';
import { LoginWebView, Loader } from 'components';
import { actionAddBitchuteLoginData } from 'store';
import styles from './styles';

function BitchuteLogin({ navigation }) {
  const bitchuteLoginData = useSelector(state => state.bitchute.loginData);
  const [key, setKey] = useState(bitchuteLoginData.key);
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
              setBitchuteLoginData({ key, password });
              dispatch(actionAddBitchuteLoginData({ key, password }));
              setModal(false);
              navigation.pop();
            }}
          />
        )}
      </View>
    </Scene>
  );
}

export default BitchuteLogin;
