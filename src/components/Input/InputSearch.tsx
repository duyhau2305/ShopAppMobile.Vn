import {
  Image,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import IMAGES from '../../assets/images';
import { FONT_FAMILY } from '../../themes/fontFamily';
import sty from '../../themes/sty';

interface InputSearchProps {
  value: string;
  onChangeText: any;
  placeholder?: string;
  onPress?: any;
  onFocus?: any;
  placeholderTextColor?: string;
  positionSearch?: string;
  style?: StyleProp<ViewStyle>;
}

const InputSearch = ({
  value,
  onChangeText,
  placeholder,
  onPress,
  onFocus,
  placeholderTextColor,
  positionSearch = 'end',
  style,
}: InputSearchProps) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[sty.px_16, style]}
    >
      <View style={styles.InputSearchContainer}>
        {positionSearch === 'start' && (
          <Image
            style={[sty.w_16, sty.h_16, sty.objectScaleDown]}
            source={IMAGES.FORM.icon_input_search}
          />
        )}
        <TextInput
          style={styles.InputSearch}
          placeholder={placeholder || 'Nhập để tìm kiếm'}
          placeholderTextColor={placeholderTextColor || '#808080'}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
        />
        {positionSearch === 'end' && (
          <Image
            style={[sty.w_16, sty.h_16, sty.objectScaleDown]}
            source={IMAGES.FORM.icon_input_search}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default InputSearch;

const styles = StyleSheet.create({
  InputSearch: {
    height: 38,
    flexGrow: 1,
    backgroundColor: '#fff',
    flexShrink: 1,
    fontFamily: FONT_FAMILY.Inter_Medium,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  InputSearchContainer: {
    borderColor: '#E5E5E5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
});
