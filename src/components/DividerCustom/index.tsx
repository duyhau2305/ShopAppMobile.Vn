import { StyleProp, View } from 'react-native';
import React from 'react';

interface DividerCustomProps {
  color?: string;
  width?: string | number;
  height?: string | number;
  styles?: StyleProp<any>;
}

const DividerCustom = ({ color, width, height, styles }: DividerCustomProps) => {
  return (
    <View
      style={[
        {
          backgroundColor: color || '#E9E9E9',
          width: width || '100%',
          height: height || 1,
        },
        styles,
      ]}
    >
      {}
    </View>
  );
};

export default DividerCustom;
