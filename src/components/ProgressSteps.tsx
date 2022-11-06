/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Platform} from 'react-native';
import React from 'react';
import {colors} from '../utils/colors';
import {moderateScale, verticalScale} from '../utils/responsive';
import Entypo from 'react-native-vector-icons/Entypo';

export default function ProgressSteps({
  isStep1,
  isStep2,
  isCompleted1stStep,
  isCompleted2ndStep,
}: ProgressStepsProps) {
  return (
    <View style={styles.bgContainer}>
      <View
        style={[
          styles.container,
          {
            borderWidth: isStep1 ? 2 : 0,
            borderColor: isStep1 ? colors.secondary : 'transparent',
          },
        ]}>
        {isCompleted1stStep ? (
          <Entypo name="check" size={20} color={colors.text} />
        ) : (
          <Text style={styles.text}>1</Text>
        )}
      </View>
      <View style={styles.line} />
      <View
        style={[
          styles.container,
          {
            borderWidth: isStep2 ? 2 : 0,
            borderColor: isStep2 ? colors.secondary : 'transparent',
          },
        ]}>
        {isCompleted2ndStep ? (
          <Entypo name="check" size={20} color={colors.text} />
        ) : (
          <Text style={styles.text}>2</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    flexDirection: 'row',
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 35,
  },
  line: {
    width: verticalScale(55),
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
    bottom: Platform.OS === 'android' ? verticalScale(20) : verticalScale(15),
  },
  text: {
    fontSize: moderateScale(15),
    fontFamily: 'Montserrat-Bold',
    color: colors.text,
  },
});
