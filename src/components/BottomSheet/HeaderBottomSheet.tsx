import {
  Image,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import sty from '../../themes/sty';
import TextDisplay from '../TextDisplay';
import DividerCustom from '../DividerCustom';
import IMAGES from '../../assets/images';

interface HeaderBottomSheetProps {
  title: string;
  onClose: any;
  hiddenClose?: boolean;
  style?: StyleProp<ViewStyle>;
}

const HeaderBottomSheet = ({
  title,
  onClose,
  hiddenClose,
  style,
}: HeaderBottomSheetProps) => {
  return (
    <View style={style}>
      <View style={[sty.relative, sty.py_16, sty.flexRow, sty.justifyCenter]}>
        <TextDisplay
          text={title}
          fontWeight="bold"
          color="#181D27"
          fontSize={16}
          lineHeight={24}
        />
        {!hiddenClose && (
          <TouchableOpacity
            style={[sty.absolute, sty.right_0, sty.top_0, sty.p_16]}
            onPress={onClose}
          >
            <Image
              source={IMAGES.COMMON.icon_close_sheet}
              style={[sty.w_24, sty.h_24, sty.objectScaleDown]}
            />
          </TouchableOpacity>
        )}
      </View>
      <DividerCustom />
    </View>
  );
};

export default HeaderBottomSheet;
