import axiosBase from '../utils/axiosBase';
import qs from 'qs';

export const getListConfigWifiAPI = (params: {page: number}) => {
  const queryString = qs.stringify(params, {arrayFormat: 'brackets'});
  return axiosBase.get(`/clients?${queryString}`);
};

export const updateConfigWifiAPI = (params: {
  client_id: number;
  Wifi: Array<{
    type: string;
    ssid: string;
    bssid: string;
    client_id: string;
    is_active: boolean;
  }>;
}) => {
  return axiosBase.post('/insert-checkin-wifi', params);
};
