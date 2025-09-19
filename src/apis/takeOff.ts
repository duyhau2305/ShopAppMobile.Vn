import qs from 'qs';
import axiosBase from '../utils/axiosBase';

export const getListTakeOffAPI = (params: {
  page: number;
  search: string;
  type?: number;
  status?: number;
}) => {
  const queryString = qs.stringify(params, {arrayFormat: 'brackets'});
  return axiosBase.get(`/requests-user?${queryString}`);
};

export const createTakeOffUser = (params: {
  date: string;
  type: number;
  description: string;
}) => {
  return axiosBase.post('/requests', params);
};
