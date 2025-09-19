import Config from 'react-native-config';
import {rootStore} from '../redux/store';
import {
  resetAuthState,
  setAccessToken,
  setRefreshToken,
} from '../redux/slices/authSlice';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import axios, {AxiosError} from 'axios';
import {clearTimer, resetTimer} from '../redux/slices/timerSlice';
import {resetCollaboratorState} from '../redux/slices/collaboratorSlice';
import {resetTakeOffState} from '../redux/slices/takeOffSlice';
import {resetRequestState} from '../redux/slices/requestSlice';
import {resetConfigWifiState} from '../redux/slices/configWifiSlice';
import {resetInfoState} from '../redux/slices/infoSlice';
import {resetTimekeepingState} from '../redux/slices/timekeepingSlice';

const handleClear = () => {
  rootStore.dispatch(resetAuthState());
  rootStore.dispatch(clearTimer());
  rootStore.dispatch(resetTimer());
  rootStore.dispatch(resetCollaboratorState());
  rootStore.dispatch(resetTakeOffState());
  rootStore.dispatch(resetRequestState());
  rootStore.dispatch(resetConfigWifiState());
  rootStore.dispatch(resetInfoState());
  rootStore.dispatch(resetTimekeepingState());
};

const axiosBase = axios.create({
  baseURL: Config.API_BASE,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'cache-control': 'no-cache',
    Accept: 'application/json',
  },
});

axiosBase.interceptors.request.use(
  function (config) {
    const token = rootStore.getState()?.auth?.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  },
);

axiosBase.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    //  ['message', 'name', 'code', 'config', 'request', 'response', 'status']
    console.log('ERROR AXIOS = ', error?.response);
    if (error.status === 401) {
      handleClear();
    }
    return Promise.reject(error);
  },
);

const refreshAuthLogic = async (failedRequest: AxiosError) => {
  const refreshToken = rootStore.getState()?.auth?.refresh_token;
  if (refreshToken) {
    try {
      console.log('Refresh Token');
      const response = await axios.get(`${Config.API_BASE}/refresh`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      console.log('Data Refresh: ', response);
      rootStore.dispatch(setAccessToken(response?.data?.data?.access_token));
      rootStore.dispatch(setRefreshToken(response?.data?.data?.refresh_token));
      axiosBase.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response?.data?.data?.access_token}`;
      return await Promise.resolve();
    } catch (error) {
      console.log('Error Refresh: ', error);
      handleClear();
      return await Promise.reject();
    }
  }
  handleClear();
  return await Promise.reject(failedRequest);
};

createAuthRefreshInterceptor(axiosBase, refreshAuthLogic, {
  statusCodes: [402],
  pauseInstanceWhileRefreshing: true,
});

export default axiosBase;
