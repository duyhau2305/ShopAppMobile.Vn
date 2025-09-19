import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setToastNoti} from '../../redux/slices/commonSlice';
import TextDisplay from '../TextDisplay';
import {Portal} from 'react-native-portalize';
import IMAGES from '../../assets/images';
import sty from '../../themes/sty';
import {useNavigation} from '@react-navigation/native';
import {HOME_ROUTES, ROOT_ROUTES} from '../../routes';

const {width} = Dimensions.get('window');

const ToastNoti = () => {
  const navigate = useNavigation<any>();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const {openNoti, notiTitle} = useAppSelector(state => state.common);

  // Animation values
  const translateY = useRef(new Animated.Value(-(insets.top + 120))).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (openNoti) {
      // Slide down + fade in
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          bounciness: 6,
          speed: 12,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide sau 2.5s
      timer = setTimeout(() => {
        dispatch(setToastNoti({open: false, title: ''}));
      }, 6000);
    } else {
      // Slide up + fade out
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -(insets.top + 120),
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [openNoti, opacity, translateY, insets.top, dispatch]);

  return (
    <Portal>
      {/* Wrapper không chặn touch ngoài khu vực banner */}
      <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
        <Animated.View
          style={[
            styles.bannerWrapper,
            {
              paddingTop: insets.top + 8,
              opacity,
              transform: [{translateY}],
            },
          ]}
          pointerEvents="box-none">
          <TouchableOpacity
            activeOpacity={0.95}
            onPress={() => {
              dispatch(setToastNoti({open: false, title: ''}));
              navigate.navigate(ROOT_ROUTES.HOME_STACK, {
                screen: HOME_ROUTES.NOTIFICATION,
              });
            }}
            style={styles.banner}>
            <Image
              source={IMAGES.HOME.icon_notification_home}
              style={styles.icon}
            />
            <View style={sty.flex_1}>
              <TextDisplay color="#181D27" text={notiTitle} numberOfLines={2} />
            </View>
            <TouchableOpacity
              onPress={() => dispatch(setToastNoti({open: false, title: ''}))}>
              <Image
                source={IMAGES.FORM.icon_clear_value}
                style={[sty.w_24, sty.h_24, sty.objectScaleDown]}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Portal>
  );
};

export default ToastNoti;

const styles = StyleSheet.create({
  bannerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    minWidth: (width * 92) / 100,
    maxWidth: (width * 96) / 100,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    // Shadow iOS
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 6},
    // Elevation Android
    elevation: 8,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  closeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
});
