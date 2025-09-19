import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import sty from '../../../themes/sty';
import {TextDisplay} from '../../../components';

interface SegmentTakeOffProps {
  type: number;
  setType: React.Dispatch<React.SetStateAction<number>>;
}

const SegmentTakeOff = ({type, setType}: SegmentTakeOffProps) => {
  return (
    <View style={sty.px_16}>
      <View style={styles.Segment}>
        <View style={styles.ButtonTypeWrapper}>
          <View style={styles.ButtonType}>
            <TouchableOpacity
              onPress={() => setType(1)}
              style={[
                sty.p_8,
                sty.rounded_8,
                type === 1 ? sty.bg_primary : sty.bg_transparent,
              ]}>
              <TextDisplay
                text="Xin nghỉ phép"
                fontSize={16}
                lineHeight={24}
                textAlign="center"
                color={type === 1 ? '#fff' : '#6B727B'}
                fontWeight="semibold"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.ButtonType}>
            <TouchableOpacity
              onPress={() => setType(2)}
              style={[
                sty.p_8,
                sty.rounded_8,
                type === 2 ? sty.bg_primary : sty.bg_transparent,
              ]}>
              <TextDisplay
                text="Xin nghỉ việc"
                fontSize={16}
                lineHeight={24}
                textAlign="center"
                color={type === 2 ? '#fff' : '#6B727B'}
                fontWeight="semibold"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SegmentTakeOff;

const styles = StyleSheet.create({
  ButtonTypeWrapper: {
    marginHorizontal: -4,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  Segment: {
    backgroundColor: '#EDEFF2',
    padding: 4,
    borderRadius: 8,
  },
  ButtonType: {
    paddingHorizontal: 4,
    flexBasis: '50%',
    flexGrow: 0,
    flexShrink: 0,
  },
});
