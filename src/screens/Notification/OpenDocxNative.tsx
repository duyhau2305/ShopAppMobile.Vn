import React, {useState} from 'react';
import {
  View,
  Alert,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import sty from '../../themes/sty';
import {LoadingTable, TextDisplay} from '../../components';
import IMAGES from '../../assets/images';

type Props = {
  url: string; // link .docx của bạn
  fileName?: string; // optional: tên file hiển thị (không chứa ký tự lạ)
};

const OpenDocxNative = ({url, fileName}: Props) => {
  const [loading, setLoading] = useState(false);

  const getDestPath = () => {
    const ext = url.split('?')[0].split('.').pop() || 'dat';
    const safeName = (fileName || `file.${ext}`).replace(/[^\w\-. ]+/g, '_');

    if (Platform.OS === 'ios') {
      return `${RNFS.TemporaryDirectoryPath}${safeName}`;
    } else {
      return `${RNFS.CachesDirectoryPath}/${safeName}`;
    }
  };
  const openFile = async () => {
    try {
      setLoading(true);

      const dest = getDestPath();

      const task = RNFS.downloadFile({
        fromUrl: url,
        toFile: dest,
        progressDivider: 5,
      });
      const res = await task.promise;
      if (res.statusCode && res.statusCode >= 400) {
        throw new Error(`HTTP ${res.statusCode}`);
      }
      await FileViewer.open(dest, {
        showOpenWithDialog: true, // Android: chọn app viewer nếu có nhiều
      });
    } catch (e: any) {
      Alert.alert('Không thể mở file', e?.message || 'Có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={openFile}
        style={[
          sty.flexRow,
          sty.gap_8,
          sty.itemsCenter,
          sty.p_12,
          sty.border_1,
          sty.borderSecondPrimary,
          sty.rounded_12,
          styles.ButtonFile,
        ]}>
        <Image
          source={IMAGES.HOME.icon_file}
          style={[sty.w_20, sty.h_20, sty.objectScaleDown]}
        />
        <TextDisplay text={fileName} color="#181D27" fontWeight="semibold" />
        {loading && <LoadingTable />}
      </TouchableOpacity>
    </View>
  );
};

export default OpenDocxNative;

const styles = StyleSheet.create({
  ButtonFile: {
    backgroundColor: '#EDEFF2',
  },
});
