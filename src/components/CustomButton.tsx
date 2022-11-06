import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../utils/colors';
import {moderateScale, verticalScale} from '../utils/responsive';

export default function CustomButton({onPress}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={styles.buttonBg}
      activeOpacity={0.8}
      onPress={onPress}>
      <Text style={styles.text}>Next</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonBg: {
    backgroundColor: colors.secondary,
    padding: verticalScale(15),
    alignItems: 'center',
    borderRadius: 25,
  },
  text: {
    color: colors.white,
    fontSize: moderateScale(15),
    fontFamily: 'Montserrat-Bold',
  },
});
