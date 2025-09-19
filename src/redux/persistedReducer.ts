import {persistReducer} from 'redux-persist';
import mmkvStorage from './mmkv-store';
import {combineReducers} from '@reduxjs/toolkit';

import commonReducer from './slices/commonSlice';
import authReducer from './slices/authSlice';
import collaboratorReducer from './slices/collaboratorSlice';
import notificationReducer from './slices/notificationSlice';
import takeOffReducer from './slices/takeOffSlice';
import requestReducer from './slices/requestSlice';
import configWifiReducer from './slices/configWifiSlice';
import infoReducer from './slices/infoSlice';
import timekeepingReducer from './slices/timekeepingSlice';
import timerReducer from './slices/timerSlice';
import registerReducer from './slices/registerSlice';
import sendWifiReducer from './slices/sendWifiSlice';

const persistConfig = {
  key: 'root',
  storage: mmkvStorage,
  whitelist: [''],
  blacklist: [''],
};
const commonPersistConfig = {
  key: 'common',
  storage: mmkvStorage,
  blacklist: [
    'openSuccess',
    'openLoading',
    'openToast',
    'openWarningTimekeeping',
    'openConfigWifi',
  ],
};
const authPersistConfig = {
  key: 'auth',
  storage: mmkvStorage,
};
const notificationPersistConfig = {
  key: 'notification',
  storage: mmkvStorage,
};
const timekeepingPersistConfig = {
  key: 'timekeeping',
  storage: mmkvStorage,
};

export const rootReducer = combineReducers({
  common: persistReducer(commonPersistConfig, commonReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  notification: persistReducer(notificationPersistConfig, notificationReducer),
  timekeeping: persistReducer(timekeepingPersistConfig, timekeepingReducer),
  collaborator: collaboratorReducer,
  takeOff: takeOffReducer,
  request: requestReducer,
  configWifi: configWifiReducer,
  info: infoReducer,
  timer: timerReducer,
  register: registerReducer,
  sendWifi: sendWifiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
