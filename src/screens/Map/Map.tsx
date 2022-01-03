import React, { useMemo } from 'react';
import Config from 'react-native-config';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { lightTheme } from '../../theme';

const windowSize = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: windowSize.width,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const initLocation: Region = {
  latitude: Number(Config.INIT_MAP_LAT),
  longitude: Number(Config.INIT_MAP_LNG),
  latitudeDelta: Number(Config.INIT_MAP_LAT_DELTA),
  longitudeDelta: Number(Config.INIT_MAP_LNG_DELTA),
};

const Map = () => {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  const mapHeight = useMemo(
    () =>
      windowSize.height -
      (insets.bottom + insets.top + tabBarHeight + lightTheme.spaceUnit),
    [insets, tabBarHeight],
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            ...styles.map,
            height: mapHeight,
          }}
          region={initLocation}
        />
      </View>
    </SafeAreaView>
  );
};

export default Map;
