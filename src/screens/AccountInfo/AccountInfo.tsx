import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  DividerCustom,
  GradientBackground,
  HeaderBack,
  ModalQuestion,
  TextDisplay,
} from '../../components';
import sty from '../../themes/sty';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setModalLoading, setModalSuccess} from '../../redux/slices/commonSlice';
import {getAccountInfoAPI} from '../../apis/profile';
import {handleErrorMessage} from '../../utils/helpers';
import IMAGES from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import {PROFILE_ROUTES, ROOT_ROUTES} from '../../routes';
import {ClientParams} from '../../interfaces/client';
import {
  resetAuthState,
  setEmployee,
  setUser,
} from '../../redux/slices/authSlice';
import {deleteEmployeeAPI, logoutAPI} from '../../apis/auth';
import {clearTimer, resetTimer} from '../../redux/slices/timerSlice';
import {resetCollaboratorState} from '../../redux/slices/collaboratorSlice';
import {resetTakeOffState} from '../../redux/slices/takeOffSlice';
import {resetRequestState} from '../../redux/slices/requestSlice';
import {resetConfigWifiState} from '../../redux/slices/configWifiSlice';
import {resetInfoState} from '../../redux/slices/infoSlice';
import {resetTimekeepingState} from '../../redux/slices/timekeepingSlice';

