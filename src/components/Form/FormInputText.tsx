import {
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useRef} from 'react';
import {FONT_FAMILY} from '../../themes/fontFamily';
import sty from '../../themes/sty';
import TextDisplay from '../TextDisplay';

interface FormInputTextProps {
  value: string;
  required?: boolean;
  keyboardType?: string;
  label: string;
  onChangeText: any;
  onFocus?: any;
  readOnly?: boolean;
  style?: StyleProp<ViewStyle>;
}

const FormInputText = ({
  value,
  required,
  keyboardType,
  label,
  onChangeText,
  onFocus,
  readOnly,
  style,
}: FormInputTextProps) => {
  const inputRef = useRef<any>(null);
  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={readOnly}
      onPress={() => inputRef.current.focus()}
      style={[styles.FormItemInput, style]}>
      <View style={[sty.flexRow, sty.gap_4]}>
        <TextDisplay text={label} color="#838c97" />
        {required && <TextDisplay text="*" color="#D92D20" />}
      </View>
      {readOnly ? (
        <TextDisplay
          text={value}
          fontSize={16}
          lineHeight={24}
          styles={sty.min_h_24}
          fontWeight="semibold"
          color="#393d42"
        />
      ) : (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.Input}
          ref={inputRef}
          keyboardType={keyboardType || 'default'}
          onFocus={onFocus}
        />
      )}
    </TouchableOpacity>
  );
};

export default FormInputText;

const styles = StyleSheet.create({
  FormItemInput: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#dbdfe5',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  Input: {
    ...Platform.select({
      ios: {
        height: 32,
      },
      android: {
        height: 40,
      },
    }),
    fontSize: 16,
    fontFamily: FONT_FAMILY.Inter_SemiBold,
    color: '#393d42',
    lineHeight: 24,
    flexShrink: 1,
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
