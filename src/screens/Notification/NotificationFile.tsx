import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  GradientBackground,
  HeaderBack,
  DividerCustom,
  TextDisplay,
} from '../../components';
import sty from '../../themes/sty';
import WebView from 'react-native-webview';
import OpenDocxNative from './OpenDocxNative';

const NotificationFile = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const {data} = route.params as any;

  return (
    <GradientBackground>
      <HeaderBack title={data?.data?.name_file} />
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
              {paddingBottom: insets.bottom + 80},
            ]}
            showsVerticalScrollIndicator={false}>
            <View style={sty.flex_1}>
              <TextDisplay text="Thông tin" />
              <WebView
                source={{
                  uri: data?.data?.file,
                }}
                style={sty.flex_1}
                startInLoadingState
                originWhitelist={['*']}
                javaScriptEnabled
                domStorageEnabled
                renderLoading={() => <ActivityIndicator style={sty.flex_1} />}
              />
              <OpenDocxNative
                fileName="data?.data?.name_file"
                url={data?.data?.file}
              />
            </View>
          </ScrollView>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

export default NotificationFile;
