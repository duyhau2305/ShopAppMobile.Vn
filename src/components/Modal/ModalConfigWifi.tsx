import {
  StyleSheet,
  TouchableOpacity,
  Animated,
  PermissionsAndroid,
  Platform,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import TextDisplay from '../TextDisplay';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import ButtonCustom from '../Button/ButtonCustom';
import sty from '../../themes/sty';
import {Portal} from 'react-native-portalize';
import FormInputText from '../Form/FormInputText';
import HeaderBottomSheet from '../BottomSheet/HeaderBottomSheet';
import {
  setModalLoading,
  setModalSuccess,
  setToast,
} from '../../redux/slices/commonSlice';
import LoadingTable from '../LoadingTable';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {handleErrorMessage} from '../../utils/helpers';
import {NetworkInfo} from 'react-native-network-info';
import {sendConfigWifiAPI} from '../../apis/common';
import {setOpenSendWifi} from '../../redux/slices/sendWifiSlice';
const {height} = Dimensions.get('window');

const ModalConfigWifi = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const {open, type} = useAppSelector(state => state.sendWifi);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [bssid, setBssid] = useState<string>();
  const [ssid, setSsid] = useState<string>();
  const [IPAdress, setIPAddress] = useState<string>();

  useEffect(() => {
    if (open) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [fadeAnim, open]);

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

  const getWifiInfo = async () => {
    try {
      setLoading(true);
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        const bssidValue = await NetworkInfo.getBSSID();
        const ssidValue = await NetworkInfo.getSSID();
        const ip = await NetworkInfo.getIPAddress();
        if (!bssidValue || bssidValue === '00:00:00:00:00:00') {
          Alert.alert('Cảnh báo', 'Thiết bị chưa kết nối WiFi.');
        } else {
          setBssid(bssidValue as string);
          setSsid(ssidValue as string);
          setIPAddress(ip as string);
        }
      } else {
        Alert.alert('Cảnh báo', 'Bạn cần cấp quyền vị trí để lấy thông tin.');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleErrorMessage(
        error,
        undefined,
        'Có lỗi xảy ra khi truy cập thông tin Wifi. Bạn cần cấp quyền vị trí để lấy thông tin',
      );
    }
  };

  useEffect(() => {
    if (open) {
      getWifiInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleGetWifi = () => {
    getWifiInfo();
  };

  const handleSubmit = async () => {
    try {
      if (!ssid) {
        return dispatch(
          setToast({
            open: true,
            title: 'Tên Wifi là bắt buộc!',
          }),
        );
      }
      dispatch(setModalLoading(true));
      const res = await sendConfigWifiAPI(
        type === 'BSSID'
          ? {
              type: 'BSSID',
              ssid: ssid,
              bssid: bssid,
            }
          : {
              type: 'IP',
              ssid: ssid,
              ip: IPAdress,
            },
      );
      console.log(res);
      dispatch(setOpenSendWifi(false));
      dispatch(
        setModalSuccess({
          open: true,
          title: 'Gửi thông tin Wifi thành công.',
        }),
      );
      dispatch(setModalLoading(false));
    } catch (error) {
      dispatch(setModalLoading(false));
      handleErrorMessage(error);
    }
  };

  return (
    <Portal>
      <Animated.View style={[styles.Overlay, {opacity: fadeAnim}]}>
        <TouchableOpacity activeOpacity={1} style={styles.BackGroundModal}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={styles.ModalContainer}>
            <HeaderBottomSheet
              title="Thông tin Wifi chấm công"
              onClose={() => dispatch(setOpenSendWifi(false))}
            />
            <ScrollView contentContainerStyle={[sty.p_12, sty.gap_12]}>
              <TouchableOpacity
                activeOpacity={1}
                style={[sty.gap_12, sty.relative]}>
                <TextDisplay
                  text="Thông tin Wifi"
                  color="#181D27"
                  fontSize={16}
                  lineHeight={24}
                  fontWeight="bold"
                />
                <FormInputText
                  required
                  readOnly
                  label="Wifi"
                  value={ssid || ''}
                  onChangeText={undefined}
                />
                {type === 'BSSID' ? (
                  <FormInputText
                    required
                    readOnly
                    label="Mã BSSID"
                    value={bssid || ''}
                    onChangeText={undefined}
                  />
                ) : (
                  <FormInputText
                    required
                    readOnly
                    label="Mã IP"
                    value={IPAdress || ''}
                    onChangeText={undefined}
                  />
                )}
                {loading && <LoadingTable />}
              </TouchableOpacity>
              <ButtonCustom
                text="Lấy thông tin Wifi"
                style={sty.w_auto}
                onPress={handleGetWifi}
                backgroundColor="#DEE7F6"
                color="#1354D4"
              />
              <ButtonCustom
                text="Gửi thông tin Wifi"
                style={sty.w_auto}
                onPress={handleSubmit}
              />
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>
    </Portal>
  );
};

export default ModalConfigWifi;

const styles = StyleSheet.create({
  Overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BackGroundModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  ModalContainer: {
    maxWidth: '100%',
    borderRadius: 16,
    gap: 8,
    backgroundColor: '#fff',
    width: '100%',
    maxHeight: (height * 90) / 100,
  },
  IconSuccess: {
    width: 90,
    height: 90,
    objectFit: 'scale-down',
    alignSelf: 'center',
  },
});
