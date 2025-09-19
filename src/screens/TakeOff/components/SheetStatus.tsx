import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import stylesComponent from '../../../themes/styComponents';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import sty from '../../../themes/sty';
import {HeaderBottomSheet, TextDisplay} from '../../../components';
import {LIST_STATUS_TAKE_OFF} from '../../../common/constants';

interface SheetStatusProps {
  sheetRef: any;
  status?: number;
  setStatus: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const SheetStatus = ({sheetRef, status, setStatus}: SheetStatusProps) => {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [value, setValue] = useState<number>();

  useEffect(() => {
    if (openSheet) {
      setValue(status);
    }
  }, [openSheet, status]);

  const handleSubmit = (data?: number) => {
    setStatus(data);
    sheetRef?.current?.close();
  };

  return (
    <BottomSheet
      index={-1}
      ref={sheetRef}
      snapPoints={['90%']}
      handleComponent={null}
      enablePanDownToClose={true}
      enableDynamicSizing={false}
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
          style={sty.flex_1}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <HeaderBottomSheet
            title="Trạng thái"
            onClose={() => sheetRef?.current?.close()}
          />
          <BottomSheetScrollView
            ref={scrollViewRef}
            bounces={false}
            contentContainerStyle={[
              sty.p_16,
              sty.gap_12,
              {
                paddingBottom: insets.bottom + 80,
              },
            ]}>
            {[
              {status: undefined, label: 'Tất cả trạng thái'},
              ...LIST_STATUS_TAKE_OFF,
            ]?.map(item => (
              <TouchableOpacity
                key={item?.status}
                style={stylesComponent.ButtonRadio}
                onPress={() => handleSubmit(item?.status)}>
                <View
                  style={[
                    stylesComponent.RadioItem,
                    {
                      borderColor:
                        value === item?.status ? '#1354D4' : '#b6bfca',
                    },
                  ]}>
                  <View
                    style={[
                      stylesComponent.RadioInner,
                      {
                        backgroundColor:
                          value === item?.status ? '#1354D4' : '#fff',
                      },
                    ]}></View>
                </View>
                <TextDisplay
                  text={item?.label}
                  color="#444A55"
                  fontWeight="semibold"
                />
              </TouchableOpacity>
            ))}
          </BottomSheetScrollView>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </BottomSheet>
  );
};

export default SheetStatus;
