import axiosBase from '../utils/axiosBase';

export const getListWorkTypeAPI = () => {
  return axiosBase.get('/employees-role');
};
