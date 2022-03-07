import axiosInstance from '@/utils/axios-instance';

export function getDashboardInfo()  {
  return axiosInstance.get('/Api/Dashboard/GetDashboard', {}, false);
}