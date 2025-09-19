import axiosBase from '../utils/axiosBase';

export const getListRecruiterByCompanyAPI = (companyId: number) => {
  return axiosBase.get(`/clients-manager/${companyId}`);
};
