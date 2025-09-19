import axiosBase from '../utils/axiosBase';
import qs from 'qs';

export const getListRequestAPI = (params: {search: string; page: number}) => {
  const queryString = qs.stringify(params, {arrayFormat: 'brackets'});
  return axiosBase.get(`/requests-recruiter?${queryString}`);
};

export const getCountRequestAPI = () => {
  return axiosBase.get('/requests-count');
};

export const patchRequestAPI = (
  params: {
    status: number;
  },
  requestId: number,
) => {
  const queryString = qs.stringify(params, {arrayFormat: 'brackets'});
  return axiosBase.patch(`/requests/${requestId}?${queryString}`);
};
