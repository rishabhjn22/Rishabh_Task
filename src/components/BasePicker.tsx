import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {StyleSheet} from 'react-native';

type BasePickerProps = {
  selectedValue?: any;
  onValueChange?: (itemValue: any, itemIndex: any) => void;
  data: {label: string; value: string; enabled?: boolean}[];
  enabled?: boolean;
  color?: string;
};

export default function BasePicker({
  onValueChange,
  selectedValue,
  data,
  enabled = true,
  color,
}: BasePickerProps) {
  return (
    <Picker
      enabled={enabled}
      style={styles.picker}
      onValueChange={onValueChange}
      selectedValue={selectedValue}>
      {data.map((el, index) => {
        return (
          <Picker.Item
            style={[styles.item]}
            key={index}
            label={el.label}
            value={el.value}
            enabled={el.enabled === undefined ? true : el.enabled}
            color={color}
            fontFamily="Roboto-Regular"
          />
        );
      })}
    </Picker>
  );
}

const styles = StyleSheet.create({
  container: {padding: '1rem'},
  picker: {width: '100%'},
  item: {fontSize: 14},
});
