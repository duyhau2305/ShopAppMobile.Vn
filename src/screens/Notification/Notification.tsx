import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  GradientBackground,
  HeaderBack,
  DividerCustom,
  ButtonLoadMore,
} from '../../components';
import sty from '../../themes/sty';
import {getListNotificationAPI} from '../../apis/notification';
import {handleErrorMessage} from '../../utils/helpers';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  setListNotification,
  setPaginationNotification,
} from '../../redux/slices/notificationSlice';
import NotificationItem from './components/NotificationItem';
import NoData from '../../components/NoData';
import {useFocusEffect} from '@react-navigation/native';

const Notification = () => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const {listNotification, pagination} = useAppSelector(
    state => state.notification,
  );

  const handeGetListNotification = useCallback(async () => {
    try {
      const res = await getListNotificationAPI();
      dispatch(setListNotification(res?.data?.data));
      dispatch(setPaginationNotification(res?.data?.pagination));
    } catch (error) {
      handleErrorMessage(error);
    }
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      handeGetListNotification();
    }, [handeGetListNotification]),
  );

  return (
    <GradientBackground>
      <HeaderBack title="Thông báo" />
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
              {paddingBottom: insets.bottom + 80},
            ]}
            showsVerticalScrollIndicator={false}>
            {listNotification?.length > 0 ? (
              listNotification?.map(notification => (
                <NotificationItem
                  key={notification?.id}
                  notification={notification}
                />
              ))
            ) : (
              <NoData />
            )}
            {pagination?.current_page < pagination?.last_page && (
              <ButtonLoadMore onPress={() => {}} />
            )}
          </ScrollView>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

export default Notification;
