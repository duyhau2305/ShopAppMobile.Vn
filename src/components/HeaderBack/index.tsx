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
import { fontFamilies } from '../../constants/fontFamilies';

import TextComponent from '../TextComponent/TextComponent';

interface HeaderBackProps {
  title: string;
  subTitle?: string;
  section?: any;
  RightIcon?: any;
  RightIcon2?: any;
  style?: StyleProp<ViewStyle>;
  icon?: any;
  onPressRightIcon?: () => void;
  onPressRightIcon2?: () => void;
}

const HeaderBack = ({
  title,
  style,
  section,
  RightIcon,
  RightIcon2,
  subTitle,
  icon,
  onPressRightIcon,
  onPressRightIcon2,
}: HeaderBackProps) => {
  const navigate = useNavigation<any>();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.HeaderBack, {paddingTop: insets.top}, style]}>
        <View style={[sty.flexRow, sty.itemsCenter]}>
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
              <TextComponent text={title} font={fontFamilies.bold} />
              {!!subTitle && <TextDisplay text={subTitle} color="#52585F" />}
            </View>
            <View style={[sty.flexRow,sty.gap_4]}>
              {RightIcon && <TouchableOpacity style={sty.pl_12} onPress={onPressRightIcon}>{RightIcon}</TouchableOpacity>}
              {RightIcon2 && <TouchableOpacity style={sty.pl_12} onPress={onPressRightIcon2}>{RightIcon2}</TouchableOpacity>}
            </View>
        </View>
         <View style={[styles.section]}>{section && section}</View>
    </View>
    
  );
};

export default HeaderBack;

const styles = StyleSheet.create({
  HeaderBack: {
    paddingRight: 16,
    flexDirection: 'column',
    
  },
  section: {
    paddingLeft: 18,
    marginTop: -2,
    paddingBottom: 4,
  },
});
