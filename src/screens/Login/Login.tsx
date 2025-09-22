import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import sty from '../../themes/sty';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IMAGES from '../../assets/images';
import {
  ButtonCustom,
  GradientBackground,
  TextDisplay,
  TextGradient,
} from '../../components';
import {FONT_FAMILY} from '../../themes/fontFamily';
import stylesComponent from '../../themes/styComponents';
import {handleErrorMessage, showUnknownError} from '../../utils/helpers';
import {useAppDispatch} from '../../redux/hooks';
import {setModalLoading, setToast} from '../../redux/slices/commonSlice';
import {loginAPI, saveFcmToken} from '../../apis/auth';
import {useNavigation} from '@react-navigation/native';
import {AUTH_ROUTES, BOTTOM_TAB_ROUTES, ROOT_ROUTES} from '../../routes';
import {
  setAccessToken,
  setEmployee,
  setFcmToken,
  setRefreshToken,
  setRole,
  setUser,
} from '../../redux/slices/authSlice';
// import messaging from '@react-native-firebase/messaging';
import {checkFaceIDIOS} from '../../utils/iosTouchID';
import CarouselHome from '../Home/components/CarouselHome';
import { Facebook, Google } from '../../assets/svgs';
import ButtonComponent from '../Home/components/ButtonComponent';
import { appColors } from '../../constants/appColors';
import TextComponent from '../../components/TextComponent/TextComponent';
import { fontFamilies } from '../../constants/fontFamilies';


