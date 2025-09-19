import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import TextDisplay from '../TextDisplay';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import IMAGES from '../../assets/images';
import {setModalSuccess} from '../../redux/slices/commonSlice';
import ButtonCustom from '../Button/ButtonCustom';
import sty from '../../themes/sty';
import {Portal} from 'react-native-portalize';

const {width} = Dimensions.get('window');

const ModalSuccess = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dispatch = useAppDispatch();
  const {titleSuccess, openSuccess} = useAppSelector(state => state.common);

  useEffect(() => {
    if (openSuccess) {
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
  }, [fadeAnim, openSuccess]);

  return (
    <Portal>
      <Animated.View style={[styles.Overlay, {opacity: fadeAnim}]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            dispatch(
              setModalSuccess({
                open: false,
                title: titleSuccess,
              }),
            )
          }
          style={styles.BackGroundModal}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              dispatch(
                setModalSuccess({
                  open: true,
                  title: titleSuccess || 'Thành công',
                }),
              )
            }
            style={styles.ModalContainer}>
            <Image
              source={IMAGES.COMMON.icon_success}
              style={styles.IconSuccess}
            />
            <TextDisplay
              fontSize={16}
              lineHeight={24}
              textAlign="center"
              color="#393D42"
              fontWeight="semibold"
              text={titleSuccess || 'Thành công'}
            />
            <ButtonCustom
              text="Đóng"
              style={[sty.w_auto, sty.py_4]}
              onPress={() =>
                dispatch(
                  setModalSuccess({
                    open: false,
                    title: titleSuccess,
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

export default ModalSuccess;

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
  IconSuccess: {
    width: 90,
    height: 90,
    objectFit: 'scale-down',
    alignSelf: 'center',
  },
});
