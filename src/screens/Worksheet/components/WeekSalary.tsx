import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import sty from '../../../themes/sty';
import IMAGES from '../../../assets/images';
import {ButtonCustom, LoadingTable, TextDisplay} from '../../../components';
import moment from 'moment';
import 'moment/locale/vi';
import {
  formatPrice,
  formatTime,
  handleErrorMessage,
} from '../../../utils/helpers';
import {getSalaryTableWorkSchedulesAPI} from '../../../apis/worksheet';
import NoData from '../../../components/NoData';
import {useFocusEffect} from '@react-navigation/native';

moment.locale('vi');

const WeekSalary = () => {
  const [date, setDate] = useState<any>(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [listWorksheet, setListWorkSheet] = useState<any[]>([]);

  const getWeekLabel = () => {
    const now = moment();
    const selected = moment(date);
    if (now.week() === selected.week() && now.year() === selected.year()) {
      return 'Tuần này';
    } else {
      return `Tuần ${selected.week()}`;
    }
  };

  const handleGetSalaryTableWorkSchedulesAPI = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getSalaryTableWorkSchedulesAPI({
        from_date: moment(date).clone().startOf('isoWeek').format('YYYY/MM/DD'),
        to_date: moment(date).clone().endOf('isoWeek').format('YYYY/MM/DD'),
      });
      setListWorkSheet(res?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleErrorMessage(error);
    }
  }, [date]);

  useFocusEffect(
    useCallback(() => {
      handleGetSalaryTableWorkSchedulesAPI();
    }, [handleGetSalaryTableWorkSchedulesAPI]),
  );
  return (
    <View style={[sty.gap_20, sty.relative]}>
      <View
        style={[sty.flexRow, sty.justifyBetween, sty.itemsCenter, sty.gap_12]}>
        <TouchableOpacity
          onPress={() => setDate(moment(date).subtract(1, 'weeks'))}
          style={styles.ButtonWeek}>
          <Image
            source={IMAGES.WORK_SHEET.icon_prev_week}
            style={[sty.w_20, sty.h_20, sty.objectScaleDown]}
          />
        </TouchableOpacity>
        <TextDisplay
          text={`${getWeekLabel()}: ${moment(date)
            .clone()
            .startOf('isoWeek')
            .format('DD/MM/YYYY')} - ${moment(date)
            .clone()
            .endOf('isoWeek')
            .format('DD/MM/YYYY')}`}
          color="#181D27"
          textAlign="center"
          fontWeight="semibold"
        />
        <TouchableOpacity
          onPress={() => setDate(moment(date).add(1, 'weeks'))}
          style={styles.ButtonWeek}>
          <Image
            source={IMAGES.WORK_SHEET.icon_next_week}
            style={[sty.w_20, sty.h_20, sty.objectScaleDown]}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={sty.gap_12}>
        {listWorksheet?.length > 0 ? (
          listWorksheet?.map((work, index) => (
            <TouchableOpacity
              key={index}
              style={[
                sty.gap_12,
                sty.p_12,
                sty.rounded_12,
                sty.border_1,
                sty.borderSecondPrimary,
              ]}>
              <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
                <TextDisplay
                  text={moment(work?.date)
                    .format('dddd, DD/MM/YYYY')
                    .replace(/^./, str => str.toUpperCase())}
                  color="#444A55"
                />
                <View style={[sty.flexRow, sty.itemsCenter, sty.gap_4]}>
                  <Image
                    source={IMAGES.FORM.icon_oclock}
                    style={[sty.w_16, sty.h_16, sty.objectScaleDown]}
                  />
                  <TextDisplay
                    text={`${Number(work?.hours)}h`}
                    color="#444A55"
                  />
                </View>
              </View>
              <TextDisplay
                text={`${work?.name} (${formatTime(
                  work?.start_time,
                )} - ${formatTime(work?.end_time)})`}
                color="#181D27"
                fontWeight="bold"
                lineHeight={24}
                fontSize={16}
              />
              <View
                style={[
                  sty.flexRow,
                  sty.justifyBetween,
                  sty.gap_12,
                  sty.itemsCenter,
                ]}>
                <ButtonCustom
                  text={`${formatTime(work?.checkin_time)} - ${
                    work?.checkout_time
                      ? formatTime(work?.checkout_time)
                      : 'N/A'
                  }`}
                  color="#37B046"
                  onPress={undefined}
                  disabled
                  style={[sty.w_auto, sty.selfStart, sty.py_4]}
                  fontSize={14}
                  lineHeight={20}
                  backgroundColor="#D5F5E3"
                  fontWeight="semibold"
                />
                <View style={[sty.flexRow, sty.itemsCenter, sty.gap_4]}>
                  <Image
                    source={IMAGES.WORK_SHEET.icon_dollars}
                    style={[sty.w_16, sty.h_16, sty.objectScaleDown]}
                  />
                  <TextDisplay
                    text={`${formatPrice(Number(work?.salary))} đ`}
                    color="#37B046"
                    fontWeight="semibold"
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <NoData />
        )}
      </TouchableOpacity>
      {loading && <LoadingTable />}
    </View>
  );
};

export default WeekSalary;

const styles = StyleSheet.create({
  ButtonWeek: {
    backgroundColor: '#EAF3FF',
    padding: 8,
    borderRadius: 8,
  },
});
