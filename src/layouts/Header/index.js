import React, { memo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Input } from 'react-native-elements';
import { actionCleanSearchResults } from 'store';
import { Loader } from 'components';
import { colors } from 'config';
import HeaderRight from '../HeaderRight';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

function Header({ navigation, initialRoute }) {
  const {
    /* openDrawer,
    navigate, */
    pop,
    state: { routeName },
  } = navigation;

  const dispatch = useDispatch();

  const goBack = () => {
    if (routeName === 'Search') dispatch(actionCleanSearchResults());
    pop();
  };

  return (
    <View style={styles.wrapper}>
      <View>
        {routeName !== initialRoute && (
          <Icon
            name="arrow-left"
            type="feather"
            size={24}
            color={colors.black}
            style={{ padding: 5 }}
            onPress={goBack}
          />
        )}
      </View>
      <HeaderRight navigation={navigation} />
    </View>
  );
}

export default memo(Header);
