import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {Portal} from 'react-native-portalize';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  setFilterStatus,
  setFilterType,
} from '../../../redux/slices/takeOffSlice';
import sty from '../../../themes/sty';
import {ButtonCustom, FormSelect, HeaderBottomSheet} from '../../../components';
import {
  LIST_STATUS_TAKE_OFF,
  LIST_TYPE_TAKE_OFF,
} from '../../../common/constants';
import SheetStatus from './SheetStatus';
import SheetType from './SheetType';

interface FilterListTakeOffProps {
  sheetRef: any;
}

const FilterListTakeOff = ({sheetRef}: FilterListTakeOffProps) => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const scrollViewRef = useRef<ScrollView>(null);
  const sheetTypeRef = useRef<BottomSheet>(null);
  const sheetStatusRef = useRef<BottomSheet>(null);
  const {filter} = useAppSelector(state => state.takeOff);

  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [type, setType] = useState<number>();
  const [status, setStatus] = useState<number>();

  useEffect(() => {
    if (openSheet) {
      setType(filter?.type);
      setStatus(filter?.status);
    }
  }, [filter?.status, filter?.type, openSheet]);

  const handleSubmit = () => {
    dispatch(setFilterStatus(status));
    dispatch(setFilterType(type));
    sheetRef?.current?.close();
  };

  return (
    <Portal>
      <BottomSheet
        index={-1}
        ref={sheetRef}
        snapPoints={['90%']}
        onChange={index => setOpenSheet(index > -1)}
        handleComponent={null}
        enablePanDownToClose={true}
        footerComponent={(props: any) => (
          <BottomSheetFooter
            {...props}
            style={[sty.p_16, sty.bg_white, {paddingBottom: insets.bottom}]}>
            <ButtonCustom text="Áp dụng" onPress={handleSubmit} />
          </BottomSheetFooter>
        )}
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
              title="Bộ lọc"
              onClose={() => sheetRef?.current?.close()}
            />
            <BottomSheetScrollView
              ref={scrollViewRef}
              contentContainerStyle={[
                sty.p_16,
                sty.gap_12,
                sty.relative,
                {
                  paddingBottom: insets.bottom + 72,
                },
              ]}>
              <FormSelect
                onPress={() => sheetTypeRef?.current?.expand()}
                label="Loại yêu cầu"
                value={
                  LIST_TYPE_TAKE_OFF?.find(item => item?.type === type)
                    ?.label || 'Tất cả loại yêu cầu'
                }
              />
              <FormSelect
                onPress={() => sheetStatusRef?.current?.expand()}
                label="Trạng thái"
                value={
                  LIST_STATUS_TAKE_OFF?.find(item => item?.status === status)
                    ?.label || 'Tất cả trạng thái'
                }
              />
            </BottomSheetScrollView>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </BottomSheet>
      <SheetStatus
        sheetRef={sheetStatusRef}
        status={status}
        setStatus={setStatus}
      />
      <SheetType sheetRef={sheetTypeRef} type={type} setType={setType} />
    </Portal>
  );
};

export default FilterListTakeOff;
