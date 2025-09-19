import axiosBase from '../utils/axiosBase';

export const getListNotificationAPI = () => {
  return axiosBase.get('/notifi');
};

export const getTotalUnReadAPI = () => {
  return axiosBase.get('/notifi/unread-count');
};

export const readNotificationAPI = (params: {notification_id: number}) => {
  return axiosBase.patch('/notifi', params);
};
