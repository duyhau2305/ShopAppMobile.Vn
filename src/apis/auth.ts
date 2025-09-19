import qs from 'qs';
import axiosBase from '../utils/axiosBase';

export const loginAPI = (params: { email_or_username: string; password: string}) => {
   console.log(params);
  return axiosBase.post('/login', params);
};

export const registerAPI = (params: {
  username: string;
  password: string;
  full_name: string;
  phone_number: string;
  employee_code: string;
  address: string;
  client_id: number;
  recruiter_id: number;
  employee_role_id: number;
  bank_id: number;
  bank_account_number: string;
  bank_name: string;
  before_card_id: string;
  after_card_id: string;
  avatar: string;
  cccd: string;
  birthday: string;
}) => {
  return axiosBase.post('/employee', params);
};

export const saveFcmToken = (params: {fcm_token: string}) => {
  return axiosBase.post('/device-token', params);
};

export const logoutAPI = (params: {fcm_token: string}) => {
  return axiosBase.post('/logout', params);
};

export const getQREmployeeCodeAPI = (employeeId: string) => {
  return axiosBase.get(`/employee/qr-code/${employeeId}`);
};

export const checkInEmployeeAPI = (params: {
  wifi_ssid: string;
  wifi_ip: string;
  mac_address: string;
  latitude: string;
  longitude: string;
  device_name: string;
  imei: string;
  image: string;
}) => {
  return axiosBase.post('/check-in-employee', params);
};

export const checkInInteralAPI = (params: {
  shift_id: number;
  wifi_ssid: string;
  mac_address: string;
  wifi_ip: string;
  latitude: string;
  longitude: string;
  device_name: string;
  imei: string;
}) => {
  return axiosBase.post('/check-in-internal', params);
};

export const checkInProxyAPI = (params: {
  employee_id: number;
  wifi_ssid: string;
  mac_address: string;
  wifi_ip: string;
  latitude: string;
  longitude: string;
  image: string;
}) => {
  return axiosBase.post('/check-in-proxy', params);
};

export const getCheckInInternalAPI = () => {
  return axiosBase.get('/check-in-internal');
};

export const getCheckInEmployeeAPI = () => {
  return axiosBase.get('/check-in-employee');
};

export const deleteEmployeeAPI = () => {
  return axiosBase.delete('/employee');
};

export const checkExitsUsernameAPI = (params: {username: string}) => {
  const queryString = qs.stringify(params, {arrayFormat: 'brackets'});
  return axiosBase.get(`/checkusernameexist?${queryString}`);
};

export const getErrorAuth = () => {
  return axiosBase.get('/status-401');
};
