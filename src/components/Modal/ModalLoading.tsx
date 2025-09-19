import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import React from 'react';
import { useAppSelector } from '../../redux/hooks';

const ModalLoading = () => {
  const { openLoading } = useAppSelector(state => state.common);
  return (
    <Modal transparent={true} animationType="fade" visible={openLoading}>
      <View style={styles.ModalBackground}>
        <View style={styles.LoadingContainer}>
          <ActivityIndicator />
        </View>
      </View>
    </Modal>
  );
};

export default ModalLoading;

const styles = StyleSheet.create({
  ModalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  LoadingContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});
