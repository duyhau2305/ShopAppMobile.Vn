import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GradientBackground, HeaderBack, DividerCustom} from '../../components';
import sty from '../../themes/sty';
import NotificationNews from './components/NotificationNews';
import NotificationTakeOff from './components/NotificationTakeOff';

const InfoNotification = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const {data} = route.params as any;
  return (
    <GradientBackground>
      <HeaderBack
        title={data?.title}
        subTitle={`${data?.hour} - ${data?.date}`}
      />
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
            {data?.data?.type_display === 1 ? (
              <NotificationNews data={data} />
            ) : (
              <NotificationTakeOff data={data} />
            )}
          </ScrollView>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

export default InfoNotification;
