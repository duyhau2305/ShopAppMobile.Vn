import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import sty from '../../../themes/sty';
import {ButtonCustom, TextDisplay} from '../../../components';
import {TakeOffParams} from '../../../interfaces/takeOff';
import {LIST_STATUS_TAKE_OFF} from '../../../common/constants';
import moment from 'moment';

interface OffItemProps {
  data: TakeOffParams;
}

const OffItem = ({data}: OffItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        sty.gap_12,
        sty.p_12,
        sty.rounded_16,
        sty.border_1,
        sty.borderSecondPrimary,
      ]}>
      <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
        <TextDisplay
          text={data?.name}
          color="#181D27"
          fontSize={16}
          lineHeight={24}
          fontWeight="bold"
        />
        <ButtonCustom
          text={
            LIST_STATUS_TAKE_OFF?.find(item => item?.status === data?.status)
              ?.label as string
          }
          onPress={undefined}
          disabled
          color={
            LIST_STATUS_TAKE_OFF?.find(item => item?.status === data?.status)
              ?.color
          }
          backgroundColor={
            LIST_STATUS_TAKE_OFF?.find(item => item?.status === data?.status)
              ?.background
          }
          fontSize={12}
          lineHeight={16}
          style={[
            sty.px_8,
            sty.py_4,
            sty.w_auto,
            sty.selfStart,
            sty.rounded_12,
          ]}
        />
      </View>
      <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
        <TextDisplay text="Ngày xin nghỉ:" color="#535862" />
        <TextDisplay
          text={moment(data?.date).format('DD/MM/YYYY')}
          color="#181D27"
          fontWeight="semibold"
          textAlign="right"
        />
      </View>
      <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
        <TextDisplay text="Lý do:" color="#535862" />
        <TextDisplay
          text={data?.description}
          color="#181D27"
          fontWeight="semibold"
          textAlign="right"
        />
      </View>
    </TouchableOpacity>
  );
};

export default OffItem;
