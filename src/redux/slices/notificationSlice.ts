import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NotificationState} from '../interface';
import {PAGINATION_DEFAULT} from '../../common/constants';
import {NotificationParams} from '../../interfaces/notification';

const initialState = {
  listNotification: [],
  pagination: PAGINATION_DEFAULT,
  totalUnRead: 0,
} as NotificationState;

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setListNotification(state, action: PayloadAction<NotificationParams[]>) {
      state.listNotification = action.payload;
    },
    setPaginationNotification(state, action) {
      state.pagination = action.payload;
    },
    setTotalUnRead(state, action: PayloadAction<number>) {
      state.totalUnRead = action.payload;
    },
  },
});

export const {setListNotification, setPaginationNotification, setTotalUnRead} =
  notificationSlice.actions;

export default notificationSlice.reducer;
