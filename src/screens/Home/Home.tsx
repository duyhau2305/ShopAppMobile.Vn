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
import React, {useCallback} from 'react';
import {DividerCustom, GradientBackground, TextDisplay} from '../../components';
import HeaderHome from './components/HeaderHome';
import ButtonTimekeeping from './components/ButtonTimekeeping';
import sty from '../../themes/sty';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import FunctionHome from './components/FunctionHome';
import CarouselHome from './components/CarouselHome';
import {
  addMinutesToDateTime,
  formatTime,
  handleErrorMessage,
} from '../../utils/helpers';
import {getListInfoConfigAPI} from '../../apis/info';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setInfoState} from '../../redux/slices/infoSlice';
import {useFocusEffect} from '@react-navigation/native';
import {getCheckInEmployeeAPI, getCheckInInternalAPI} from '../../apis/auth';
import {
  setShiftTimekeeping,
  setStatusTimekeeping,
} from '../../redux/slices/timekeepingSlice';
import {clearTimer, startCountdown} from '../../redux/slices/timerSlice';
import MenuHome from './components/MenuHome';
import IMAGES from '../../assets/images';
import DisplayNameComponent from './components/DisplayNameComponent';
import DisplayTimeKeeping from './components/DisplayTimeKeeping';
import { UtilityAppComponent } from '../../components';
import { appColors } from '../../constants/appColors';
import { LIST_UTILITY_APP } from '../../utils/utility';

const Home = () => {
  const dispatch = useAppDispatch();
  // const tabBarHeight = useBottomTabBarHeight();
  // const {role, employee} = useAppSelector(state => state.auth);

  // const handleGetInfo = useCallback(async () => {
  //   try {
  //     const res = await getListInfoConfigAPI();
  //     dispatch(setInfoState(res?.data?.data));
  //   } catch (error) {
  //     handleErrorMessage(error);
  //   }
  // }, [dispatch]);

  // const handleGetCheckIn = useCallback(async () => {
  //   try {
  //     if (role?.role_id === 5) {
  //       const res = await getCheckInEmployeeAPI();
  //       console.log('Get Check In Employee: ', res);
  //       dispatch(setStatusTimekeeping(res?.data?.data?.status_check_in));
  //     } else {
  //       const res = await getCheckInInternalAPI();
  //       console.log('Get Check In Internal: ', res);
  //       dispatch(setStatusTimekeeping(res?.data?.data?.status_check_in));
  //       if (res?.data?.data?.status_check_in) {
  //         dispatch(setShiftTimekeeping(res?.data?.data?.shift));
  //         dispatch(
  //           startCountdown(
  //             addMinutesToDateTime(
  //               `${formatTime(res?.data?.data?.shift?.time_end)} ${
  //                 res?.data?.data?.working_date
  //               }`,
  //               Number(res?.data?.data?.shift?.check_out_input || 0),
  //             ),
  //           ),
  //         );
  //       } else {
  //         dispatch(clearTimer());
  //       }
  //     }
  //   } catch (error) {
  //     handleErrorMessage(error);
  //   }
  // }, [dispatch, role?.role_id]);

  // useFocusEffect(
  //   useCallback(() => {
  //     handleGetCheckIn();
  //     handleGetInfo();
  //   }, [handleGetInfo, handleGetCheckIn]),
  // );

  return (
    <GradientBackground >
      <HeaderHome />
      {/* <DividerCustom styles={sty.mt_12} /> */}
      <KeyboardAvoidingView
        
        style={[sty.flex_1, {backgroundColor: appColors.bg_main}, sty.p_16,sty.gap_16]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <DisplayNameComponent />
          <DisplayTimeKeeping />
          <UtilityAppComponent onPress={() => {}} itemRow={4} utilityApp={LIST_UTILITY_APP} stylesProps={styles.UtilityAppComponent} />
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  AvatarImage: {
    width: 60,
    height: 60,
    objectFit: 'scale-down',
  },
  UtilityAppComponent: {
    marginTop: 16,
  },
});
