import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {InfoState} from '../interface';

const initialState = {
  activeLocation: 0,
  activeWifi: 0,
  activeInternal: 0,
} as InfoState;

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setInfoState(
      state,
      action: PayloadAction<{
        gps_locations: number;
        wifi_locations: number;
        is_internal: number;
      }>,
    ) {
      state.activeLocation = action.payload?.gps_locations;
      state.activeWifi = action.payload?.wifi_locations;
      state.activeInternal = action.payload?.is_internal;
    },
    resetInfoState() {
      return initialState;
    },
  },
});

export const {resetInfoState, setInfoState} = infoSlice.actions;

export default infoSlice.reducer;
