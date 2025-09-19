import React from 'react';
import { ViewProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import sty from '../../themes/sty';

interface GradientBackgroundProps extends ViewProps {
  colors?: string[];
}

const GradientBackground = ({
  colors = ['#FFF', '#FFF'],
  style,
  children,
  ...props
}: GradientBackgroundProps) => {
  return (
    <LinearGradient colors={colors} style={[sty.flex_1, style]} {...props}>
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;
