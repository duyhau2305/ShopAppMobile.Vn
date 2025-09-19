import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {persistor, rootStore} from './redux/store';
import AppNavigator from './navigators/AppNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useEffect, useRef} from 'react';
import {setOpenSendWifi, setTypeSend} from './redux/slices/sendWifiSlice';
import {setToastNoti} from './redux/slices/commonSlice';

function App() {
  const handledIdsRef = useRef<Set<string>>(new Set());

  // useEffect(() => {
  //   // (Tùy) đảm bảo đã xin quyền & register device trước khi lắng nghe
  //   (async () => {
  //     try {
  //       await messaging().requestPermission(); // iOS
  //       await messaging().registerDeviceForRemoteMessages();
  //       // const token = await messaging().getToken();
  //     } catch {}
  //   })();

  //   // Khi app đang background và user nhấn vào notification để mở app
  //   const unsubOpen = messaging().onNotificationOpenedApp(remoteMessage => {
  //     const id =
  //       remoteMessage?.messageId || JSON.stringify(remoteMessage?.data);
  //     if (id && handledIdsRef.current.has(id)) {
  //       return;
  //     }
  //     if (id) {
  //       handledIdsRef.current.add(id);
  //     }

  //     // Điều hướng theo payload
  //     console.log('Opened from BG:', remoteMessage);
  //     if (remoteMessage?.data?.action === 'get_wifi') {
  //       rootStore.dispatch(setTypeSend(remoteMessage?.data?.type as string));
  //       rootStore.dispatch(setOpenSendWifi(true));
  //     } else {
  //       rootStore.dispatch(
  //         setToastNoti({
  //           open: true,
  //           title: remoteMessage?.notification?.body,
  //         }),
  //       );
  //     }
  //   });

  //   // Khi app bị kill (tắt hoàn toàn) và được mở từ notification
  //   (async () => {
  //     const initial = await messaging().getInitialNotification();
  //     if (initial) {
  //       const id = initial?.messageId || JSON.stringify(initial?.data);
  //       if (!handledIdsRef.current.has(id)) {
  //         handledIdsRef.current.add(id);
  //         console.log('Opened from KILL:', initial);
  //         if (initial?.data?.action === 'get_wifi') {
  //           rootStore.dispatch(setTypeSend(initial?.data?.type as string));
  //           rootStore.dispatch(setOpenSendWifi(true));
  //         } else {
  //           rootStore.dispatch(
  //             setToastNoti({
  //               open: true,
  //               title: initial?.notification?.body,
  //             }),
  //           );
  //         }
  //       }
  //     }
  //   })();

  //   return () => {
  //     unsubOpen();
  //   };
  // }, []);

  return (
    <Provider store={rootStore}>
      <PersistGate loading={<></>} persistor={persistor}>
        <GestureHandlerRootView>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

export default App;
