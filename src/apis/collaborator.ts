import axiosBase from '../utils/axiosBase';
import qs from 'qs';

export const getListCollaboratorAPI = (params: {
  search: string;
  page: number;
  status: number;
}) => {
  const queryString = qs.stringify(params, {arrayFormat: 'brackets'});
  return axiosBase.get(`/employee-freelance-created-by?${queryString}`);
};

export const addCollaboratorAPI = (params: {
  full_name: string;
  address: string;
  phone_number: string;
  avatar: string;
  before_card_id: string;
  after_card_id: string;
  cccd: string;
}) => {
  return axiosBase.post('/employee/free-lancer', params);
};
