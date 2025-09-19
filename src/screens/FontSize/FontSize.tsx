import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonCustom,
  DividerCustom,
  GradientBackground,
  TextDisplay,
} from '../../components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setFontSize} from '../../redux/slices/commonSlice';
import {useNavigation} from '@react-navigation/native';
import sty from '../../themes/sty';
import TextTest from './components/TextTest';
import stylesComponent from '../../themes/styComponents';
import IMAGES from '../../assets/images';

const FontSize = () => {
  const insets = useSafeAreaInsets();
  const navigate = useNavigation();
  const dispatch = useAppDispatch();
  const {fontSize} = useAppSelector(state => state.common);
  const fontSizes = ['mini', 'normal', 'big', 'largest'];
  const [level, setLevel] = useState<number>(0);

  useEffect(() => {
    setLevel(Number(fontSizes?.indexOf(fontSize)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fontSize]);

  const handleSubmit = () => {
    dispatch(setFontSize(fontSizes[level]));
    navigate.goBack();
  };

  return (
    <GradientBackground>
      <View
        style={[
          {paddingTop: insets.top},
          sty.pr_16,
          sty.flexRow,
          sty.itemsCenter,
        ]}>
        <TouchableOpacity
          activeOpacity={1}
          style={sty.p_16}
          onPress={() => navigate.goBack()}>
          <Image
            style={[sty.w_20, sty.h_20, sty.objectScaleDown]}
            source={IMAGES.COMMON.icon_back_screen}
          />
        </TouchableOpacity>
        <TextTest
          text="Cỡ chữ"
          fontSize={18}
          lineHeight={24}
          color="#212326"
          fontWeight="bold"
          level={fontSizes[level]}
        />
      </View>
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
              {paddingBottom: insets.bottom + 300},
              sty.gap_12,
            ]}
            showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              activeOpacity={1}
              style={[
                sty.rounded_12,
                sty.p_12,
                sty.bg_white,
                sty.gap_12,
                sty.border_1,
                sty.borderSecondPrimary,
              ]}>
              <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
                <TextTest
                  level={fontSizes[level]}
                  text="Chu Trần Bảo Chi"
                  fontSize={16}
                  lineHeight={24}
                  fontWeight="bold"
                  color="#181D27"
                />
                <View style={styles.Label}>
                  <TextTest
                    level={fontSizes[level]}
                    color="#1354D4"
                    fontSize={12}
                    lineHeight={16}
                    text="Đang làm việc"
                  />
                </View>
              </View>
              <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
                <TextTest
                  text="Số điện thoại:"
                  level={fontSizes[level]}
                  color="#535862"
                />
                <TextTest
                  text="0348934565"
                  level={fontSizes[level]}
                  color="#181D27"
                  fontWeight="semibold"
                  textAlign="right"
                />
              </View>
              <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
                <TextTest
                  text="Địa chỉ:"
                  level={fontSizes[level]}
                  color="#535862"
                />
                <TextTest
                  text="Quận Nam Từ Liêm, Hà Nội"
                  level={fontSizes[level]}
                  color="#181D27"
                  fontWeight="semibold"
                  textAlign="right"
                />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View
        style={[stylesComponent.Footer, {paddingBottom: insets.bottom + 8}]}>
        <TextTest
          level={fontSizes[level]}
          text="Điều chỉnh cỡ chữ"
          fontWeight="bold"
          fontSize={18}
          lineHeight={24}
          color="#393D42"
        />
        <TextTest
          level={fontSizes[level]}
          text="Sử dụng thanh trượt để xem trước và chọn cỡ chữ"
          fontSize={16}
          color="#393D42"
          lineHeight={24}
        />
        <View
          style={[
            sty.flexRow,
            sty.itemsCenter,
            sty.gap_8,
            sty.shrink_1,
            sty.mb_16,
          ]}>
          <TextDisplay
            text="A"
            color="#393D42"
            fontSize={12}
            lineHeight={16}
            fontWeight="bold"
          />
          <Slider
            minimumValue={0}
            maximumValue={3}
            step={1}
            value={level}
            onValueChange={setLevel}
            minimumTrackTintColor="#1354D4"
            maximumTrackTintColor="#D9D9D9"
            thumbTintColor="#1354D4"
            style={sty.grow_1}
          />
          <TextDisplay
            text="A"
            color="#393D42"
            fontSize={18}
            lineHeight={24}
            fontWeight="bold"
          />
        </View>
        <ButtonCustom text="Điều chỉnh" onPress={handleSubmit} />
      </View>
    </GradientBackground>
  );
};

export default FontSize;

const styles = StyleSheet.create({
  Label: {
    backgroundColor: '#D8E5FF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
});
