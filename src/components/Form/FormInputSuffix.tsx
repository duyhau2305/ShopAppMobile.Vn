import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {FONT_FAMILY} from '../../themes/fontFamily';
import TextDisplay from '../TextDisplay';
import sty from '../../themes/sty';

interface FormInputSuffixProps {
  value: string;
  required?: boolean;
  keyboardType?: string;
  label: string;
  onChangeText: any;
  suffix: string;
  readOnly?: boolean;
}

const FormInputSuffix = ({
  value,
  required,
  keyboardType,
  label,
  onChangeText,
  suffix,
  readOnly,
}: FormInputSuffixProps) => {
  const inputRef = useRef<any>(null);
  return (
    <TouchableOpacity
      disabled={readOnly}
      style={styles.FormInputSuffix}
      onPress={() => inputRef.current.focus()}
      activeOpacity={1}>
      <View style={[sty.flexRow, sty.gap_4]}>
        <TextDisplay text={label} color="#838c97" />
        {required && <TextDisplay text="*" color="#D92D20" />}
      </View>
      <View style={[sty.flexRow, sty.itemsCenter, sty.justifyBetween]}>
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
            ref={inputRef}
            keyboardType={keyboardType || 'default'}
            style={styles.Input}
            onChangeText={onChangeText}
          />
        )}
        <TextDisplay
          color="#393d42"
          fontSize={16}
          lineHeight={24}
          fontWeight="semibold"
          text={suffix}
        />
      </View>
    </TouchableOpacity>
  );
};

export default FormInputSuffix;

const styles = StyleSheet.create({
  FormInputSuffix: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#dbdfe5',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 4,
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
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
