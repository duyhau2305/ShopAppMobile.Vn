import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {GradientBackground, HeaderBack, DividerCustom} from '../../components';
import sty from '../../themes/sty';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import MonthSalary from './components/MonthSalary';
import WeekSalary from './components/WeekSalary';
import { appColors } from '../../constants/appColors';

const Worksheet = () => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <GradientBackground>
      <HeaderBack title="Bán hàng" style = {styles.HeaderBack} />
      <DividerCustom  />
      {/* <KeyboardAvoidingView
        style={sty.flex_1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity
          style={sty.flex_1}
          activeOpacity={1}
          onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={[
              sty.p_16,
              sty.gap_24,
              {paddingBottom: tabBarHeight + 24},
            ]}
            showsVerticalScrollIndicator={false}>
            <MonthSalary />
            <WeekSalary />
          </ScrollView>
        </TouchableOpacity>
      </KeyboardAvoidingView> */}
    </GradientBackground>
  );
};

export default Worksheet;

const styles = StyleSheet.create({
  HeaderBack: {
   backgroundColor: appColors.white,
   boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
  },
});