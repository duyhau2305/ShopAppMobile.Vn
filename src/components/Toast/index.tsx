import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setToast} from '../../redux/slices/commonSlice';
import TextDisplay from '../TextDisplay';
import {Portal} from 'react-native-portalize';
import ButtonCustom from '../Button/ButtonCustom';
import sty from '../../themes/sty';
import IMAGES from '../../assets/images';

const {width} = Dimensions.get('window');

const Toast = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dispatch = useAppDispatch();
  const {openToast, titleToast} = useAppSelector(state => state.common);

  useEffect(() => {
    if (openToast) {
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
  }, [fadeAnim, openToast]);

  return (
    <Portal>
      <Animated.View style={[styles.Overlay, {opacity: fadeAnim}]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            dispatch(
              setToast({
                open: false,
                title: titleToast,
              }),
            )
          }
          style={styles.BackGroundModal}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              dispatch(
                setToast({
                  open: true,
                  title: titleToast,
                }),
              )
            }
            style={styles.ModalContainer}>
            <Image source={IMAGES.COMMON.icon_error} style={styles.IconError} />
            <TextDisplay
              fontSize={16}
              lineHeight={24}
              textAlign="center"
              color="#393D42"
              fontWeight="semibold"
              text={titleToast}
            />
            <ButtonCustom
              text="Đóng"
              style={[sty.w_auto, sty.py_4]}
              onPress={() =>
                dispatch(
                  setToast({
                    open: false,
                    title: titleToast,
                  }),
                )
              }
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>
    </Portal>
  );
};

export default Toast;

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
    minWidth: (width * 70) / 100,
    alignSelf: 'center',
  },
  IconError: {
    width: 70,
    height: 70,
    objectFit: 'scale-down',
    alignSelf: 'center',
  },
});
