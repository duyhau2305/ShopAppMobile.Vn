import {RequestParams} from './../../interfaces/request';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RequestState} from '../interface';
import {PAGINATION_DEFAULT} from '../../common/constants';

const initialState = {
  listRequest: [],
  pagination: PAGINATION_DEFAULT,
} as RequestState;

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setListRequest(state, action: PayloadAction<RequestParams[]>) {
      state.listRequest = action.payload;
    },
    setPaginationRequest(state, action) {
      state.pagination = action.payload;
    },
    resetRequestState() {
      return initialState;
    },
  },
});

export const {resetRequestState, setPaginationRequest, setListRequest} =
  requestSlice.actions;

export default requestSlice.reducer;
