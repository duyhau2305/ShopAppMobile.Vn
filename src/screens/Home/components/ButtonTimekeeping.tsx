import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import IMAGES from '../../../assets/images';
import sty from '../../../themes/sty';
import {LoadingTable, TextDisplay} from '../../../components';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {useNavigation} from '@react-navigation/native';
import {HOME_ROUTES, ROOT_ROUTES} from '../../../routes';
import {authIOS} from '../../../utils/iosTouchID';
import {handleErrorMessage} from '../../../utils/helpers';
import {getAddressFromLonLat} from '../../../utils/nominatim';
import Geolocation from '@react-native-community/geolocation';
import {setToast} from '../../../redux/slices/commonSlice';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const ButtonTimekeeping = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigation<any>();
  const {status_check_in} = useAppSelector(state => state.timekeeping);
  const {role} = useAppSelector(state => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const requestLocationPermission = async () => {
    try {
      setLoading(true);
      if (Platform.OS === 'ios') {
        const status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (status === RESULTS.GRANTED) {
          return true;
        }
        const requestStatus = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );
        setLoading(false);
        return requestStatus === RESULTS.GRANTED;
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        setLoading(false);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (error) {
      setLoading(false);
      handleErrorMessage(
        error,
        undefined,
        'Có lỗi xảy ra khi truy cập vị trí. Bạn cần cấp quyền truy cập vị trí.',
      );
      return false;
    }
  };

  useEffect(() => {
    if (role?.role_id === 5) {
      requestLocationPermission();
    }
  }, [role?.role_id]);

  const handleCheckInEmployee = async () => {
    try {
      setLoadingButton(true);
      const position: any = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          pos => resolve(pos),
          err => reject(err),
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      });
      const {latitude, longitude} = position.coords;
      if (latitude && longitude) {
        const res = await getAddressFromLonLat(
          longitude as number,
          latitude as number,
        );
        navigate.navigate(ROOT_ROUTES.HOME_STACK, {
          screen: status_check_in
            ? HOME_ROUTES.CAMERA_CHECKOUT
            : HOME_ROUTES.CAMERA_CHECKIN,
          params: {
            location: res,
          },
        });
      } else {
        dispatch(
          setToast({
            open: true,
            title: 'Có lỗi xảy ra khi truy cập vị trí, vui lòng thử lại.',
          }),
        );
      }
      setLoadingButton(false);
    } catch (error) {
      handleErrorMessage(
        error,
        undefined,
        'Có lỗi xảy ra khi truy cập vị trí, vui lòng thử lại.',
      );
      setLoadingButton(false);
    }
  };

  const handleCheckInInternal = async () => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      const res = await authIOS('Xác thực để chấm công');
      setLoading(false);
      if (res.ok) {
        navigate.navigate(ROOT_ROUTES.HOME_STACK, {
          screen: status_check_in
            ? HOME_ROUTES.CHECK_OUT
            : HOME_ROUTES.CHECK_IN,
        });
      } else {
        switch (res.reason) {
          case 'ios_only':
          case 'min_version':
            Alert.alert('Chỉ hỗ trợ iOS 14+', 'Thiết bị không phù hợp.');
            break;
          case 'not_available':
            Alert.alert(
              'Không hỗ trợ',
              'Thiết bị không có/không bật FaceID/TouchID.',
            );
            break;
          case 'not_enrolled':
            Alert.alert(
              'Chưa thiết lập',
              'Hãy đăng ký FaceID/TouchID trong Cài đặt.',
            );
            break;
          case 'passcode_not_set':
            Alert.alert(
              'Thiếu passcode',
              'Hãy đặt mật mã thiết bị để bật sinh trắc học.',
            );
            break;
          case 'lockout':
            Alert.alert(
              'Bị khoá',
              'Thử sai nhiều lần. Đợi rồi thử lại hoặc mở khoá bằng mật mã.',
            );
            break;
          case 'user_cancel':
          case 'system_cancel':
            // im lặng hoặc toast nhẹ
            break;
          default:
            Alert.alert(
              'Xác thực thất bại',
              res.message ?? 'Vui lòng thử lại.',
            );
        }
      }
    } catch (error) {
      setLoading(false);
      handleErrorMessage(error);
    }
  };

  const handleCheckIn = async () => {
    if (role?.role_id === 5) {
      handleCheckInEmployee();
    } else {
      handleCheckInInternal();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleCheckIn}
      style={[
        styles.ButtonTimekeeping,
        status_check_in ? styles.BackgroundCheckOut : styles.BackgroundCheckIn,
      ]}>
      <Image
        style={[sty.w_48, sty.h_48, sty.objectScaleDown]}
        source={IMAGES.HOME.icon_timekeeping}
      />
      <View style={[sty.gap_4, sty.shrink_1]}>
        <TextDisplay
          text={status_check_in ? 'Check-out' : 'Check-in'}
          fontSize={16}
          lineHeight={24}
          fontWeight="bold"
          color="#fff"
        />
        <TextDisplay
          text={`để ${status_check_in ? 'hoàn thành' : 'bắt đầu'} công việc`}
          color="#fff"
        />
      </View>
      <Image
        style={styles.IconCheckout}
        source={
          status_check_in
            ? IMAGES.HOME.icon_checkout_arrow
            : IMAGES.HOME.icon_no_checkout_arrow
        }
      />
      {loadingButton && <LoadingTable />}
    </TouchableOpacity>
  );
};

export default ButtonTimekeeping;

const styles = StyleSheet.create({
  IconCheckout: {
    width: 44,
    height: 44,
    objectFit: 'scale-down',
    marginLeft: 'auto',
  },
  ButtonTimekeeping: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  BackgroundCheckIn: {
    backgroundColor: '#1354D4',
  },
  BackgroundCheckOut: {
    backgroundColor: '#fc910b',
  },
});
