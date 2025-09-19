import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import sty from '../../../themes/sty';
import {TextDisplay} from '../../../components';

interface SegmentTypeWifiProps {
  type: string;
  setType: (value: string) => any;
}

const SegmentTypeWifi = ({type, setType}: SegmentTypeWifiProps) => {
  return (
    <View style={sty.px_16}>
      <View style={styles.Segment}>
        <View style={styles.ButtonTypeWrapper}>
          <View style={styles.ButtonType}>
            <TouchableOpacity
              onPress={() => setType('BSSID')}
              style={[
                sty.p_8,
                sty.rounded_8,
                type === 'BSSID' ? sty.bg_primary : sty.bg_transparent,
              ]}>
              <TextDisplay
                text="BSSID"
                fontSize={16}
                lineHeight={24}
                textAlign="center"
                color={type === 'BSSID' ? '#fff' : '#6B727B'}
                fontWeight="semibold"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.ButtonType}>
            <TouchableOpacity
              onPress={() => setType('IP')}
              style={[
                sty.p_8,
                sty.rounded_8,
                type === 'IP' ? sty.bg_primary : sty.bg_transparent,
              ]}>
              <TextDisplay
                text="IP"
                fontSize={16}
                lineHeight={24}
                textAlign="center"
                color={type === 'IP' ? '#fff' : '#6B727B'}
                fontWeight="semibold"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SegmentTypeWifi;

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
