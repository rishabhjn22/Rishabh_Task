import {View, Text, TextInput, StyleSheet, Platform} from 'react-native';
import React from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utils/responsive';
import {colors} from '../utils/colors';
import {CustomInputProps} from '../types/propsTypes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BorderlessButton} from 'react-native-gesture-handler';

export default function CustomInput({
  onChangeText,
  placeholder,
  value,
  label,
  editable,
  events,
  error,
  onPress,
  icon,
  color,
  size,
  endIcon,
}: CustomInputProps) {
  return (
    <View pointerEvents={events}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        editable={editable}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={styles.Input}
        placeholderTextColor={colors.white}
        autoCapitalize="none"
      />
      {error && <Text style={styles.error}>{error}</Text>}
      {endIcon && (
        <BorderlessButton style={[styles.icon]} onPress={onPress}>
          <Icon name={icon} color={color} size={size} />
        </BorderlessButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.white,
    fontSize: moderateScale(15),
    fontFamily: 'Montserrat-Bold',
    paddingBottom: verticalScale(10),
  },
  Input: {
    padding: verticalScale(13),
    borderRadius: 8,
    backgroundColor: colors.primaryDark,
    color: colors.white,
    fontSize: moderateScale(12.5),
    fontFamily: 'Montserrat-Regular',
  },
  error: {
    color: 'red',
    fontSize: moderateScale(15),
    marginBottom: verticalScale(10),
  },
  icon: {
    position: 'absolute',
    top: Platform.OS === 'android' ? verticalScale(48) : verticalScale(40),
    right: horizontalScale(20),
    zIndex: 2,

    // backgroundColor: 'red',
  },
});
