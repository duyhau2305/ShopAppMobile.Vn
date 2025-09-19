import axiosBase from '../utils/axiosBase';

export const getListInfoConfigAPI = () => {
  return axiosBase.get('/info-config');
};
