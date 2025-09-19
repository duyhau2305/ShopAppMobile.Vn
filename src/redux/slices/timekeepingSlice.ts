import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TimekeepingState} from '../interface';

const initialState = {
  shift: undefined,
  status_check_in: 0,
} as TimekeepingState;

const timekeepingSlice = createSlice({
  name: 'timekeeping',
  initialState,
  reducers: {
    setShiftTimekeeping(state, action) {
      state.shift = action.payload;
    },
    setStatusTimekeeping(state, action: PayloadAction<number>) {
      state.status_check_in = action.payload;
    },
    resetTimekeepingState() {
      return initialState;
    },
  },
});

export const {
  resetTimekeepingState,
  setShiftTimekeeping,
  setStatusTimekeeping,
} = timekeepingSlice.actions;

export default timekeepingSlice.reducer;