const AccountInfo = () => {
  const navigate = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const {fcmToken} = useAppSelector(state => state.auth);
  const [avatarError, setAvatarError] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>();
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const handleGetAccountInfo = useCallback(async () => {
    try {
      dispatch(setModalLoading(true));
      const res = await getAccountInfoAPI();
      setProfile(res?.data?.data);
      dispatch(setEmployee(res?.data?.data?.employee));
      dispatch(
        setUser({
          id: res?.data?.data?.user?.id,
          name: res?.data?.data?.user?.name,
          email: res?.data?.data?.user?.email,
          username: res?.data?.data?.user?.username,
          phone: res?.data?.data?.user?.phone,
        }),
      );
      dispatch(setModalLoading(false));
    } catch (error) {
      dispatch(setModalLoading(false));
      handleErrorMessage(error);
    }
  }, [dispatch]);

  useEffect(() => {
    handleGetAccountInfo();
  }, [handleGetAccountInfo]);

  const handleDeleteAccount = async () => {
    try {
      dispatch(setModalLoading(true));
      const res = await deleteEmployeeAPI();
      await logoutAPI({fcm_token: fcmToken as string});
      dispatch(clearTimer());
      dispatch(resetTimer());
      dispatch(resetAuthState());
      dispatch(resetCollaboratorState());
      dispatch(resetTakeOffState());
      dispatch(resetRequestState());
      dispatch(resetConfigWifiState());
      dispatch(resetInfoState());
      dispatch(resetTimekeepingState());
      navigate.reset({
        index: 0,
        routes: [{name: ROOT_ROUTES.AUTH_STACK}],
      });
      dispatch(
        setModalSuccess({
          open: true,
          title: 'Xoá tài khoản thành công.',
        }),
      );
      console.log(res);
      dispatch(setModalLoading(false));
    } catch (error) {
      dispatch(setModalLoading(false));
      handleErrorMessage(error);
    }
  };

  return (
    <GradientBackground>
      <HeaderBack title="Thông tin tài khoản" />
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
              sty.gap_24,
              {paddingBottom: insets.bottom + 16},
            ]}
            showsVerticalScrollIndicator={false}>
            <View style={[sty.gap_12, sty.flexRow, sty.itemsCenter]}>
              <Image
                source={
                  avatarError || !profile?.employee?.avatar
                    ? IMAGES.PROFILE.avatar_default
                    : {uri: profile?.employee?.avatar}
                }
                style={styles.Avatar}
                onError={() => setAvatarError(true)}
              />
              <TextDisplay
                fontSize={16}
                lineHeight={24}
                text={profile?.user?.name}
                color="#181D27"
                fontWeight="bold"
              />
            </View>
            <TouchableOpacity style={sty.gap_12} activeOpacity={1}>
              <View
                style={[
                  sty.gap_12,
                  sty.flexRow,
                  sty.justifyBetween,
                  sty.itemsCenter,
                ]}>
                <TextDisplay
                  fontSize={16}
                  lineHeight={24}
                  text="Thông tin cơ bản"
                  color="#181D27"
                  fontWeight="bold"
                />
                <TouchableOpacity
                  onPress={() =>
                    navigate.navigate(ROOT_ROUTES.PROFILE_STACK, {
                      screen: PROFILE_ROUTES.UPDATE_PROFILE,
                      params: {
                        profile,
                        handleGetAccountInfo,
                      },
                    })
                  }>
                  <Image
                    source={IMAGES.PROFILE.icon_edit_profile}
                    style={[sty.w_24, sty.h_24, sty.objectScaleDown]}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                style={[
                  sty.gap_16,
                  sty.p_12,
                  sty.border_1,
                  sty.borderSecondPrimary,
                  sty.rounded_16,
                ]}>
                <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
                  <TextDisplay text="Họ và tên:" color="#535862" />
                  <TextDisplay
                    text={profile?.user?.name || ''}
                    color="#181D27"
                    fontWeight="semibold"
                    textAlign="right"
                  />
                </View>
                <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
                  <TextDisplay text="Số điện thoại:" color="#535862" />
                  <TextDisplay
                    text={profile?.user?.phone || ''}
                    color="#181D27"
                    fontWeight="semibold"
                    textAlign="right"
                  />
                </View>
                {profile?.user?.roles?.id === 5 ? (
                  <>
                    <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
                      <TextDisplay text="Số CCCD:" color="#535862" />
                      <TextDisplay
                        text={profile?.employee?.cccd || ''}
                        color="#181D27"
                        fontWeight="semibold"
                        textAlign="right"
                      />
                    </View>
                    <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
                      <TextDisplay text="Địa chỉ:" color="#535862" />
                      <TextDisplay
                        text={profile?.employee?.address || ''}
                        color="#181D27"
                        fontWeight="semibold"
                        textAlign="right"
                      />
                    </View>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.FormDouble}>
                      <View style={styles.FormDoubleItem}>
                        <Image
                          source={{uri: profile?.employee?.before_card_id}}
                          style={styles.CCCD}
                        />
                      </View>
                      <View style={styles.FormDoubleItem}>
                        <Image
                          source={{uri: profile?.employee?.after_card_id}}
                          style={styles.CCCD}
                        />
                      </View>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
                      <TextDisplay text="Email:" color="#535862" />
                      <TextDisplay
                        text={profile?.user?.email || ''}
                        color="#181D27"
                        fontWeight="semibold"
                        textAlign="right"
                      />
                    </View>
                    <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
                      <TextDisplay text="Bộ phận:" color="#535862" />
                      <TextDisplay
                        text={profile?.user?.roles?.name || ''}
                        color="#181D27"
                        fontWeight="semibold"
                        textAlign="right"
                      />
                    </View>
                  </>
                )}
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity style={sty.gap_12} activeOpacity={1}>
              <TextDisplay
                text="Thông tin đăng nhập"
                color="#181D27"
                fontWeight="bold"
                fontSize={16}
                lineHeight={24}
              />
              <TouchableOpacity
                activeOpacity={1}
                style={[
                  sty.gap_16,
                  sty.p_12,
                  sty.border_1,
                  sty.borderSecondPrimary,
                  sty.rounded_16,
                ]}>
                <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
                  <TextDisplay text="Tên tài khoản:" color="#535862" />
                  <TextDisplay
                    text={profile?.user?.username || ''}
                    color="#181D27"
                    fontWeight="semibold"
                    textAlign="right"
                  />
                </View>
                <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
                  <TextDisplay text="Mật khẩu:" color="#535862" />
                  <TextDisplay
                    text="************"
                    color="#181D27"
                    fontWeight="semibold"
                    textAlign="right"
                  />
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigate.navigate(ROOT_ROUTES.PROFILE_STACK, {
                      screen: PROFILE_ROUTES.CHANGE_PASSWORD,
                    })
                  }
                  style={sty.selfStart}>
                  <TextDisplay
                    text="Đổi mật khẩu"
                    styles={sty.underline}
                    color="#1354D4"
                    fontWeight="semibold"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setOpenDelete(true)}
                  style={sty.selfStart}>
                  <TextDisplay
                    text="Xóa tài khoản"
                    styles={sty.underline}
                    color="#FF4D4F"
                    fontWeight="semibold"
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity style={sty.gap_12} activeOpacity={1}>
              <TextDisplay
                text="Thông tin khác"
                color="#181D27"
                fontWeight="bold"
                fontSize={16}
                lineHeight={24}
              />
              <TouchableOpacity
                activeOpacity={1}
                style={[
                  sty.gap_16,
                  sty.p_12,
                  sty.border_1,
                  sty.borderSecondPrimary,
                  sty.rounded_16,
                ]}>
                {profile?.user?.roles?.id === 5 ? (
                  <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
                    <TextDisplay text="Khách hàng:" color="#535862" />
                    <TextDisplay
                      text={profile?.employee?.customer?.name}
                      color="#181D27"
                      fontWeight="semibold"
                      textAlign="right"
                    />
                  </View>
                ) : (
                  <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
                    <TextDisplay text="Khách hàng:" color="#535862" />
                    <TextDisplay
                      text={
                        profile?.user?.clients?.length > 0
                          ? profile?.user?.clients
                              ?.map((item: ClientParams) => item?.name)
                              .join(' ,')
                          : ''
                      }
                      color="#181D27"
                      fontWeight="semibold"
                      textAlign="right"
                    />
                  </View>
                )}
                {profile?.user?.roles?.id === 5 && (
                  <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
                    <TextDisplay text="Người tuyển dụng:" color="#535862" />
                    <TextDisplay
                      text={profile?.employee?.recruiter?.name || ''}
                      color="#181D27"
                      fontWeight="semibold"
                      textAlign="right"
                    />
                  </View>
                )}
              </TouchableOpacity>
            </TouchableOpacity>
          </ScrollView>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <ModalQuestion
        open={openDelete}
        setOpen={setOpenDelete}
        onCancel={() => setOpenDelete(false)}
        onSubmit={handleDeleteAccount}
        title="Bạn đang thao tác xóa tài khoản, bạn có chắc chắn muốn xóa không?"
        textSubmit="Xóa"
      />
    </GradientBackground>
  );
};

export default AccountInfo;

const styles = StyleSheet.create({
  Avatar: {
    width: 56,
    height: 56,
    objectFit: 'cover',
    borderWidth: 2,
    borderColor: '#1354D4',
    borderRadius: 9999,
  },
  CCCD: {
    height: 90,
    objectFit: 'scale-down',
    width: '100%',
  },
  FormDouble: {
    marginHorizontal: -6,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  FormDoubleItem: {
    paddingHorizontal: 6,
    flexBasis: '50%',
    flexGrow: 0,
    flexShrink: 0,
    flexDirection: 'row',
  },
});
