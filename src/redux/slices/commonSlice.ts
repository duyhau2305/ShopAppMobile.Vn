import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CommonState} from '../interface';

const initialState = {
  openSuccess: false,
  titleSuccess: 'Thành công',
  openLoading: false,
  openToast: false,
  toastTitle: 'Có lỗi xảy ra vui lòng thử lại',
  fontSize: 'mini',
  openWarningTimekeeping: false,
  openNoti: false,
  notiTitle: 'Có thông báo',
} as CommonState;

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setModalLoading(state, action: PayloadAction<boolean>) {
      state.openLoading = action.payload;
    },
    setModalSuccess(
      state,
      action: PayloadAction<{
        open: boolean;
        title?: string;
      }>,
    ) {
      state.openSuccess = action.payload?.open;
      state.titleSuccess = action.payload?.title;
    },
    setToast(
      state,
      action: PayloadAction<{
        open: boolean;
        title?: string;
      }>,
    ) {
      state.openToast = action.payload?.open;
      state.titleToast = action.payload?.title;
    },
    setFontSize(state, action: PayloadAction<string>) {
      state.fontSize = action.payload;
    },

    setModalWarningTimekeeping(state, action: PayloadAction<boolean>) {
      state.openWarningTimekeeping = action.payload;
    },
    setToastNoti(
      state,
      action: PayloadAction<{
        open: boolean;
        title?: string;
      }>,
    ) {
      state.openNoti = action.payload?.open;
      state.notiTitle = action.payload?.title;
    },
  },
});

export const {
  setModalLoading,
  setToast,
  setFontSize,
  setModalSuccess,
  setModalWarningTimekeeping,
  setToastNoti,
} = commonSlice.actions;

export default commonSlice.reducer;
