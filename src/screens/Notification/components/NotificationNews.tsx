import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {NotificationParams} from '../../../interfaces/notification';
import sty from '../../../themes/sty';
import AutoHeightWebView from 'react-native-autoheight-webview';
import OpenDocxNative from '../OpenDocxNative';

interface NotificationNewsProps {
  data: NotificationParams;
}

const NotificationNews = ({data}: NotificationNewsProps) => {
  return (
    <TouchableOpacity activeOpacity={1} style={sty.gap_12}>
      <Image
        style={styles.ImageNews}
        source={{
          uri: data?.data?.image,
        }}
      />
      {!!data?.data?.description && (
        <AutoHeightWebView
          scalesPageToFit={false}
          scrollEnabled={false}
          style={sty.w_full}
          viewportContent="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          source={{html: data?.data?.description as any}}
        />
      )}
      {!!data?.data?.has_attachments && (
        <OpenDocxNative
          fileName={data?.data?.name_file}
          url={data?.data?.file}
        />
      )}
    </TouchableOpacity>
  );
};

export default NotificationNews;

const styles = StyleSheet.create({
  ImageNews: {
    height: 150,
    width: '100%',
    objectFit: 'cover',
    borderRadius: 16,
  },
  ButtonFile: {
    backgroundColor: '#EDEFF2',
  },
});
