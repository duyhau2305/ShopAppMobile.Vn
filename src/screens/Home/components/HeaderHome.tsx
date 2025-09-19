import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import sty from '../../../themes/sty';
import IMAGES from '../../../assets/images';
import {TextDisplay} from '../../../components';
import {IconHeadingHome} from '../../../components/Icons';
import {HOME_ROUTES, ROOT_ROUTES} from '../../../routes';
import {handleErrorMessage} from '../../../utils/helpers';
import {getTotalUnReadAPI} from '../../../apis/notification';
import {setTotalUnRead} from '../../../redux/slices/notificationSlice';
import TextComponent from '../../../components/TextComponent/TextComponent';
import { fontFamilies } from '../../../constants/fontFamilies';

const HeaderHome = () => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const navigate = useNavigation<any>();
  const {user, role, employee} = useAppSelector(state => state.auth);
  const {totalUnRead} = useAppSelector(state => state.notification);
  const [avatarError, setAvatarError] = useState<boolean>(false);

  const handleGetTotalUnRead = useCallback(async () => {
    try {
      const res = await getTotalUnReadAPI();
      dispatch(setTotalUnRead(res?.data?.data?.count || 0));
    } catch (error) {
      handleErrorMessage(error);
    }
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      handleGetTotalUnRead();
    }, [handleGetTotalUnRead]),
  );

  return (
    <View
      style={[
        sty.flexRow,
        sty.itemsCenter,
        sty.justifyBetween,
        sty.shrink_1,
        sty.gap_12,
        sty.px_16,
        sty.pb_8,
        {paddingTop: insets.top + 8},
      ]}>
      <View style={[sty.flexRow, sty.itemsCenter, sty.gap_8, sty.shrink_1]}>
        <Image source={IMAGES.COMMON.logo_app} style={styles.LogoApp} /> 
        <TextComponent text="ShopApp.vn" title font={fontFamilies.medium} color="#393D42" />
      </View>
      <View style={[sty.flexRow, sty.itemsCenter, sty.gap_8, sty.shrink_1]}>
        <View style={[sty.shrink_1, sty.itemsEnd]}>
          <TextDisplay
            fontSize={16}
            lineHeight={24}
            text={user?.name || ''}
            fontWeight="bold"
            color="#393D42"
            numberOfLines={1}
          />
          {role?.role_id === 5 && (
            <View
              style={[sty.flexRow, sty.itemsCenter, sty.gap_4, sty.shrink_1]}>
              <TextDisplay
                text={employee?.recruiter?.name || ''}
                color="#535862"
                numberOfLines={1}
              />
              <Image
                source={IMAGES.HOME.icon_user_referrer}
                style={[sty.w_20, sty.h_20, sty.objectScaleDown]}
              />
            </View>
          )}
        </View>
       
        
        <TouchableOpacity
          onPress={() =>
            navigate.navigate(ROOT_ROUTES.HOME_STACK, {
              screen: HOME_ROUTES.NOTIFICATION,
            })
          }
          style={sty.relative}>
          <View
            style={[
              styles.Notification,
             
            ]}>
            <Image
              source={IMAGES.HOME.icon_notification}
              style={[sty.w_24, sty.h_24, sty.objectScaleDown]}
            />
          </View>
          {totalUnRead > 0 && (
            <View style={styles.NotificationBagde}>
              <TextDisplay
                color="#fff"
                text={totalUnRead > 99 ? '99+' : totalUnRead}
                styles={sty.shrink_0}
                fontSize={12}
                lineHeight={16}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  LogoApp: {
    height: 36,
    width: 36,
    objectFit: 'scale-down',
  },
  Notification: {
    width: 40,
    height: 40,
    borderRadius: 50,  
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  NotificationBagde: {
    borderColor: '#fff',
    backgroundColor: '#FF4D4F',
    borderWidth: 1,
    borderRadius: 8,
    position: 'absolute',
    right: -8,
    top: -8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Avatar: {
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderWidth: 3,
    borderColor: '#1354D4',
    borderRadius: 9999,
  },
  AvatarContainer: {
    width: 46 ,
    height: 46,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFA500',
  },
});
