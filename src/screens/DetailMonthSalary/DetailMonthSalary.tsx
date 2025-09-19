import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  GradientBackground,
  HeaderBack,
  DividerCustom,
  TextDisplay,
} from '../../components';
import sty from '../../themes/sty';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IMAGES from '../../assets/images';
import {formatPrice} from '../../utils/helpers';
import {useRoute} from '@react-navigation/native';
import dayjs from 'dayjs';

const DetailMonthSalary = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const {salaryMonth, month} = route.params as any;
  return (
    <GradientBackground>
      <HeaderBack
        title={`Bảng lương tháng ${dayjs(month).month() + 1}/${dayjs(
          month,
        ).year()}`}
      />
      <DividerCustom styles={sty.mt_12} />
      <KeyboardAvoidingView
        style={sty.flex_1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity
          style={sty.flex_1}
          activeOpacity={1}
          onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={[
              sty.p_16,
              sty.gap_12,
              {paddingBottom: insets.bottom + 16},
            ]}
            showsVerticalScrollIndicator={false}>
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
                      text={`${formatPrice(
                        Number(salaryMonth?.net_salary || 0),
                      )} đ`}
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
              activeOpacity={1}
              style={[
                sty.gap_12,
                sty.border_1,
                sty.borderSecondPrimary,
                sty.rounded_12,
                sty.p_12,
              ]}>
              <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
                <TextDisplay text="Tổng số ca:" color="#181D27" />
                <TextDisplay
                  text={salaryMonth?.shifts?.length || 0}
                  color="#181D27"
                  textAlign="right"
                  fontWeight="semibold"
                />
              </View>
              {salaryMonth?.shifts?.map((shift: any, index: number) => (
                <View style={sty.gap_12} key={index}>
                  <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
                    <TextDisplay text={`Giờ ${shift?.name}:`} color="#181D27" />
                    <TextDisplay
                      text={Number(shift?.hours || 0)}
                      color="#181D27"
                      textAlign="right"
                      fontWeight="semibold"
                    />
                  </View>
                  <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
                    <TextDisplay
                      text={`Lương ${shift?.name}:`}
                      color="#181D27"
                    />
                    <TextDisplay
                      text={`${formatPrice(Number(shift?.salary))} đ`}
                      color="#181D27"
                      textAlign="right"
                      fontWeight="semibold"
                    />
                  </View>
                </View>
              ))}
              {salaryMonth?.employee_allowance?.map((allowance: any) => (
                <View
                  key={allowance?.id}
                  style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
                  <TextDisplay text={allowance?.content} color="#181D27" />
                  <TextDisplay
                    text={`${formatPrice(Number(allowance?.amount || 0))} đ`}
                    color="#181D27"
                    textAlign="right"
                    fontWeight="semibold"
                  />
                </View>
              ))}
              <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
                <TextDisplay text="Thưởng:" color="#181D27" />
                <TextDisplay
                  text={`${formatPrice(
                    Number(salaryMonth?.totalBonuses || 0),
                  )} đ`}
                  color="#48B723"
                  textAlign="right"
                  fontWeight="semibold"
                />
              </View>
              <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
                <TextDisplay text="Phạt:" color="#181D27" />
                <TextDisplay
                  text={`${formatPrice(
                    Number(salaryMonth?.totalFines || 0),
                  )} đ`}
                  color="#E85E5E"
                  textAlign="right"
                  fontWeight="semibold"
                />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

export default DetailMonthSalary;

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
});
