import axiosBase from '../utils/axiosBase';
import qs from 'qs';

export const getListBankAPI = (params: {search: string}) => {
  const queryString = qs.stringify(params, {arrayFormat: 'brackets'});
  return axiosBase.get(`/banks?${queryString}`);
};
