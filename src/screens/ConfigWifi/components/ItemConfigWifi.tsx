import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import sty from '../../../themes/sty';
import {ButtonCustom, TextDisplay} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import {PROFILE_ROUTES, ROOT_ROUTES} from '../../../routes';
import {ConfigWifiParams} from '../../../interfaces/configWifi';

interface ItemConfigWifiProps {
  data: ConfigWifiParams;
  handleGetListConfigWifi: () => any;
}

const ItemConfigWifi = ({
  data,
  handleGetListConfigWifi,
}: ItemConfigWifiProps) => {
  const navigate = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigate.navigate(ROOT_ROUTES.PROFILE_STACK, {
          screen: PROFILE_ROUTES.INFO_CONFIG_WIFI,
          params: {
            data,
            handleGetListConfigWifi,
          },
        })
      }
      style={[
        sty.gap_12,
        sty.borderSecondPrimary,
        sty.border_1,
        sty.rounded_12,
        sty.p_12,
      ]}>
      <TextDisplay
        text={data?.name}
        color="#181D27"
        fontSize={16}
        lineHeight={24}
        fontWeight="bold"
      />
      <ButtonCustom
        onPress={undefined}
        disabled
        text={
          data?.wifi_locations?.length > 0
            ? 'Đã cấu hình wifi chấm công'
            : 'Chưa cấu hình wifi chấm công'
        }
        color={data?.wifi_locations?.length > 0 ? '#1354D4' : '#F79009'}
        backgroundColor={
          data?.wifi_locations?.length > 0 ? '#DEE7F6' : '#FDE9CE'
        }
        fontSize={14}
        lineHeight={20}
        style={[sty.py_4, sty.rounded_8, sty.selfStart, sty.w_auto]}
      />
      <View style={[sty.flexRow, sty.gap_12, sty.justifyBetween]}>
        <TextDisplay text="Địa chỉ:" color="#181D27" />
        <TextDisplay
          text={data?.address}
          color="#181D27"
          fontWeight="semibold"
        />
      </View>
    </TouchableOpacity>
  );
};

export default ItemConfigWifi;
