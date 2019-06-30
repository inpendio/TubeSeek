import React, { memo, useState } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Input } from 'react-native-elements';
import { actionBitchuteReloadAll, actionToggleLoading } from 'store';
import { Loader } from 'components';
import { colors } from 'config';
import styles from './styles';

function HeaderRight({ navigation: { openDrawer, navigate } }) {
  const [search, setSearch] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(s => s.general.loading);
  const currentView = useSelector(s => s.general.view);

  const refresh = () => {
    if (currentView === 'bitchute') {
      dispatch(actionBitchuteReloadAll());
      dispatch(actionToggleLoading());
    }
  };
  return (
    <View style={styles.wrapper}>
      <Icon
        containerStyle={[styles.icon]}
        color={colors.black}
        name="search"
        onPress={() => {
          navigate('Search');
        }}
      />
      {isLoading ? (
        <Loader
          size={18}
          style={{
            paddingLeft: 0,
            paddingRight: 18,
            paddingTop: 2,
          }}
        />
      ) : (
        <Icon
          containerStyle={[styles.icon, styles.redo]}
          color={colors.black}
          name="cached"
          type="material"
          onPress={refresh}
        />
      )}
      <Icon
        containerStyle={styles.icon}
        name="more-vertical"
        type="feather"
        color={colors.black}
        onPress={openDrawer}
      />
    </View>
  );
}

export default memo(HeaderRight);
