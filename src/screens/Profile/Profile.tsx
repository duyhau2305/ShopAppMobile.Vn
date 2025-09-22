import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {resetAuthState} from '../../redux/slices/authSlice';
import {
  DividerCustom,
  GradientBackground,
  HeaderBack,
  TextDisplay,
  UtilityAppComponent,
} from '../../components';
import sty from '../../themes/sty';
import IMAGES from '../../assets/images';
import ProfileFunction from './components/ProfileFunction';
import {AUTH_ROUTES, ROOT_ROUTES} from '../../routes';
import {resetCollaboratorState} from '../../redux/slices/collaboratorSlice';
import {setModalLoading} from '../../redux/slices/commonSlice';
import {handleErrorMessage} from '../../utils/helpers';
import {resetTakeOffState} from '../../redux/slices/takeOffSlice';
import {resetRequestState} from '../../redux/slices/requestSlice';
import {resetConfigWifiState} from '../../redux/slices/configWifiSlice';
import {resetInfoState} from '../../redux/slices/infoSlice';
import {clearTimer, resetTimer} from '../../redux/slices/timerSlice';
import {resetTimekeepingState} from '../../redux/slices/timekeepingSlice';
import HeaderProfile from './components/HeaderProfile';
import { LIST_UTILITY_APP, LIST_UTILITY_PRODUCT, LIST_UTILITY_TRANSACTION } from '../../utils/utility';
import { appColors } from '../../constants/appColors';

const Profile = () => {
  const navigate = useNavigation<any>();
  const {user, employee, fcmToken} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const tabBarHeight = useBottomTabBarHeight();
  const [avatarError, setAvatarError] = useState<boolean>(false);

 
  const handleLogout = () => {
    dispatch(resetAuthState());
    dispatch(resetCollaboratorState());
    dispatch(resetTakeOffState());
    dispatch(resetRequestState());
    dispatch(resetConfigWifiState());
    dispatch(resetInfoState());
    dispatch(clearTimer());
    dispatch(resetTimer());
  }
  return (
    <GradientBackground>
      <HeaderProfile />
     
      <ScrollView
        contentContainerStyle={[
          sty.p_16,
          sty.gap_12,
          {paddingBottom: tabBarHeight + 16},
        ]}
        showsVerticalScrollIndicator={false}>     
        <UtilityAppComponent 
        onPress={() => {}}
         utilityApp={LIST_UTILITY_TRANSACTION}
          itemRow={3} gap={32} title="Giao dịch" 
          stylesProps={styles.UtilityAppComponent} />
        <UtilityAppComponent 
        onPress={() => {}} 
        utilityApp={LIST_UTILITY_PRODUCT} 
        itemRow={3} gap={32} title="Hàng hóa" 
        stylesProps={styles.UtilityAppComponent} /> 
        <UtilityAppComponent 
        onPress={() => {}} 
        utilityApp={LIST_UTILITY_TRANSACTION} 
        itemRow={3} gap={32} title="Đối tác" 
        stylesProps={styles.UtilityAppComponent} />  
        <UtilityAppComponent 
            onPress={() => {}} 
            utilityApp={LIST_UTILITY_TRANSACTION} 
            itemRow={3} gap={32} title="Nhân viên" 
            stylesProps={styles.UtilityAppComponent} />     
        <UtilityAppComponent 
          onPress={() => {}} 
          utilityApp={LIST_UTILITY_TRANSACTION} 
          itemRow={3} gap={32} title="Báo cáo" 
          stylesProps={styles.UtilityAppComponent} /> 
          <UtilityAppComponent 
            onPress={() => {}} 
            utilityApp={LIST_UTILITY_TRANSACTION} 
            itemRow={3} gap={32} title="Cài đặt chung" 
            stylesProps={styles.UtilityAppComponent} />   
            <TouchableOpacity onPress={handleLogout} style={styles.ButtonLogout}>
              <TextDisplay text="Đăng xuất" color="#444A55" fontWeight="semibold" />
            </TouchableOpacity>       
            
       
      </ScrollView>
    </GradientBackground>
  );
};

export default Profile;

const styles = StyleSheet.create({
  Avatar: {
    width: 56,
    height: 56,
    objectFit: 'cover',
    borderWidth: 2,
    borderColor: '#1354D4',
    borderRadius: 9999,
  },
  ButtonLogout: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#a4afbd',
    borderRadius: 12,
    justifyContent: 'center',
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  UtilityAppComponent: {
    backgroundColor: appColors.white, 
    paddingTop: 16,
    paddingLeft: 10,
    borderRadius: 16,
    shadowColor: '#000',  
    boxShadow: '0 2px 16px 0 rgba(0, 0, 0, 0.08)',
  },
  IconLogout: {
    width: 24,
    height: 24,
  },
});
