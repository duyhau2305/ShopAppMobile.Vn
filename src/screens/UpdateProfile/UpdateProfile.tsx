import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  GradientBackground,
  HeaderBack,
  DividerCustom,
  ButtonCustom,
  TextDisplay,
  FormInputText,
} from '../../components';
import sty from '../../themes/sty';
import stylesComponent from '../../themes/styComponents';
import {handleErrorMessage} from '../../utils/helpers';
import {useDispatch} from 'react-redux';
import {
  setModalLoading,
  setModalSuccess,
  setToast,
} from '../../redux/slices/commonSlice';
import {updateProfileAPI} from '../../apis/profile';

const UpdateProfile = () => {
  const navigate = useNavigation<any>();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const {profile, handleGetAccountInfo} = route.params as any;

  const [phone, setPhone] = useState<string>('');
  const [errorPhone, setErrorPhone] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<boolean>(false);

  useEffect(() => {
    setName(profile?.user?.name);
    setPhone(profile?.user?.phone);
    if (profile?.user?.roles?.id !== 5) {
      setEmail(profile?.user?.email);
    }
  }, [profile]);

  const handleUpdateProfile = async () => {
    try {
      if (errorPhone) {
        return;
      }
      if (!phone) {
        return dispatch(
          setToast({
            open: true,
            title: 'Số điện thoại là bắt buộc',
          }),
        );
      }
      if (profile?.user?.roles?.id !== 5) {
        if (!name) {
          return dispatch(
            setToast({
              open: true,
              title: 'Họ và tên là bắt buộc',
            }),
          );
        }
        if (errorEmail) {
          return;
        }
        if (!email) {
          return dispatch(
            setToast({
              open: true,
              title: 'Email là bắt buộc',
            }),
          );
        }
      }
      dispatch(setModalLoading(true));
      await updateProfileAPI(
        profile?.user?.roles?.id === 5
          ? {
              phone_number: phone,
            }
          : {
              full_name: name,
              phone_number: phone,
              email: email,
            },
      );
      handleGetAccountInfo();
      navigate.goBack();
      dispatch(
        setModalSuccess({
          open: true,
          title: 'Cập nhật thành công',
        }),
      );
      dispatch(setModalLoading(false));
    } catch (error) {
      dispatch(setModalLoading(false));
      handleErrorMessage(error);
    }
  };

  return (
    <GradientBackground>
      <HeaderBack title="Thông tin cơ bản" />
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
              {paddingBottom: insets.bottom + 160},
            ]}
            showsVerticalScrollIndicator={false}>
            {profile?.user?.roles?.id !== 5 && (
              <FormInputText
                label="Họ và tên"
                required
                value={name}
                onChangeText={(value: string) => setName(value)}
              />
            )}
            <FormInputText
              label="Số điện thoại"
              required
              value={phone}
              onChangeText={(value: string) => {
                setPhone(value);
                setErrorPhone(!/^\+?\d{8,15}$/.test(value));
              }}
              keyboardType="number-pad"
            />
            {errorPhone && (
              <TextDisplay color="#DA4646" text="Số điện thoại không hợp lệ." />
            )}
            {profile?.user?.roles?.id !== 5 && (
              <>
                <FormInputText
                  label="Email"
                  required
                  value={email}
                  onChangeText={(value: string) => {
                    setEmail(value);
                    setErrorEmail(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
                  }}
                  keyboardType="email-address"
                />
                {errorEmail && (
                  <TextDisplay color="#DA4646" text="Email không hợp lệ." />
                )}
              </>
            )}
          </ScrollView>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View
        style={[stylesComponent.Footer, {paddingBottom: insets.bottom + 8}]}>
        <ButtonCustom text="Lưu" onPress={handleUpdateProfile} />
      </View>
    </GradientBackground>
  );
};

export default UpdateProfile;
