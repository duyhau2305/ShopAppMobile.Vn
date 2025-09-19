import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import TextDisplay from '../TextDisplay';
import sty from '../../themes/sty';

interface FormInputDisabledProps {
  label: string;
  value: string;
  required?: boolean;
  suffix?: string;
  style?: StyleProp<ViewStyle>;
}

const FormInputDisabled = ({
  label,
  value,
  required,
  suffix,
  style,
}: FormInputDisabledProps) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.FormItemDisabled, style]}>
      <View style={[sty.flexRow, sty.gap_4]}>
        <TextDisplay text={label} color="#838c97" />
        {required && <TextDisplay text="*" color="#D92D20" />}
      </View>
      <View style={[sty.flexRow, sty.gap_4, sty.justifyBetween]}>
        <TextDisplay
          text={value}
          fontSize={16}
          lineHeight={24}
          styles={sty.min_h_24}
          fontWeight="semibold"
          color="#393d42"
        />
        {suffix && (
          <TextDisplay
            text={suffix}
            fontSize={16}
            lineHeight={24}
            fontWeight="semibold"
            styles={sty.shrink_0}
            color="#393d42"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FormInputDisabled;

const styles = StyleSheet.create({
  FormItemDisabled: {
    borderColor: '#dbdfe5',
    backgroundColor: '#edeff2',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});
