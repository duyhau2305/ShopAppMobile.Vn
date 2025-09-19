import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Portal} from 'react-native-portalize';
import TextDisplay from '../TextDisplay';
import ButtonCustom from '../Button/ButtonCustom';
import sty from '../../themes/sty';
import {setModalWarningTimekeeping} from '../../redux/slices/commonSlice';
import IMAGES from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import {BOTTOM_TAB_ROUTES, ROOT_ROUTES} from '../../routes';

const {width} = Dimensions.get('window');

const ModalWarningTimekeeping = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dispatch = useAppDispatch();
  const {openWarningTimekeeping} = useAppSelector(state => state.common);
  const navigate = useNavigation<any>();

  useEffect(() => {
    if (openWarningTimekeeping) {
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
  }, [fadeAnim, openWarningTimekeeping]);

  return (
    <Portal>
      <Animated.View style={[styles.Overlay, {opacity: fadeAnim}]}>
        <TouchableOpacity activeOpacity={1} style={styles.BackGroundModal}>
          <TouchableOpacity activeOpacity={1} style={styles.ModalContainer}>
            <Image
              source={IMAGES.COMMON.icon_warning_timekeeping}
              style={styles.IconWarning}
            />
            <TextDisplay
              fontSize={16}
              lineHeight={24}
              textAlign="center"
              color="#393D42"
              fontWeight="semibold"
              text="Đã hết giờ làm việc"
            />
            <ButtonCustom
              text="Đóng"
              style={sty.w_auto}
              onPress={() => {
                dispatch(setModalWarningTimekeeping(false));
                navigate.navigate(ROOT_ROUTES.BOTTOM_TAB_STACK, {
                  screen: BOTTOM_TAB_ROUTES.HOME,
                });
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>
    </Portal>
  );
};

export default ModalWarningTimekeeping;

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
    padding: 12,
    maxWidth: '100%',
    borderRadius: 16,
    gap: 8,
    backgroundColor: '#fff',
    minWidth: (width * 80) / 100,
  },
  IconWarning: {
    width: 90,
    height: 90,
    objectFit: 'scale-down',
    alignSelf: 'center',
  },
});
