import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import sty from '../../../themes/sty';
import {DividerCustom, TextDisplay} from '../../../components';
import IMAGES from '../../../assets/images';
import {useNavigation} from '@react-navigation/native';
import {PROFILE_ROUTES, ROOT_ROUTES} from '../../../routes';
import {useAppSelector} from '../../../redux/hooks';

const ProfileFunction = () => {
  const {role} = useAppSelector(state => state.auth);
  const navigate = useNavigation<any>();
  return (
    <View style={sty.gap_16}>
      <View style={sty.gap_8}>
        <TextDisplay
          color="#181D27"
          fontSize={16}
          lineHeight={24}
          fontWeight="bold"
          text="Cá nhân"
        />
        <TouchableOpacity activeOpacity={1} style={styles.GroupFunction}>
          <TouchableOpacity
            onPress={() =>
              navigate.navigate(ROOT_ROUTES.PROFILE_STACK, {
                screen: PROFILE_ROUTES.ACCOUNT_INFO,
              })
            }
            style={styles.ButtonFunction}>
            <View style={styles.ButtonFunctionContent}>
              <Image
                source={IMAGES.PROFILE.function_account_info}
                style={styles.IconFunction}
              />
              <TextDisplay
                text="Thông tin tài khoản"
                color="#444A55"
                fontWeight="semibold"
              />
            </View>
            <Image
              source={IMAGES.PROFILE.expand_function}
              style={styles.IconArrowFunction}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <View style={sty.gap_8}>
        <TextDisplay
          color="#181D27"
          fontSize={16}
          lineHeight={24}
          fontWeight="bold"
          text="Cài đặt"
        />
        <TouchableOpacity activeOpacity={1} style={styles.GroupFunction}>
          {role?.role_id !== 5 && (
            <>
              <TouchableOpacity
                onPress={() =>
                  navigate.navigate(ROOT_ROUTES.PROFILE_STACK, {
                    screen: PROFILE_ROUTES.CONFIG_WIFI,
                  })
                }
                style={styles.ButtonFunction}>
                <View style={styles.ButtonFunctionContent}>
                  <Image
                    source={IMAGES.PROFILE.function_config_wifi}
                    style={styles.IconFunction}
                  />
                  <TextDisplay
                    text="Cấu hình chấm công"
                    color="#444A55"
                    fontWeight="semibold"
                  />
                </View>
                <Image
                  source={IMAGES.PROFILE.expand_function}
                  style={styles.IconArrowFunction}
                />
              </TouchableOpacity>
              <DividerCustom />
            </>
          )}
          <TouchableOpacity onPress={() => {}} style={styles.ButtonFunction}>
            <View style={styles.ButtonFunctionContent}>
              <Image
                source={IMAGES.PROFILE.function_account_info}
                style={styles.IconFunction}
              />
              <TextDisplay
                text="Ngôn ngữ"
                color="#444A55"
                fontWeight="semibold"
              />
            </View>
            <TextDisplay
              text="Tiếng Việt"
              color="#444A55"
              fontWeight="semibold"
            />
          </TouchableOpacity>
          <DividerCustom />
          <TouchableOpacity
            onPress={() =>
              navigate.navigate(ROOT_ROUTES.PROFILE_STACK, {
                screen: PROFILE_ROUTES.FONT_SIZE,
              })
            }
            style={styles.ButtonFunction}>
            <View style={styles.ButtonFunctionContent}>
              <Image
                source={IMAGES.PROFILE.function_font_size}
                style={styles.IconFunction}
              />
              <TextDisplay
                text="Cỡ chữ"
                color="#444A55"
                fontWeight="semibold"
              />
            </View>
            <Image
              source={IMAGES.PROFILE.expand_function}
              style={styles.IconArrowFunction}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileFunction;

const styles = StyleSheet.create({
  IconFunction: {
    width: 20,
    height: 20,
    objectFit: 'scale-down',
  },
  GroupFunction: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#dbdfe5',
    paddingHorizontal: 16,
  },
  ButtonFunction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
  },
  ButtonFunctionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 1,
  },
  IconArrowFunction: {
    width: 16,
    height: 16,
    objectFit: 'scale-down',
  },
});
