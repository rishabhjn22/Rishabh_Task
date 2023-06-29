import React from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';

const {height, width} = Dimensions.get('screen');

export default function Loader() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ActivityIndicator size="small" color="#111111" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0 ,0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  status: {
    color: 'black',
  },
  card: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  image: {height: height * 0.1, width: width * 0.2, alignSelf: 'center'},
});
