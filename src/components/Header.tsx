import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale, verticalScale} from '../utils/responsive';

export default function Header() {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="snapchat" size={30} color="#000000" />
      <Text style={styles.text}>SNAP AD</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingBottom: verticalScale(20),
    paddingTop: verticalScale(20),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  text: {
    color: colors.text,
    fontSize: moderateScale(15),
    fontFamily: 'Montserrat-Regular',
  },
});
