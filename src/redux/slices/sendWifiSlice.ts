import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SendWifiState} from '../interface';

const initialState = {
  open: false,
  type: 'BSSID',
} as SendWifiState;

const sendWifiSlice = createSlice({
  name: 'sendWifi',
  initialState,
  reducers: {
    setOpenSendWifi(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
    setTypeSend(state, action: PayloadAction<string>) {
      state.type = action.payload;
    },
  },
});

export const {setOpenSendWifi, setTypeSend} = sendWifiSlice.actions;

export default sendWifiSlice.reducer;
