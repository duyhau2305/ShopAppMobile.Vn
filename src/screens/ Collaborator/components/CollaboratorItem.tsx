import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import sty from '../../../themes/sty';
import {ButtonCustom, TextDisplay} from '../../../components';
import {CollaboratorParams} from '../../../interfaces/collaborator';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {HOME_ROUTES, ROOT_ROUTES} from '../../../routes';

interface CollaboratorItemProps {
  data: CollaboratorParams;
}

const CollaboratorItem = ({data}: CollaboratorItemProps) => {
  const navigate = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigate.navigate(ROOT_ROUTES.HOME_STACK, {
          screen: HOME_ROUTES.INFO_COLLABORATOR,
          params: {data},
        })
      }
      style={[
        sty.gap_12,
        sty.border_1,
        sty.borderSecondPrimary,
        sty.rounded_12,
        sty.p_12,
      ]}>
      <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
        <TextDisplay
          text={data?.employee?.full_name}
          color="#181D27"
          fontWeight="bold"
          fontSize={16}
          lineHeight={24}
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
      <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
        <TextDisplay text="Số điện thoại:" color="#535862" />
        <TextDisplay
          text={data?.employee?.phone_number}
          color="#181D27"
          fontWeight="semibold"
          textAlign="right"
        />
      </View>
      <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
        <TextDisplay text="Ngày tạo:" color="#535862" />
        <TextDisplay
          text={moment(data?.employee?.created_at).format('DD/MM/YYYY')}
          color="#181D27"
          fontWeight="semibold"
          textAlign="right"
        />
      </View>
    </TouchableOpacity>
  );
};

export default CollaboratorItem;
