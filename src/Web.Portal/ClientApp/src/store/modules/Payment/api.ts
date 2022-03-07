import axiosInstance from '@/utils/axios-instance';
import { AxiosResponse } from 'axios';
import { ResponseModel } from '../Web/typings';
import { PaymentInfo } from './typings';

export function getPaymentInfo() : Promise<AxiosResponse<PaymentInfo>> {
  return axiosInstance.get('/Api/Payment/Info', {}, false);
}

export function submitPaymentInfo(paymentInfo: PaymentInfo) : Promise<AxiosResponse<ResponseModel>> {
  return axiosInstance.post('/Api/Payment/Submit', paymentInfo, false);
}