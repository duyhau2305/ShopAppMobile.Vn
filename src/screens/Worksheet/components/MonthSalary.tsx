import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import sty from '../../../themes/sty';
import {TextDisplay} from '../../../components';
import IMAGES from '../../../assets/images';
import {formatPrice, handleErrorMessage} from '../../../utils/helpers';
import MonthPicker from 'react-native-month-year-picker';
import {Portal} from 'react-native-portalize';
import dayjs from 'dayjs';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ROOT_ROUTES, WORKSHEET_ROUTES} from '../../../routes';
import {useAppDispatch} from '../../../redux/hooks';
import {setModalLoading} from '../../../redux/slices/commonSlice';
import {getWorkSheetAPI} from '../../../apis/worksheet';
import {SalaryMonth} from '../../../interfaces/worksheet';

const MonthSalary = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigation<any>();
  const [month, setMonth] = useState(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [salaryMonth, setSalaryMonth] = useState<SalaryMonth>();

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
      });
      setSalaryMonth(res?.data?.data?.[0]);
      dispatch(setModalLoading(false));
    } catch (error) {
      dispatch(setModalLoading(false));
      handleErrorMessage(error);
    }
  }, [dispatch, month]);

  useFocusEffect(
    useCallback(() => {
      handleGetWorkSheet();
    }, [handleGetWorkSheet]),
  );

  return (
    <TouchableOpacity activeOpacity={1} style={sty.gap_20}>
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
      <View style={styles.FormDouble}>
        <View style={styles.FormDoubleItem}>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              sty.border_1,
              sty.borderSecondPrimary,
              sty.rounded_12,
              sty.p_12,
              sty.justifyStart,
              sty.w_full,
              sty.gap_16,
              sty.itemsCenter,
            ]}>
            <Image
              source={IMAGES.WORK_SHEET.icon_total_salary}
              style={styles.IconButton}
            />
            <View>
              <TextDisplay
                text="Tổng lương"
                color="#181D27"
                fontWeight="semibold"
                textAlign="center"
              />
              <TextDisplay
                text={`${formatPrice(Number(salaryMonth?.net_salary || 0))} đ`}
                color="#37B046"
                fontWeight="bold"
                fontSize={16}
                lineHeight={24}
                textAlign="center"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.FormDoubleItem}>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              sty.border_1,
              sty.borderSecondPrimary,
              sty.rounded_12,
              sty.p_12,
              sty.justifyStart,
              sty.w_full,
              sty.gap_16,
              sty.itemsCenter,
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
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigate.navigate(ROOT_ROUTES.WORKSHEET_STACK, {
            screen: WORKSHEET_ROUTES.DETAIL_MONTH_SALARY,
            params: {
              salaryMonth,
              month,
            },
          })
        }
        style={sty.selfCenter}>
        <TextDisplay
          text="Xem chi tiết bảng lương"
          styles={sty.underline}
          color="#1354D4"
          fontWeight="semibold"
          fontSize={16}
          lineHeight={24}
        />
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

export default MonthSalary;

const styles = StyleSheet.create({
  FormDouble: {
    marginHorizontal: -6,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  FormDoubleItem: {
    paddingHorizontal: 6,
    flexBasis: '50%',
    flexGrow: 0,
    flexShrink: 0,
    flexDirection: 'row',
  },
  IconButton: {
    width: 60,
    height: 60,
    objectFit: 'scale-down',
  },
  Overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
  },
});
