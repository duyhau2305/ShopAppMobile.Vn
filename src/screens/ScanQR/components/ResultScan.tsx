import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ButtonCustom,
  DividerCustom,
  HeaderBottomSheet,
  LoadingTable,
  TextDisplay,
} from '../../../components';
import sty from '../../../themes/sty';
import IMAGES from '../../../assets/images';
import {handleErrorMessage} from '../../../utils/helpers';
import Geolocation from '@react-native-community/geolocation';
import {getAddressFromLonLat} from '../../../utils/nominatim';
import {useAppDispatch} from '../../../redux/hooks';
import {useNavigation} from '@react-navigation/native';
import {HOME_ROUTES, ROOT_ROUTES} from '../../../routes';
import {setToast} from '../../../redux/slices/commonSlice';

const {width} = Dimensions.get('window');

interface ResultScanProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleScanDone: () => void;
  employee?: {
    avatar: string;
    employee_code: string;
    full_name: string;
    id: number;
  };
}

const ResultScan = ({
  open,
  setOpen,
  handleScanDone,
  employee,
}: ResultScanProps) => {
  const navigate = useNavigation<any>();
  const dispatch = useAppDispatch();
  const [avatarError, setAvatarError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
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

  const handleSupportCheckIn = async () => {
    try {
      setLoading(true);
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
          screen: HOME_ROUTES.CAMERA_SUPPORT_CHECKIN,
          params: {
            location: res,
            data: employee,
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
      setOpen(false);
      handleScanDone();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleErrorMessage(
        error,
        undefined,
        'Có lỗi xảy ra khi truy cập vị trí, vui lòng thử lại.',
      );
    }
  };

  return (
    <Animated.View style={[styles.Overlay, {opacity: fadeAnim}]}>
      <TouchableOpacity activeOpacity={1} style={styles.BackGroundModal}>
        <TouchableOpacity activeOpacity={1} style={styles.ModalContainer}>
          <HeaderBottomSheet
            title="Thông tin nhân viên"
            onClose={() => {
              handleScanDone();
              setOpen(false);
            }}
          />
          <DividerCustom />
          <TouchableOpacity activeOpacity={1} style={[sty.gap_16, sty.p_12]}>
            <View style={[sty.flexRow, sty.gap_12, sty.itemsCenter]}>
              <Image
                source={
                  avatarError || !employee?.avatar
                    ? IMAGES.PROFILE.avatar_default
                    : {uri: employee?.avatar}
                }
                style={styles.Avatar}
                onError={() => setAvatarError(true)}
              />
              <View style={[sty.justifyBetween, sty.shrink_1, sty.gap_8]}>
                <TextDisplay color="#929BAC" text={employee?.employee_code} />
                <TextDisplay
                  fontSize={16}
                  lineHeight={24}
                  color="##181D27"
                  fontWeight="semibold"
                  text={employee?.full_name}
                />
              </View>
            </View>
            <ButtonCustom
              text="Chấm công hộ"
              style={sty.w_auto}
              disabled={loading}
              onPress={handleSupportCheckIn}
            />
            {loading && <LoadingTable />}
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ResultScan;

const styles = StyleSheet.create({
  Overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalContainer: {
    maxWidth: '100%',
    borderRadius: 16,
    backgroundColor: '#fff',
    minWidth: (width * 80) / 100,
  },
  BackGroundModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  Avatar: {
    width: 80,
    height: 80,
    objectFit: 'cover',
    alignSelf: 'center',
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#1354D4',
  },
});
