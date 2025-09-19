import axiosBase from '../utils/axiosBase';

export const sendConfigWifiAPI = (params: {
  type: string;
  ssid: string;
  bssid?: string;
  ip?: string;
}) => {
  return axiosBase.post('/notifi-wifi', params);
};
