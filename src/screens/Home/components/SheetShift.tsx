import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {HeaderBottomSheet, TextDisplay} from '../../../components';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import NoData from '../../../components/NoData';
import stylesComponent from '../../../themes/styComponents';
import sty from '../../../themes/sty';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {formatTime} from '../../../utils/helpers';
import {ShiftParams} from '../../../interfaces/shift';
import {Portal} from 'react-native-portalize';

const {height} = Dimensions.get('window');

interface SheetShiftProps {
  sheetRef: any;
  shift?: ShiftParams;
  setShift: React.Dispatch<React.SetStateAction<ShiftParams | undefined>>;
  listShift: ShiftParams[];
}

const SheetShift = ({
  sheetRef,
  shift,
  setShift,
  listShift,
}: SheetShiftProps) => {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [value, setValue] = useState<ShiftParams>();

  useEffect(() => {
    if (openSheet) {
      setValue(shift);
      scrollViewRef.current?.scrollTo({y: 0, animated: true});
    }
  }, [shift, openSheet]);

  const handleSubmit = (data: ShiftParams) => {
    setShift(data);
    sheetRef?.current?.close();
  };

  return (
    <Portal>
      <BottomSheet
        index={-1}
        ref={sheetRef}
        snapPoints={['90%']}
        handleComponent={null}
        enablePanDownToClose={true}
        enableDynamicSizing={false}
        maxDynamicContentSize={(height * 90) / 100}
        onChange={index => setOpenSheet(index > -1)}
        backdropComponent={props => (
          <BottomSheetBackdrop
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior="close"
            {...props}
          />
        )}>
        <TouchableOpacity
          style={sty.flex_1}
          activeOpacity={1}
          onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={[sty.flex_1, sty.h_full]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <HeaderBottomSheet
              title="Ca làm việc"
              onClose={() => sheetRef?.current?.close()}
            />
            <BottomSheetScrollView
              ref={scrollViewRef}
              contentContainerStyle={[
                sty.p_16,
                sty.gap_12,
                {
                  paddingBottom: insets.bottom + 16,
                },
              ]}>
              {listShift?.length > 0 ? (
                listShift?.map(item => (
                  <TouchableOpacity
                    key={item?.id}
                    style={stylesComponent.ButtonRadio}
                    onPress={() => handleSubmit(item)}>
                    <View
                      style={[
                        stylesComponent.RadioItem,
                        {
                          borderColor:
                            value?.id === item?.id ? '#1354D4' : '#b6bfca',
                        },
                      ]}>
                      <View
                        style={[
                          stylesComponent.RadioInner,
                          {
                            backgroundColor:
                              value?.id === item?.id ? '#1354D4' : '#fff',
                          },
                        ]}></View>
                    </View>
                    <TextDisplay
                      text={`${item?.name} (${formatTime(
                        item?.time_start,
                      )} - ${formatTime(item?.time_end)})`}
                      color="#444A55"
                      fontWeight="semibold"
                    />
                  </TouchableOpacity>
                ))
              ) : (
                <NoData />
              )}
            </BottomSheetScrollView>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </BottomSheet>
    </Portal>
  );
};

export default SheetShift;
