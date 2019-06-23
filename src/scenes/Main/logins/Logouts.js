import React, { useState, memo } from 'react';
import { View } from 'react-native';
import { Button, Card, Image } from 'react-native-elements';
import { BitchuteLogout } from 'components';
import { useDispatch } from 'react-redux';
import { Scene } from 'react-native-magic-move';
import { bitchuteLogo } from 'assets';
import { actionBitchuteLogOut } from 'store';
import styles from './styles';

function Logouts() {
  const [logout, setLogout] = useState(false);
  const dispatch = useDispatch();
  return (
    <Scene>
      <View>
        <Card>
          <View style={[styles.logoImage, styles.marginTop20s]}>
            <Image
              source={bitchuteLogo}
              style={{ height: 60 }}
              resizeMode="contain"
            />
          </View>
          <Button
            title="Logout"
            secondary
            buttonStyle={styles.marginTop20}
            onPress={() => {
              setLogout(true);
            }}
            loading={logout}
          />
        </Card>
        {logout && (
          <BitchuteLogout
            onSuccess={() => {
              dispatch(actionBitchuteLogOut());
              setLogout(false);
            }}
            onFailure={() => {
              setLogout(false);
            }}
          />
        )}
      </View>
    </Scene>
  );
}

export default memo(Logouts);
