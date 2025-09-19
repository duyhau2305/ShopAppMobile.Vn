import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NotificationParams} from '../../../interfaces/notification';
import sty from '../../../themes/sty';
import {ButtonCustom, TextDisplay} from '../../../components';
import moment from 'moment';

interface NotificationTakeOffProps {
  data: NotificationParams;
}

const NotificationTakeOff = ({data}: NotificationTakeOffProps) => {
  console.log(data);
  return (
    <TouchableOpacity style={sty.gap_12}>
      <TextDisplay
        color="#181D27"
        text={`Đơn yêu cầu xin nghỉ ${
          data?.data?.type === 1 ? 'phép' : 'việc'
        } của bạn đã ${
          data?.data?.status === 2 ? 'được duyệt' : 'bị từ chối'
        }.`}
      />
      <View
        style={[sty.flexRow, sty.justifyBetween, sty.gap_12, sty.itemsCenter]}>
        <TextDisplay
          text="Thông tin chi tiết"
          fontWeight="bold"
          color="#181D27"
        />
        <ButtonCustom
          text={data?.data?.status === 2 ? 'Đã phê duyệt' : 'Đã từ chối'}
          onPress={undefined}
          disabled
          color={data?.data?.status === 2 ? '#1354D4' : '#FF4D4F'}
          backgroundColor={data?.data?.status === 2 ? '#DEE7F6' : '#FFDBDC'}
          fontSize={12}
          lineHeight={16}
          style={[sty.px_8, sty.py_4, sty.w_auto, sty.selfStart]}
        />
      </View>
      <TouchableOpacity
        style={[
          sty.gap_12,
          sty.border_1,
          sty.borderSecondPrimary,
          sty.rounded_12,
          sty.p_12,
        ]}>
        <View
          style={[
            sty.flexRow,
            sty.justifyBetween,
            sty.gap_12,
            sty.itemsCenter,
          ]}>
          <TextDisplay text="Ngày xin nghỉ:" color="#181D27" />
          <TextDisplay
            text={moment(data?.data?.date).format('DD/MM/YYYY')}
            color="#181D27"
            fontWeight="semibold"
          />
        </View>
        <View
          style={[
            sty.flexRow,
            sty.justifyBetween,
            sty.gap_12,
            sty.itemsCenter,
          ]}>
          <TextDisplay text="Lý do:" color="#181D27" />
          <TextDisplay
            text={data?.data?.description}
            color="#181D27"
            fontWeight="semibold"
          />
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default NotificationTakeOff;
