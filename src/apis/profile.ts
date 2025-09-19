import axiosBase from '../utils/axiosBase';

export const getAccountInfoAPI = () => {
  return axiosBase.get('/user-profile');
};

export const changePasswordAPI = (params: {
  current_password: string;
  password: string;
  password_confirmation: string;
}) => {
  return axiosBase.post('/users/change-password', params);
};

export const updateProfileAPI = (params: {
  phone_number: string;
  full_name?: string;
  email?: string;
}) => {
  return axiosBase.put('/employee-profile', params);
};
