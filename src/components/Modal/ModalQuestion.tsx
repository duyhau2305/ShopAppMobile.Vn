import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import IMAGES from '../../assets/images';
import TextDisplay from '../TextDisplay';
import ButtonCustom from '../Button/ButtonCustom';
import {Portal} from 'react-native-portalize';
import sty from '../../themes/sty';

const {width} = Dimensions.get('window');

interface ModalQuestionProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel: () => any;
  onSubmit: () => any;
  title: string;
  textSubmit?: string;
  textCancel?: string;
  primary?: boolean;
}

const ModalQuestion = ({
  title,
  textCancel,
  textSubmit,
  onCancel,
  onSubmit,
  open,
  setOpen,
  primary,
}: ModalQuestionProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (open) {
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
  }, [fadeAnim, open]);
  return (
    <Portal>
      <Animated.View style={[styles.Overlay, {opacity: fadeAnim}]}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.BackGroundModal}
          onPress={() => setOpen(false)}>
          <TouchableOpacity activeOpacity={1} style={styles.ModalContainer}>
            <Image
              source={IMAGES.COMMON.icon_question}
              style={styles.IconQuestion}
            />
            <TextDisplay
              fontSize={16}
              lineHeight={24}
              textAlign="center"
              color="#393D42"
              fontWeight="semibold"
              text={title}
            />
            <View style={styles.FormDouble}>
              <View style={styles.FormDoubleItem}>
                <ButtonCustom
                  text={textCancel || 'Hủy'}
                  backgroundColor="#EDEFF2"
                  color="#393D42"
                  onPress={onCancel}
                  style={sty.rounded_8}
                />
              </View>
              <View style={styles.FormDoubleItem}>
                <ButtonCustom
                  text={textSubmit || 'Đồng ý'}
                  onPress={onSubmit}
                  backgroundColor={primary ? '#1354D4' : '#FF4D4F'}
                  style={sty.rounded_8}
                />
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>
    </Portal>
  );
};

export default ModalQuestion;

const styles = StyleSheet.create({
  Overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BackGroundModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  ModalContainer: {
    padding: 12,
    maxWidth: '100%',
    borderRadius: 16,
    gap: 8,
    backgroundColor: '#fff',
    minWidth: (width * 80) / 100,
  },
  IconQuestion: {
    width: 100,
    height: 100,
    objectFit: 'scale-down',
    alignSelf: 'center',
  },
  FormDouble: {
    marginHorizontal: -6,
    flexDirection: 'row',
    alignItems: 'stretch',
    flexShrink: 1,
  },
  FormDoubleItem: {
    paddingHorizontal: 6,
    flexBasis: '50%',
    flexGrow: 0,
    flexShrink: 0,
    flexDirection: 'row',
  },
});
