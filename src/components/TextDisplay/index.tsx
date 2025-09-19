import { StyleProp, Text, TextStyle } from 'react-native';
import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import sty from '../../themes/sty';
import { getFontSize, getFontFamilyInter } from '../../utils/helpers';

interface TextDisplayProps {
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
}

const TextDisplay = ({
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
}: TextDisplayProps) => {
  const { fontSize: level } = useAppSelector(state => state.common);
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
      ]}
    >
      {text}
    </Text>
  );
};

export default TextDisplay;
