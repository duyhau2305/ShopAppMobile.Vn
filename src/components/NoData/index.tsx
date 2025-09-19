import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import IMAGES from '../../assets/images';
import TextDisplay from '../TextDisplay';

interface NoDataProps {
  title?: string;
}

const NoData = ({ title }: NoDataProps) => {
  return (
    <View style={styles.NoDataWrapper}>
      <Image style={styles.ImageData} source={IMAGES.COMMON.no_data} />
      <TextDisplay text={title || 'Không có dữ liệu'} />
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  NoDataWrapper: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  ImageData: {
    width: 140,
    height: 120,
    objectFit: 'scale-down',
  },
});
