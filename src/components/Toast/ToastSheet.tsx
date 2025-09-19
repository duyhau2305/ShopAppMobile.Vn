import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Portal} from 'react-native-portalize';
import TextDisplay from '../TextDisplay';

interface ToastSheetProps {
  toastSheet: {
    open: boolean;
    title: string;
  };
  setToastSheet: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      title: string;
    }>
  >;
}

const ToastSheet = ({toastSheet, setToastSheet}: ToastSheetProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (toastSheet.open) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [fadeAnim, toastSheet.open]);
  return (
    <Portal>
      <Animated.View style={[styles.Overlay, {opacity: fadeAnim}]}>
        <TouchableOpacity
          style={styles.OverlayTouchable}
          activeOpacity={1}
          onPress={() =>
            setToastSheet({
              open: false,
              title: toastSheet.title,
            })
          }>
          <TouchableOpacity activeOpacity={1} style={styles.Toast}>
            <TextDisplay
              fontSize={16}
              lineHeight={24}
              textAlign="center"
              text={toastSheet.title}
              color="#fff"
              fontWeight="semibold"
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>
    </Portal>
  );
};

export default ToastSheet;

const styles = StyleSheet.create({
  Overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  OverlayTouchable: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  Toast: {
    backgroundColor: '#4A4F63',
    padding: 12,
    borderRadius: 16,
    alignSelf: 'center',
    zIndex: 999,
  },
});
