import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TakeOffState} from '../interface';
import {PAGINATION_DEFAULT} from '../../common/constants';
import {TakeOffParams} from '../../interfaces/takeOff';

const initialState = {
  listTakeOff: [],
  filter: {
    type: undefined,
    status: undefined,
  },
  pagination: PAGINATION_DEFAULT,
} as TakeOffState;

const takeOffSlice = createSlice({
  name: 'takeOff',
  initialState,
  reducers: {
    setListTakeOff(state, action: PayloadAction<TakeOffParams[]>) {
      state.listTakeOff = action.payload;
    },
    setPaginationTakeOff(state, action) {
      state.pagination = action.payload;
    },
    setFilterType(state, action: PayloadAction<number | undefined>) {
      state.filter.type = action.payload;
    },
    setFilterStatus(state, action: PayloadAction<number | undefined>) {
      state.filter.status = action.payload;
    },
    resetTakeOffState() {
      return initialState;
    },
  },
});

export const {
  setListTakeOff,
  resetTakeOffState,
  setPaginationTakeOff,
  setFilterType,
  setFilterStatus,
} = takeOffSlice.actions;

export default takeOffSlice.reducer;
