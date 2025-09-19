import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IMAGES from '../../../assets/images';
import {ButtonCustom, TextDisplay} from '../../../components';
import sty from '../../../themes/sty';
import {CollaboratorParams} from '../../../interfaces/collaborator';

interface HeaderInfoCollaboratorProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  data: CollaboratorParams;
}

const HeaderInfoCollaborator = ({
  title,
  style,
  data,
}: HeaderInfoCollaboratorProps) => {
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
          source={IMAGES.COMMON.icon_back_screen}
        />
      </TouchableOpacity>
      <View style={[sty.shrink_1, sty.grow_1, sty.gap_4]}>
        <TextDisplay
          text={title || ''}
          fontSize={18}
          lineHeight={24}
          color="#212326"
          fontWeight="bold"
        />
        <ButtonCustom
          text={
            data?.status === 1
              ? 'Chờ phê duyệt'
              : data?.employee?.status === 0
              ? 'Nghỉ việc'
              : 'Đang làm việc'
          }
          onPress={undefined}
          disabled
          color={
            data?.status === 1
              ? '#F2B71D'
              : data?.employee?.status === 0
              ? '#7B7B7B'
              : '#1354D4'
          }
          backgroundColor={
            data?.status === 1
              ? '#FDE9CE'
              : data?.employee?.status === 0
              ? '#E8E8E8'
              : '#D8E5FF'
          }
          fontSize={12}
          lineHeight={16}
          style={[sty.px_8, sty.py_4, sty.w_auto, sty.selfStart]}
        />
      </View>
    </View>
  );
};

export default HeaderInfoCollaborator;

const styles = StyleSheet.create({
  HeaderBack: {
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Pending: {
    backgroundColor: '#FDE9CE',
  },
  Off: {
    backgroundColor: '#E8E8E8',
  },
  Working: {
    backgroundColor: '#D8E5FF',
  },
});
