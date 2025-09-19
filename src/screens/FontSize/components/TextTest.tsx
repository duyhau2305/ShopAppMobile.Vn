import {StyleProp, Text, TextStyle} from 'react-native';
import React from 'react';
import {getFontSize, getFontFamilyInter} from '../../../utils/helpers';
import sty from '../../../themes/sty';

interface TextTestProps {
  text: string | number | null | undefined;
  color?: string;
  fontSize?: number;
  styles?: StyleProp<TextStyle>;
  fontWeight?: 'bold' | 'semibold' | 'medium' | 'regular' | 'light';
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip' | undefined;
  textAlign?: 'left' | 'center' | 'right' | 'justify' | undefined;
  lineHeight?: number;
  padding?: number;
  level: string;
}

const TextTest = ({
  text,
  color,
  fontSize,
  styles,
  fontWeight,
  numberOfLines,
  ellipsizeMode,
  textAlign,
  lineHeight,
  padding,
  level,
}: TextTestProps) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={[
        {
          color: color || '#52585f',
          fontSize: getFontSize(level, fontSize || 14, lineHeight || 20)
            ?.fontSize,
          fontFamily: getFontFamilyInter(fontWeight || 'medium'),
          textAlign: textAlign || 'left',
          lineHeight: getFontSize(level, fontSize || 14, lineHeight || 20)
            ?.lineHeight,
          padding: padding || 0,
        },
        sty.shrink_1,
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextTest;
