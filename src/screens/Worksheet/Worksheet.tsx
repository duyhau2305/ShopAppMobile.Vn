import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {GradientBackground, HeaderBack, DividerCustom} from '../../components';
import sty from '../../themes/sty';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import MonthSalary from './components/MonthSalary';
import WeekSalary from './components/WeekSalary';

const Worksheet = () => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <GradientBackground>
      <HeaderBack title="Bảng công" />
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
              sty.gap_24,
              {paddingBottom: tabBarHeight + 24},
            ]}
            showsVerticalScrollIndicator={false}>
            <MonthSalary />
            <WeekSalary />
          </ScrollView>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

export default Worksheet;
