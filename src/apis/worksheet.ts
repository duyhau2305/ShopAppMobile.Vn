import axiosBase from '../utils/axiosBase';
import qs from 'qs';

export const getWorkSheetAPI = (params: {
  from_date: string;
  to_date: string;
  id?: number;
}) => {
  const queryString = qs.stringify(params, {arrayFormat: 'brackets'});
  return axiosBase.get(`/salary-table?${queryString}`);
};

export const getSalaryTableWorkSchedulesAPI = (params: {
  from_date: string;
  to_date: string;
  id?: number;
}) => {
  const queryString = qs.stringify(params, {arrayFormat: 'brackets'});
  return axiosBase.get(`/salary-table-work_schedules?${queryString}`);
};
