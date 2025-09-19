import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  GradientBackground,
  HeaderBack,
  DividerCustom,
  ButtonCustom,
  FormInputText,
  TextDisplay,
  ButtonAddFloat,
  LoadingTable,
} from '../../components';
import {useAppDispatch} from '../../redux/hooks';
import sty from '../../themes/sty';
import stylesComponent from '../../themes/styComponents';
import {
  setModalLoading,
  setModalSuccess,
  setToast,
} from '../../redux/slices/commonSlice';
import {handleErrorMessage} from '../../utils/helpers';
import IMAGES from '../../assets/images';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {NetworkInfo} from 'react-native-network-info';
import {FONT_FAMILY} from '../../themes/fontFamily';
import {ItemWifiParams} from '../../interfaces/configWifi';
import moment from 'moment';
import SegmentTypeWifi from './components/SegmentTypeWifi';
import {updateConfigWifiAPI} from '../../apis/configWifi';
import ToggleSwitch from 'toggle-switch-react-native';

const InfoConfigWifi = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const {data, handleGetListConfigWifi} = route.params as any;
  const [loading, setLoading] = useState<boolean>(false);
  const [listWifi, setListWifi] = useState<ItemWifiParams[]>([]);

  useEffect(() => {
    setListWifi(data?.wifi_locations);
  }, [data.id, data?.wifi_locations]);

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
  const getWifiBSSID = async () => {
    try {
      setLoading(true);
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        const bssid = await NetworkInfo.getBSSID();
        setLoading(false);
        return bssid;
      } else {
        Alert.alert('Cảnh báo', 'Bạn cần cấp quyền vị trí để lấy thông tin.');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleErrorMessage(error);
    }
  };
  const getWifiSSID = async () => {
    try {
      setLoading(true);
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        const ssid = await NetworkInfo.getSSID();
        setLoading(false);
        return ssid;
      } else {
        Alert.alert('Cảnh báo', 'Bạn cần cấp quyền vị trí để lấy thông tin.');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleErrorMessage(error);
    }
  };
  const getIPAddressWifi = async () => {
    try {
      setLoading(true);
      const ip = await NetworkInfo.getIPAddress();
      setLoading(false);
      return ip;
    } catch (error) {
      handleErrorMessage(error);
      setLoading(false);
    }
  };

  const handleGetWifiInfo = async (wifi: ItemWifiParams) => {
    const bssid = await getWifiBSSID();
    const ssid = await getWifiSSID();
    const ip = await getIPAddressWifi();
    if (bssid && ssid && ip) {
      setListWifi(
        listWifi?.map(item =>
          item?.id === wifi?.id
            ? {
                ...item,
                bssid_ip: item?.type === 'BSSID' ? bssid : ip,
                ssid: ssid,
              }
            : item,
        ),
      );
    } else {
      dispatch(
        setToast({
          open: true,
          title: 'Lấy thông tin Wifi thất bại',
        }),
      );
    }
  };

  const handleSubmit = async () => {
    try {
      dispatch(setModalLoading(true));
      await updateConfigWifiAPI({
        client_id: data?.id,
        Wifi: listWifi?.map(wifi => ({
          type: wifi?.type,
          ssid: wifi?.ssid,
          bssid: wifi?.bssid_ip,
          client_id: data?.id,
          is_active: !!wifi?.is_active,
        })),
      });
      handleGetListConfigWifi();
      navigate.goBack();
      dispatch(
        setModalSuccess({
          open: true,
          title: 'Cập nhật thành công.',
        }),
      );
      dispatch(setModalLoading(false));
    } catch (error) {
      dispatch(setModalLoading(false));
      handleErrorMessage(error);
    }
  };
  return (
    <GradientBackground>
      <HeaderBack title="Chi tiết cấu hình chấm công" />
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
              {paddingBottom: insets.bottom + 160},
            ]}
            showsVerticalScrollIndicator={false}>
            <FormInputText
              readOnly
              label="Tên khách hàng"
              value={data?.name}
              onChangeText={undefined}
            />
            <FormInputText
              readOnly
              label="Địa chỉ"
              value={data?.address}
              onChangeText={undefined}
            />
            <TouchableOpacity activeOpacity={1} style={styles.Note}>
              <Image
                style={[sty.w_20, sty.h_20, sty.objectScaleDown]}
                source={IMAGES.PROFILE.icon_note_config_wifi}
              />
              <TextDisplay
                color="#F79009"
                textAlign="justify"
                text="Mỗi điểm bán hàng sẽ sử dụng ít nhất 1 Wifi để chấm công. Vui lòng kết nối điện thoại của bạn vào Wifi muốn sử dụng để chấm công, sau đó ấn nút lấy thông tin Wifi và Lưu lại."
              />
            </TouchableOpacity>
            {listWifi?.map((wifi, index: number) => (
              <TouchableOpacity
                key={wifi?.id}
                activeOpacity={1}
                style={[
                  sty.bg_white,
                  sty.rounded_12,
                  sty.p_12,
                  sty.gap_8,
                  sty.relative,
                  sty.border_1,
                  sty.borderSecondPrimary,
                ]}>
                <View
                  style={[sty.flexRow, sty.justifyBetween, sty.itemsCenter]}>
                  <TextDisplay
                    text={`Thông tin wifi ${index + 1}`}
                    color="#393e42"
                    fontWeight="semibold"
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setListWifi(
                        listWifi?.filter(item => item?.id !== wifi?.id),
                      )
                    }>
                    <Image
                      source={IMAGES.COMMON.icon_close_sheet}
                      style={[sty.w_20, sty.h_20, sty.objectScaleDown]}
                    />
                  </TouchableOpacity>
                </View>
                <SegmentTypeWifi
                  type={wifi?.type}
                  setType={value =>
                    setListWifi(
                      listWifi?.map(item =>
                        item?.id === wifi?.id ? {...item, type: value} : item,
                      ),
                    )
                  }
                />
                <FormInputText
                  label="Tên Wifi (SSID)"
                  value={wifi?.ssid}
                  onChangeText={(value: string) =>
                    setListWifi(
                      listWifi?.map(item =>
                        item?.id === wifi?.id ? {...item, ssid: value} : item,
                      ),
                    )
                  }
                />
                <FormInputText
                  label="BSSID/IP"
                  value={wifi?.bssid_ip}
                  onChangeText={(value: string) =>
                    setListWifi(
                      listWifi?.map(item =>
                        item?.id === wifi?.id
                          ? {...item, bssid_ip: value}
                          : item,
                      ),
                    )
                  }
                />
                <View
                  style={[
                    sty.flexRow,
                    sty.itemsCenter,
                    sty.justifyBetween,
                    sty.gap_8,
                  ]}>
                  <TextDisplay
                    color="#393d42"
                    fontWeight="semibold"
                    text="Trạng thái"
                    fontSize={16}
                    lineHeight={24}
                  />
                  <ToggleSwitch
                    isOn={!!wifi?.is_active}
                    onColor="#1354D4"
                    offColor="#b6bfca"
                    size="medium"
                    onToggle={() =>
                      setListWifi(
                        listWifi?.map(item =>
                          item?.id === wifi?.id
                            ? {
                                ...item,
                                is_active: item?.is_active === 1 ? 0 : 1,
                              }
                            : item,
                        ),
                      )
                    }
                  />
                </View>
                <ButtonCustom
                  color="#1354D4"
                  backgroundColor="#DEE7F6"
                  text={`Lấy thông tin wifi ${index + 1}`}
                  onPress={() => handleGetWifiInfo(wifi)}
                />
                {loading && <LoadingTable />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View
        style={[stylesComponent.Footer, {paddingBottom: insets.bottom + 8}]}>
        <ButtonCustom text="Lưu lại" onPress={handleSubmit} />
      </View>
      <ButtonAddFloat
        onPress={() =>
          setListWifi([
            ...listWifi,
            {
              id: moment().unix(),
              bssid_ip: '',
              ssid: '',
              type: 'BSSID',
              is_active: 1,
            },
          ])
        }
        icon={IMAGES.PROFILE.icon_config_wifi}
      />
    </GradientBackground>
  );
};

export default InfoConfigWifi;

const styles = StyleSheet.create({
  Note: {
    backgroundColor: '#FFF9F3',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  ButtonConfig: {
    borderColor: '#1354D4',
    borderWidth: 1,
    borderRadius: 999,
    width: '100%',
    padding: 8,
    backgroundColor: '#fff',
  },
  FormItemMAC: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#dbdfe5',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  InputWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#dbdfe5',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    position: 'relative',
  },
  InputMAC: {
    ...Platform.select({
      ios: {
        height: 32,
      },
      android: {
        height: 40,
      },
    }),
    backgroundColor: '#fff',
    flexGrow: 1,
    color: '#393d42',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: FONT_FAMILY.Inter_SemiBold,
    paddingRight: 32,
  },
  ButtonCloseMAC: {
    ...Platform.select({
      ios: {
        padding: 6,
      },
      android: {
        padding: 10,
      },
    }),
    position: 'absolute',
    top: 0,
    right: 0,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  ButtonAddConfigWifi: {
    borderColor: '#1354D4',
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
  },
});
