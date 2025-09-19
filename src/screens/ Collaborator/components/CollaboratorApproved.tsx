import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {CollaboratorParams} from '../../../interfaces/collaborator';
import sty from '../../../themes/sty';
import {useAppDispatch} from '../../../redux/hooks';
import {ButtonCustom, LoadingTable, TextDisplay} from '../../../components';
import dayjs from 'dayjs';
import IMAGES from '../../../assets/images';
import {Portal} from 'react-native-portalize';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
import {formatTime, handleErrorMessage} from '../../../utils/helpers';
import {setModalLoading} from '../../../redux/slices/commonSlice';
import {
  getSalaryTableWorkSchedulesAPI,
  getWorkSheetAPI,
} from '../../../apis/worksheet';
import NoData from '../../../components/NoData';

interface CollaboratorApprovedProps {
  data: CollaboratorParams;
}

const CollaboratorApproved = ({data}: CollaboratorApprovedProps) => {
  const dispatch = useAppDispatch();
  const [month, setMonth] = useState(new Date());
  const [date, setDate] = useState<any>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [salaryMonth, setSalaryMonth] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [listWorksheet, setListWorkSheet] = useState<any[]>([]);
  console.log('listWorksheet: ', listWorksheet);

  const onValueChange = (event: any, newDate: any) => {
    setShowPicker(false);
    if (event === 'dateSetAction' && newDate) {
      setMonth(newDate);
    }
  };

  const handleGetWorkSheet = useCallback(async () => {
    try {
      dispatch(setModalLoading(true));
      const res = await getWorkSheetAPI({
        from_date: dayjs(month).startOf('month').format('YYYY-MM-DD'),
        to_date: dayjs(month).endOf('month').format('YYYY-MM-DD'),
        id: data?.employee?.user_id,
      });
      setSalaryMonth(res?.data?.data?.[0]);
      dispatch(setModalLoading(false));
    } catch (error) {
      dispatch(setModalLoading(false));
      handleErrorMessage(error);
    }
  }, [data?.employee?.user_id, dispatch, month]);

  useEffect(() => {
    handleGetWorkSheet();
  }, [handleGetWorkSheet]);

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
        id: data?.employee?.user_id,
      });
      setListWorkSheet(res?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleErrorMessage(error);
    }
  }, [data?.employee?.user_id, date]);

  useEffect(() => {
    handleGetSalaryTableWorkSchedulesAPI();
  }, [handleGetSalaryTableWorkSchedulesAPI]);

  return (
    <TouchableOpacity activeOpacity={1} style={sty.gap_12}>
      <View style={[sty.flexRow, sty.justifyBetween, sty.itemsCenter]}>
        <TextDisplay
          text="Thống kê"
          color="#181D27"
          fontWeight="semibold"
          fontSize={16}
          lineHeight={24}
        />
        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          style={[sty.flexRow, sty.itemsCenter, sty.gap_4]}>
          <TextDisplay
            text={`Tháng ${dayjs(month).month() + 1} năm ${dayjs(
              month,
            ).year()}`}
            color="#1354D4"
            fontWeight="semibold"
          />
          <Image
            source={IMAGES.WORK_SHEET.icon_dropdown_month}
            style={[sty.w_20, sty.h_20, sty.objectScaleDown]}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          sty.border_1,
          sty.borderSecondPrimary,
          sty.rounded_12,
          sty.p_16,
          sty.justifyStart,
          sty.gap_16,
          sty.itemsCenter,
          sty.selfCenter,
        ]}>
        <Image
          source={IMAGES.WORK_SHEET.icon_total_hour}
          style={styles.IconButton}
        />
        <View>
          <TextDisplay
            text="Tổng giờ làm việc"
            color="#181D27"
            fontWeight="semibold"
            textAlign="center"
          />
          <TextDisplay
            text={`${Number(salaryMonth?.total_hours || 0)} giờ`}
            color="#1354D4"
            fontWeight="bold"
            fontSize={16}
            lineHeight={24}
            textAlign="center"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          sty.border_1,
          sty.borderSecondPrimary,
          sty.rounded_12,
          sty.p_12,
          sty.gap_12,
        ]}>
        <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
          <TextDisplay text="Tổng số ca:" color="#181D27" />
          <TextDisplay text={salaryMonth?.shifts?.length} color="#181D27" />
        </View>
        {salaryMonth?.shifts?.map((shift: any) => (
          <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
            <TextDisplay text={`Giờ ca ${shift?.name}:`} color="#181D27" />
            <TextDisplay text={shift?.hours} color="#181D27" />
          </View>
        ))}
      </TouchableOpacity>
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
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <NoData />
        )}
        {loading && <LoadingTable />}
      </TouchableOpacity>
      {showPicker && (
        <Portal>
          <TouchableOpacity activeOpacity={1} style={styles.Overlay}>
            <MonthPicker
              okButton="Xác nhận"
              cancelButton="Huỷ"
              onChange={onValueChange}
              value={month}
              locale="vi"
            />
          </TouchableOpacity>
        </Portal>
      )}
    </TouchableOpacity>
  );
};

export default CollaboratorApproved;

const styles = StyleSheet.create({
  Overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
  },
  IconButton: {
    width: 60,
    height: 60,
    objectFit: 'scale-down',
  },
  ButtonWeek: {
    backgroundColor: '#EAF3FF',
    padding: 8,
    borderRadius: 8,
  },
});