const Login = () => {
  const navigate = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);


  // const handleSavefcmToken = async () => {
  //   try {
  //     const fcmToken = await messaging().getToken();
  //     if (fcmToken) {
  //       dispatch(setFcmToken(fcmToken));
  //       await saveFcmToken({
  //         fcm_token: fcmToken,
  //       });
  //     } else {
  //       showUnknownError(
  //         'Có lỗi xảy ra khi cấp quyền thông báo. Vui lòng thử lại.',
  //       );
  //     }
  //   } catch (error) {
  //     handleErrorMessage(
  //       error,
  //       undefined,
  //       'Có lỗi xảy ra khi cấp quyền thông báo. Vui lòng thử lại.',
  //     );
  //   }
  // };

  const handleLogin = async () => {
    try {
      if (name?.trim()?.length <= 0) {
        return dispatch(
          setToast({
            open: true,
            title: 'Tên tài khoản là bắt buộc',
          }),
        );
      }
      if (pass?.trim()?.length <= 0) {
        return dispatch(
          setToast({
            open: true,
            title: 'Mật khẩu là bắt buộc',
          }),
        );
      }
      dispatch(setModalLoading(true));
      const res = await loginAPI({
        email_or_username: name,
        password: pass,
      });
      console.log('res', res);
      if (res?.data?.role?.role_id === 5) {
        dispatch(setAccessToken(res?.data?.data?.access_token));
        dispatch(setRefreshToken(res?.data?.data?.refresh_token));
        dispatch(setUser(res?.data?.user));
        dispatch(setEmployee(res?.data?.employee));
        dispatch(setRole(res?.data?.role));
        // handleSavefcmToken();
        // Navigation will automatically switch to authenticated stack
        // due to conditional rendering in RootStack when access_token is set
      } else {
        const check = await checkFaceIDIOS();
        if (check) {
          dispatch(setAccessToken(res?.data?.data?.access_token));
          dispatch(setRefreshToken(res?.data?.data?.refresh_token));
          dispatch(setUser(res?.data?.user));
          dispatch(setEmployee(res?.data?.employee));
          dispatch(setRole(res?.data?.role));
          // handleSavefcmToken();
          // Navigation will automatically switch to authenticated stack
          // due to conditional rendering in RootStack when access_token is set
        } else {
          dispatch(
            setToast({
              open: true,
              title:
                'Bạn phải sử dụng thiết bị IOS có hỗ trợ FaceID và từ phiên bản 14 trở lên.',
            }),
          );
        }
      }
      dispatch(setModalLoading(false));
    } catch (error) {
      dispatch(setModalLoading(false));
      handleErrorMessage(error, {
        401: 'Tài khoản hoặc mật khẩu không chính xác.',
        404: 'Tài khoản hoặc mật khẩu không chính xác.',
        405: 'Tài khoản của bạn chưa được kích hoạt.',
        422: 'Tài khoản hoặc mật khẩu không chính xác.',
      });
    }
  };
  return (
    <GradientBackground>
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
              {paddingBottom: insets.bottom + 160},
            ]}
            showsVerticalScrollIndicator={false}>
            <View
              style={[
                sty.gap_8,
                sty.itemsCenter,
                {
                  paddingTop: insets.top + 24,
                },
              ]}>
              <Image source={IMAGES.LOGIN.icon_login} style={styles.Logo} />
            </View>
            <TextGradient
              text="Shopapp.vn"
              startColor="#00BF8B"
              endColor="#1354D4"
              fontSize={28}
              fontWeight="bold"
            />

            <TouchableOpacity style={styles.FormLogin} activeOpacity={1}>
              <TextDisplay
                text="Đăng nhập"
                color="#181D27"
                fontSize={20}
                lineHeight={28}
                fontWeight="semibold"
                styles={{
                  marginBottom: 10,
                  textAlign: 'center',
                }}
              />
              <ButtonComponent
               text="Đăng nhập với Google" 
               onPress={() => {}} 
               type="primary" icon={<Google />} textColor={appColors.text} 
               color={appColors.white}/>
                <ButtonComponent
               text="Đăng nhập với FaceBook" 
               onPress={() => {}} 
               type="primary" icon={<Facebook />} textColor={appColors.text} 
               color={appColors.white}/>
                 <TextComponent title text="OR" styles={{
                  marginBottom: 10,
                  textAlign: 'center',
                  fontFamily: "BeVietnamPro-Medium",
                }}/>
              <View style={styles.InputPassword}>
                <TextInput
                  style={styles.Input}
                  placeholder="Nhập tên tài khoản"
                  placeholderTextColor="#838C97"
                  value={name}
                  onChangeText={value => setName(value)}
                />
                {name?.length > 0 && (
                  <TouchableOpacity
                    style={styles.ButtonPassword}
                    activeOpacity={0.8}
                    onPress={() => setName('')}>
                    <Image
                      source={IMAGES.FORM.icon_clear_value}
                      style={[sty.w_24, sty.h_24, sty.objectScaleDown]}
                    />
                  </TouchableOpacity>
                )}
              </View>
            

              <View style={styles.InputPassword}>
                <TextInput
                  style={styles.Input}
                  placeholder="Nhập mật khẩu"
                  placeholderTextColor="#838C97"
                  value={pass}
                  secureTextEntry={!show}
                  onChangeText={value => setPass(value)}
                />
                <TouchableOpacity
                  style={styles.ButtonPassword}
                  activeOpacity={0.8}
                  onPress={() => setShow(!show)}>
                  <Image
                    source={
                      show
                        ? IMAGES.LOGIN.icon_display_pass
                        : IMAGES.LOGIN.icon_hidden_pass
                    }
                    style={[sty.w_24, sty.h_24, sty.objectScaleDown]}
                  />
                </TouchableOpacity>
              </View>
              <ButtonCustom text="Đăng nhập" onPress={handleLogin} style={styles.ButtonLogin} />
              {/* <ButtonCustom
                text="Đăng ký"
                style={[sty.bg_white, styles.ButtonLogin]}
                color="#1354D4"
                onPress={() =>
                  navigate.navigate(ROOT_ROUTES.AUTH_STACK, {
                    screen: AUTH_ROUTES.REGISTER,
                  })
                }
              /> */}
              
            </TouchableOpacity>
            {/* <CarouselHome /> */}
          </ScrollView>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      {/* <View
        style={[stylesComponent.Footer, {paddingBottom: insets.bottom + 8}]}>
        
      </View> */}
    </GradientBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  Logo: {
    width: 60,
    height: 60,
    objectFit: 'scale-down',
  },
  HeadingApp: {
    fontSize: 26,
    lineHeight: 34,
  },
  FormLogin: {
    marginVertical: 12,
    gap: 14,
  },
  InputPassword: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#dbdfe5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  Input: {
    flex: 1,
    height: 42,
    fontSize: 16,
    color: '#435869',
    fontFamily: FONT_FAMILY.Inter_Medium,
  },
  ButtonLogin: {
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  ButtonPassword: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ButtonGoogle: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dbdfe5',
    borderRadius: 16, 
  },
});
