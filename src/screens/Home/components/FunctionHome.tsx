import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import sty from '../../../themes/sty';
import IMAGES from '../../../assets/images';
import {LoadingTable, TextDisplay} from '../../../components';
import {formatPrice, handleErrorMessage} from '../../../utils/helpers';
import {useAppSelector} from '../../../redux/hooks';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {HOME_ROUTES, ROOT_ROUTES} from '../../../routes';
import dayjs from 'dayjs';
import {getWorkSheetAPI} from '../../../apis/worksheet';
import {SalaryMonth} from '../../../interfaces/worksheet';

const FunctionHome = () => {
  const navigate = useNavigation<any>();
  const {role} = useAppSelector(state => state.auth);
  const [salaryMonth, setSalaryMonth] = useState<SalaryMonth>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetWorkSheet = useCallback(async () => {
    try {
      if (role?.role_id === 5) {
        setLoading(true);
        const res = await getWorkSheetAPI({
          from_date: dayjs(new Date()).startOf('month').format('YYYY-MM-DD'),
          to_date: dayjs(new Date()).endOf('month').format('YYYY-MM-DD'),
        });
        setSalaryMonth(res?.data?.data?.[0]);
        setLoading(false);
      }
    } catch (error) {
      handleErrorMessage(error);
      setLoading(false);
    }
  }, [role?.role_id]);

  useFocusEffect(
    useCallback(() => {
      handleGetWorkSheet();
    }, [handleGetWorkSheet]),
  );

  return role?.role_id === 5 ? (
    <View style={styles.FormDouble}>
      <View style={styles.FormDoubleItem}>
        <TouchableOpacity
          style={[
            sty.border_1,
            sty.borderSecondPrimary,
            sty.rounded_12,
            sty.p_12,
            sty.flexRow,
            sty.gap_12,
            sty.itemsCenter,
            sty.grow_1,
          ]}>
          <Image
            source={IMAGES.HOME.icon_total_salary}
            style={styles.IconFunction}
          />
          <View>
            <TextDisplay
              text="Tổng lương"
              color="#393D42"
              fontWeight="semibold"
            />
            <TextDisplay
              text={`${formatPrice(Number(salaryMonth?.net_salary || 0))} đ`}
              color="#1354D4"
              fontWeight="bold"
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.FormDoubleItem}>
        <TouchableOpacity
          style={[
            sty.border_1,
            sty.borderSecondPrimary,
            sty.rounded_12,
            sty.p_12,
            sty.flexRow,
            sty.gap_12,
            sty.itemsCenter,
            sty.grow_1,
          ]}>
          <Image
            source={IMAGES.HOME.hours_working}
            style={styles.IconFunction}
          />
          <View>
            <TextDisplay
              text="Số giờ đã làm"
              color="#393D42"
              fontWeight="semibold"
            />
            <TextDisplay
              text={`${Number(salaryMonth?.total_hours || 0)} giờ`}
              color="#1354D4"
              fontWeight="bold"
            />
          </View>
        </TouchableOpacity>
      </View>
      {loading && <LoadingTable />}
    </View>
  ) : (
    <TouchableOpacity
      onPress={() =>
        navigate.navigate(ROOT_ROUTES.HOME_STACK, {
          screen: HOME_ROUTES.SCAN_QR,
        })
      }
      style={[
        sty.border_1,
        sty.borderSecondPrimary,
        sty.rounded_12,
        sty.p_12,
        sty.flexRow,
        sty.gap_12,
        sty.itemsCenter,
        sty.grow_1,
      ]}>
      <Image
        source={IMAGES.HOME.icon_help_timekeeping}
        style={styles.IconFunction}
      />
      <TextDisplay
        text="Chấm công cho công nhân"
        color="#1354D4"
        fontWeight="semibold"
      />
    </TouchableOpacity>
  );
};

export default FunctionHome;

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
  IconFunction: {
    width: 28,
    height: 28,
    objectFit: 'scale-down',
  },
});
