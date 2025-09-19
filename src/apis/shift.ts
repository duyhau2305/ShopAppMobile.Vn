import axiosBase from '../utils/axiosBase';

export const getListShiftAPI = () => {
  return axiosBase.get('/next-shift-list');
};
