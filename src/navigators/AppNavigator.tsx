import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Host, Portal} from 'react-native-portalize';
import {ModalLoading, ModalSuccess, Toast, ToastNoti} from '../components';
import RootStack from './RootStack';
import {requestAndroidNotificationPermission} from '../utils/fcm';
// import messaging from '@react-native-firebase/messaging'
import {useAppDispatch} from '../redux/hooks';
import {setToastNoti} from '../redux/slices/commonSlice';
import ModalWarningTimekeeping from '../components/Modal/ModalWarningTimekeeping';
import ModalConfigWifi from '../components/Modal/ModalConfigWifi';
import {setOpenSendWifi, setTypeSend} from '../redux/slices/sendWifiSlice';
import {rootStore} from '../redux/store';

const AppNavigator = () => {
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   const init = async () => {
  //     await requestAndroidNotificationPermission(); // Android 13+
  //     const authStatus = await messaging().requestPermission();
  //     const enabled =
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  //     console.log(enabled);
  //   };
  //   init();
  // }, []);

  // messaging().onMessage(async remoteMessage => {
  //   if (remoteMessage?.data?.action === 'get_wifi') {
  //     rootStore.dispatch(setOpenSendWifi(true));
  //     rootStore.dispatch(setTypeSend(remoteMessage?.data?.type as string));
  //   } else {
  //     dispatch(
  //       setToastNoti({
  //         open: true,
  //         title: remoteMessage?.notification?.body,
  //       }),
  //     );
  //   }
  //   console.log('Khi app đang mở: ', remoteMessage);
  // });

  return (
    <NavigationContainer>
      <Host>
        <RootStack />
        <Portal>
          <ModalLoading />
          <ModalSuccess />
          <ModalWarningTimekeeping />
          <ModalConfigWifi />
          <Toast />
          <ToastNoti />
        </Portal>
      </Host>
    </NavigationContainer>
  );
};

export default AppNavigator;
