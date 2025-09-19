import axiosBase from '../utils/axiosBase';

export const getListAdvertiseAPI = () => {
  return axiosBase.get('/notification-advertisement');
};
