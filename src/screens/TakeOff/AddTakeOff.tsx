import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ButtonCustom,
  DividerCustom,
  FormInputDateTime,
  FormInputText,
  GradientBackground,
  HeaderBack,
} from '../../components';
import sty from '../../themes/sty';
import stylesComponent from '../../themes/styComponents';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {useAppDispatch} from '../../redux/hooks';
import {
  setModalLoading,
  setModalSuccess,
  setToast,
} from '../../redux/slices/commonSlice';
import {handleErrorMessage} from '../../utils/helpers';
import {createTakeOffUser} from '../../apis/takeOff';
import SegmentTakeOff from './components/SegmentTakeOff';

const AddTakeOff = () => {
  const navigate = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const route = useRoute();
  const {handleGetListTakeOff} = route.params as any;

  const [openDate, setOpenDate] = useState<boolean>(false);
  const [date, setDate] = useState(new Date());
  const [reason, setReason] = useState<string>('');
  const [type, setType] = useState<number>(1);

  const handleCreateTakeOff = async () => {
    try {
      if (!date) {
        return dispatch(
          setToast({
            open: true,
            title: 'Ngày xin nghỉ là bắt buộc',
          }),
        );
      }
      if (!reason) {
        return dispatch(
          setToast({
            open: true,
            title: 'Lý do xin nghỉ là bắt buộc',
          }),
        );
      }
      dispatch(setModalLoading(true));
      await createTakeOffUser({
        date: moment(date).format('YYYY-MM-DD'),
        description: reason,
        type,
      });
      handleGetListTakeOff();
      navigate.goBack();
      dispatch(
        setModalSuccess({
          open: true,
          title: 'Tạo đơn xin nghỉ thành công.',
        }),
      );
      dispatch(setModalLoading(false));
    } catch (error) {
      dispatch(setModalLoading(false));
      handleErrorMessage(error);
    }
  };

  return (
    <GradientBackground>
      <HeaderBack title="Thêm đơn xin nghỉ phép" />
      <SegmentTakeOff type={type} setType={setType} />
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
              sty.gap_12,
              sty.p_16,
              {paddingBottom: insets.bottom + 160},
            ]}
            showsVerticalScrollIndicator={false}>
            <FormInputDateTime
              label="Ngày xin nghỉ"
              required
              value={moment(date).format('DD/MM/YYYY')}
              onPress={() => setOpenDate(true)}
            />
            <FormInputText
              label="Lý do xin nghỉ"
              required
              value={reason}
              onChangeText={(value: string) => setReason(value)}
            />
          </ScrollView>
        </TouchableOpacity>
        <View
          style={[stylesComponent.Footer, {paddingBottom: insets.bottom + 8}]}>
          <ButtonCustom text="Gửi yêu cầu" onPress={handleCreateTakeOff} />
        </View>
      </KeyboardAvoidingView>
      <DatePicker
        modal
        open={openDate}
        date={date}
        mode="date"
        locale="vi"
        title="Chọn ngày xin nghỉ"
        confirmText="Xác nhận"
        cancelText="Huỷ"
        onConfirm={value => {
          setOpenDate(false);
          setDate(value);
        }}
        onCancel={() => setOpenDate(false)}
        minimumDate={new Date()}
      />
    </GradientBackground>
  );
};

export default AddTakeOff;
