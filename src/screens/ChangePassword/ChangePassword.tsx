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
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IMAGES from '../../assets/images';
import {
  GradientBackground,
  HeaderBack,
  DividerCustom,
  ButtonCustom,
  TextDisplay,
} from '../../components';
import {FONT_FAMILY} from '../../themes/fontFamily';
import sty from '../../themes/sty';
import stylesComponent from '../../themes/styComponents';
import {useAppDispatch} from '../../redux/hooks';
import {
  setModalLoading,
  setModalSuccess,
  setToast,
} from '../../redux/slices/commonSlice';
import {handleErrorMessage} from '../../utils/helpers';
import {changePasswordAPI} from '../../apis/profile';
import {useNavigation} from '@react-navigation/native';

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [pass, setPass] = useState<string>('');
  const [showPass, setShowPass] = useState<boolean>(false);
  const [newPass, setNewPass] = useState<string>('');
  const [showNewPass, setNewShowPass] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [errors, setErrors] = useState<boolean>(false);

  useEffect(() => {
    if (newPass !== confirm && confirm?.length > 0) {
      setErrors(true);
    } else {
      setErrors(false);
    }
  }, [confirm, newPass]);

  const handleChangePassWord = async () => {
    try {
      if (!pass) {
        return dispatch(
          setToast({
            open: true,
            title: 'Mật khẩu hiện tại là bắt buộc',
          }),
        );
      }
      if (!newPass) {
        return dispatch(
          setToast({
            open: true,
            title: 'Mật khẩu mới là bắt buộc',
          }),
        );
      }
      if (!confirm) {
        return dispatch(
          setToast({
            open: true,
            title: 'Vui lòng nhập lại mật khẩu mới',
          }),
        );
      }
      dispatch(setModalLoading(true));
      await changePasswordAPI({
        password: newPass,
        current_password: pass,
        password_confirmation: confirm,
      });
      dispatch(
        setModalSuccess({
          open: true,
          title: 'Thay đổi mật khẩu thành công.',
        }),
      );
      navigate.goBack();
      dispatch(setModalLoading(false));
    } catch (error) {
      dispatch(setModalLoading(false));
      handleErrorMessage(error);
    }
  };

  return (
    <GradientBackground>
      <HeaderBack title="Đổi mật khẩu" />
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
              {paddingBottom: insets.bottom + 16},
            ]}
            showsVerticalScrollIndicator={false}>
            <View style={styles.InputPassword}>
              <TextInput
                style={styles.Input}
                placeholder="Nhập mật khẩu cũ"
                placeholderTextColor="#838C97"
                value={pass}
                secureTextEntry={!showPass}
                onChangeText={value => setPass(value)}
              />
              <TouchableOpacity
                style={styles.ButtonPassword}
                activeOpacity={0.8}
                onPress={() => setShowPass(!showPass)}>
                <Image
                  source={
                    showPass
                      ? IMAGES.LOGIN.icon_display_pass
                      : IMAGES.LOGIN.icon_hidden_pass
                  }
                  style={[sty.w_24, sty.h_24, sty.objectScaleDown]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.InputPassword}>
              <TextInput
                style={styles.Input}
                placeholder="Nhập mật khẩu mới"
                placeholderTextColor="#838C97"
                value={newPass}
                secureTextEntry={!showNewPass}
                onChangeText={value => setNewPass(value)}
              />
              <TouchableOpacity
                style={styles.ButtonPassword}
                activeOpacity={0.8}
                onPress={() => setNewShowPass(!showNewPass)}>
                <Image
                  source={
                    showNewPass
                      ? IMAGES.LOGIN.icon_display_pass
                      : IMAGES.LOGIN.icon_hidden_pass
                  }
                  style={[sty.w_24, sty.h_24, sty.objectScaleDown]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.InputPassword}>
              <TextInput
                style={styles.Input}
                placeholder="Nhập lại mật khẩu mới"
                placeholderTextColor="#838C97"
                value={confirm}
                secureTextEntry={!showConfirm}
                onChangeText={value => setConfirm(value)}
              />
              <TouchableOpacity
                style={styles.ButtonPassword}
                activeOpacity={0.8}
                onPress={() => setShowConfirm(!showConfirm)}>
                <Image
                  source={
                    showConfirm
                      ? IMAGES.LOGIN.icon_display_pass
                      : IMAGES.LOGIN.icon_hidden_pass
                  }
                  style={[sty.w_24, sty.h_24, sty.objectScaleDown]}
                />
              </TouchableOpacity>
            </View>
            {errors && (
              <TextDisplay
                text="Nhập lại mật khẩu không khớp"
                color="#FF4D4F"
              />
            )}
          </ScrollView>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View
        style={[stylesComponent.Footer, {paddingBottom: insets.bottom + 8}]}>
        <ButtonCustom onPress={handleChangePassWord} text="Lưu" />
      </View>
    </GradientBackground>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
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
  ButtonPassword: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
