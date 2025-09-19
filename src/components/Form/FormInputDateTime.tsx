import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import IMAGES from '../../assets/images';
import TextDisplay from '../TextDisplay';
import sty from '../../themes/sty';

interface FormInputDateTimeProps {
  label: string;
  value: string;
  onPress: any;
  required?: boolean;
  time?: boolean;
  onClear?: any;
  hiddenClear?: boolean;
  disabled?: boolean;
}

const FormInputDateTime = ({
  onPress,
  label,
  value,
  required,
  time,
  onClear,
  disabled,
  hiddenClear,
}: FormInputDateTimeProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={styles.FormItemSelect}
      activeOpacity={0.8}
    >
      <View style={sty.shrink_1}>
        <View style={[sty.flexRow, sty.gap_4]}>
          <TextDisplay color="#838c97" text={label} />
          {required && <TextDisplay text="*" color="#D92D20" />}
        </View>
        <TextDisplay
          color="#393d42"
          fontSize={16}
          lineHeight={24}
          fontWeight="semibold"
          styles={sty.min_h_24}
          text={value}
        />
      </View>
      <View style={[sty.flexRow, sty.itemsCenter, sty.gap_4]}>
        {!hiddenClear && onClear && (
          <TouchableOpacity onPress={onClear}>
            <Image
              style={[sty.w_20, sty.h_20, sty.objectScaleDown]}
              source={IMAGES.FORM.icon_clear_value}
            />
          </TouchableOpacity>
        )}
        <Image
          style={[sty.w_24, sty.h_24, sty.objectScaleDown]}
          source={time ? IMAGES.FORM.icon_oclock : IMAGES.FORM.icon_calendar}
        />
      </View>
    </TouchableOpacity>
  );
};

export default FormInputDateTime;

const styles = StyleSheet.create({
  FormItemSelect: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#dbdfe5',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
    flexShrink: 1,
  },
});
