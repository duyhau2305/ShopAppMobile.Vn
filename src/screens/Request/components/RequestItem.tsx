import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import sty from '../../../themes/sty';
import {RequestParams} from '../../../interfaces/request';
import moment from 'moment';
import {LIST_STATUS_TAKE_OFF} from '../../../common/constants';
import {ButtonCustom, ModalQuestion, TextDisplay} from '../../../components';
import {handleErrorMessage} from '../../../utils/helpers';
import {useAppDispatch} from '../../../redux/hooks';
import {
  setModalLoading,
  setModalSuccess,
} from '../../../redux/slices/commonSlice';
import {patchRequestAPI} from '../../../apis/request';

interface RequestItemProps {
  data: RequestParams;
  handleGetListRequest: () => Promise<void>;
}

const RequestItem = ({data, handleGetListRequest}: RequestItemProps) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<boolean>(false);

  const handleSubmit = async (status: number) => {
    try {
      dispatch(setModalLoading(true));
      await patchRequestAPI(
        {
          status,
        },
        data?.id,
      );
      setOpen(false);
      handleGetListRequest();
      dispatch(
        setModalSuccess({
          open: true,
          title: 'Cập nhật đơn yêu cầu thành công.',
        }),
      );
      dispatch(setModalLoading(false));
    } catch (error) {
      dispatch(setModalLoading(false));
      handleErrorMessage(error);
    }
  };
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          sty.gap_12,
          sty.p_12,
          sty.rounded_16,
          sty.border_1,
          sty.borderSecondPrimary,
        ]}>
        <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
          <TextDisplay
            text={data?.name}
            color="#181D27"
            fontSize={16}
            lineHeight={24}
            fontWeight="bold"
          />
          <ButtonCustom
            text={
              LIST_STATUS_TAKE_OFF?.find(item => item?.status === data?.status)
                ?.label as string
            }
            onPress={undefined}
            disabled
            color={
              LIST_STATUS_TAKE_OFF?.find(item => item?.status === data?.status)
                ?.color
            }
            backgroundColor={
              LIST_STATUS_TAKE_OFF?.find(item => item?.status === data?.status)
                ?.background
            }
            fontSize={12}
            lineHeight={16}
            style={[
              sty.px_8,
              sty.py_4,
              sty.w_auto,
              sty.selfStart,
              sty.rounded_12,
            ]}
          />
        </View>
        <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
          <TextDisplay text="Người gửi:" color="#535862" />
          <TextDisplay
            text={data?.users?.name}
            color="#181D27"
            fontWeight="semibold"
            textAlign="right"
          />
        </View>
        <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
          <TextDisplay text="Ngày xin nghỉ:" color="#535862" />
          <TextDisplay
            text={moment(data?.date).format('DD/MM/YYYY')}
            color="#181D27"
            fontWeight="semibold"
            textAlign="right"
          />
        </View>
        <View style={[sty.flexRow, sty.justifyBetween, sty.gap_12]}>
          <TextDisplay text="Lý do:" color="#535862" />
          <TextDisplay
            text={data?.description}
            color="#181D27"
            fontWeight="semibold"
            textAlign="right"
          />
        </View>
        {data?.status === 1 && (
          <View style={styles.FormDouble}>
            <View style={styles.FormDoubleItem}>
              <ButtonCustom
                text="Từ chối"
                backgroundColor="#FF4D4F"
                style={[sty.py_4, sty.rounded_8]}
                onPress={() => {
                  setType(false);
                  setOpen(true);
                }}
              />
            </View>
            <View style={styles.FormDoubleItem}>
              <ButtonCustom
                text="Phê duyệt"
                style={[sty.py_4, sty.rounded_8]}
                onPress={() => {
                  setType(true);
                  setOpen(true);
                }}
              />
            </View>
          </View>
        )}
      </TouchableOpacity>
      <ModalQuestion
        setOpen={setOpen}
        open={open}
        title={`Bạn có chắn chắn muốn ${type ? 'phê duyệt' : 'từ chối'}?`}
        onCancel={() => setOpen(false)}
        onSubmit={() => handleSubmit(type ? 2 : 3)}
        primary={type}
      />
    </>
  );
};

export default RequestItem;

const styles = StyleSheet.create({
  FormDouble: {
    marginHorizontal: -6,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  FormDoubleItem: {
    paddingHorizontal: 6,
    flexBasis: '50%',
    flexGrow: 0,
    flexShrink: 0,
    flexDirection: 'row',
  },
});
