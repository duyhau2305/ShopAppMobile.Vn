import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import TextDisplay from '../TextDisplay';

interface ButtonLoadMoreProps {
  onPress: any;
  title?: string;
}

const ButtonLoadMore = ({title, onPress}: ButtonLoadMoreProps) => {
  return (
    <TouchableOpacity
      style={styles.Button}
      activeOpacity={0.5}
      onPress={onPress}>
      <TextDisplay
        fontWeight="semibold"
        color="#1354D4"
        text={title || 'Xem thêm'}
      />
    </TouchableOpacity>
  );
};

export default ButtonLoadMore;

const styles = StyleSheet.create({
  Button: {
    padding: 8,
    borderColor: '#1354D4',
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
  },
});
