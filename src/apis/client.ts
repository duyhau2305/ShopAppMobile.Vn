import axiosBase from '../utils/axiosBase';
import qs from 'qs';

export const getListClientAPI = (params: {
  search: string;
  internal?: number;
}) => {
  const queryString = qs.stringify(params, {arrayFormat: 'brackets'});
  return axiosBase.get(`/clients/all?${queryString}`);
};
