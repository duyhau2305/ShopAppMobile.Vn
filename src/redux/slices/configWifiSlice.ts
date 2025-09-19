import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ConfigWifiState} from '../interface';
import {PAGINATION_DEFAULT} from '../../common/constants';
import {ConfigWifiParams} from '../../interfaces/configWifi';

const initialState = {
  listConfig: [],
  pagination: PAGINATION_DEFAULT,
} as ConfigWifiState;

const configWifiSlice = createSlice({
  name: 'configWifi',
  initialState,
  reducers: {
    setListConfigWifi(state, action: PayloadAction<ConfigWifiParams[]>) {
      state.listConfig = action.payload;
    },
    setPaginationConfigWifi(state, action) {
      state.pagination = action.payload;
    },
    resetConfigWifiState() {
      return initialState;
    },
  },
});

export const {
  setListConfigWifi,
  resetConfigWifiState,
  setPaginationConfigWifi,
} = configWifiSlice.actions;

export default configWifiSlice.reducer;
