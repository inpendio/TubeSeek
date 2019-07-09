import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import {
  actionCleanSearchResults,
  addNavigation,
  actionCleanVideo,
} from 'store';
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
    pop,
    state: { routeName },
  } = navigation;

  const _navigation = useSelector(s => s.general.navigation);
  const dispatch = useDispatch();

  if (!_navigation) dispatch(addNavigation(navigation));

  const goBack = () => {
    if (routeName === 'Search') dispatch(actionCleanSearchResults());

    pop();
    // if (routeName === 'Video') dispatch(actionCleanVideo());
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
