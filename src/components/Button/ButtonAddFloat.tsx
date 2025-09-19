import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import IMAGES from '../../assets/images';

interface ButtonAddFloatProps {
  onPress: () => any;
  style?: StyleProp<ViewStyle>;
  icon?: any;
}

const ButtonAddFloat = ({ onPress, style, icon }: ButtonAddFloatProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.Button, style]}>
      <Image
        style={styles.IconAdd}
        source={icon ? icon : IMAGES.COMMON.icon_button_add_float}
      />
    </TouchableOpacity>
  );
};

export default ButtonAddFloat;

const styles = StyleSheet.create({
  Button: {
    position: 'absolute',
    bottom: 115,
    right: 16,
    backgroundColor: '#1354D4',
    width: 56,
    height: 56,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  IconAdd: {
    width: 24,
    height: 24,
    objectFit: 'scale-down',
  },
});
