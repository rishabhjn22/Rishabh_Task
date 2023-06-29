import {StyleSheet, Text, TextInput, View, ViewStyle} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {TextInputProps} from 'react-native';

type InputProps = {
  disableCopyPaste?: boolean;
  callOnFocus?: () => any;
  showTextButton?: boolean;
  error?: string;
  noMargin?: boolean;
  label?: string;
  propsStyle?: ViewStyle;
  color?: string;
  input?: ViewStyle;
};

export default function Input(props: TextInputProps & InputProps) {
  const {
    disableCopyPaste,
    value,
    placeholder,
    keyboardType,
    error,
    editable = true,
    label,
    color,
    input,
  } = props;

  const inputRef = useRef<TextInput>(null);
  const [highlight, setHighlight] = useState(false);
  const [selection, setSelection] = useState({start: 0, end: 0});

  useEffect(() => {
    if (value && value?.length !== 0) {
      onFocus();
    }
  }, [value]);

  function onFocus() {
    setHighlight(true);
  }

  function onBlur() {
    setHighlight(false);
  }

  return (
    <View style={[styles.container]}>
      <View style={styles.inputContainer}>
        {label && <Text style={[styles.label, {color: color}]}>{label}</Text>}
        <TextInput
          contextMenuHidden={disableCopyPaste}
          onSelectionChange={
            disableCopyPaste
              ? e => {
                  const {start} = e.nativeEvent.selection;
                  setSelection({start, end: start});
                }
              : undefined
          }
          selection={disableCopyPaste ? selection : undefined}
          placeholder={placeholder}
          ref={inputRef}
          placeholderTextColor="#919191"
          style={[
            styles.input,
            highlight && styles.focused,
            editable === false && styles.disabled,
            input,
          ]}
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardType={keyboardType}
          {...props}
        />
      </View>

      <View style={styles.row}>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#C1C1C1',
    width: '100%',
    paddingHorizontal: wp('4%'),
    borderRadius: 5,
    fontFamily: 'Roboto-Regular',
    color: '#919191',
    backgroundColor: 'transparent',
    height: 50,
  },
  focused: {
    borderColor: '#111111',
  },
  link: {marginLeft: 'auto'},
  top: {top: -8},
  inputError: {borderColor: 'red'},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    top: 10,
  },
  marginTop: {
    marginTop: 15,
  },
  error: {
    color: 'red',
    alignSelf: 'flex-start',
  },
  noMarginIcon: {
    height: '40%',
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: -5,
    height: '60%',
    width: '20%',
    zIndex: 2,
  },
  disabled: {
    borderColor: '#CCCCCC',
    borderBottomWidth: 2,
    borderRadius: 6,
    color: 'rgba(38, 38, 38, 0.3)',
  },
  label: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: '#919191',
    backgroundColor: '#fff',
    paddingLeft: 2,
    marginBottom: 4,
  },
});
