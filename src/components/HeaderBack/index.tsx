import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import IMAGES from '../../assets/images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import sty from '../../themes/sty';
import TextDisplay from '../TextDisplay';

interface HeaderBackProps {
  title: string;
  subTitle?: string;
  RightIcon?: any;
  style?: StyleProp<ViewStyle>;
  icon?: any;
}

const HeaderBack = ({
  title,
  style,
  RightIcon,
  subTitle,
  icon,
}: HeaderBackProps) => {
  const navigate = useNavigation<any>();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.HeaderBack, {paddingTop: insets.top}, style]}>
      <TouchableOpacity
        activeOpacity={1}
        style={sty.p_16}
        onPress={() => navigate.goBack()}>
        <Image
          style={[sty.w_20, sty.h_20, sty.objectScaleDown]}
          source={icon ? icon : IMAGES.COMMON.icon_back_screen}
        />
      </TouchableOpacity>
      <View style={[sty.shrink_1, sty.grow_1]}>
        <TextDisplay
          text={title || ''}
          fontSize={18}
          lineHeight={24}
          color="#181D27"
          fontWeight="bold"
        />
        {!!subTitle && <TextDisplay text={subTitle} color="#52585F" />}
      </View>
      {RightIcon && <View style={sty.pl_12}>{RightIcon}</View>}
    </View>
  );
};

export default HeaderBack;

const styles = StyleSheet.create({
  HeaderBack: {
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
