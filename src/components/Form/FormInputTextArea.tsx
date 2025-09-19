import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import { FONT_FAMILY } from '../../themes/fontFamily';
import TextDisplay from '../TextDisplay';
import sty from '../../themes/sty';

interface FormInputTextAreaProps {
  value: string;
  required?: boolean;
  keyboardType?: string;
  label: string;
  onChangeText: any;
  onFocus?: any;
  readOnly?: boolean;
  numberOfLines: number;
}

const FormInputTextArea = ({
  value,
  required,
  keyboardType,
  label,
  onChangeText,
  onFocus,
  readOnly,
  numberOfLines,
}: FormInputTextAreaProps) => {
  const inputRef = useRef<any>(null);
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => inputRef.current.focus()}
      style={styles.FormItemInput}
    >
      <View style={[sty.flexRow, sty.gap_4]}>
        <TextDisplay text={label} color="#838c97" />
        {required && <TextDisplay text="*" color="#D92D20" />}
      </View>
      <TextInput
        readOnly={readOnly || false}
        value={value}
        onChangeText={onChangeText}
        style={styles.Input}
        ref={inputRef}
        keyboardType={keyboardType || 'default'}
        onFocus={onFocus}
        numberOfLines={numberOfLines}
        multiline
      />
    </TouchableOpacity>
  );
};

export default FormInputTextArea;

const styles = StyleSheet.create({
  FormItemInput: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#dbdfe5',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 12,
  },
  Input: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.Inter_SemiBold,
    color: '#393d42',
    lineHeight: 24,
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 0,
  },
});
