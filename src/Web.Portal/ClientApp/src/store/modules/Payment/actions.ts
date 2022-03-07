import { PaymentInfo } from './../Payment/typings';
import { ActionTree } from 'vuex';
import { PaymentState } from './typings';
import { ResponseModel } from '../Web/typings';
import { RootState } from '@/store/typings';
import { getPaymentInfo, submitPaymentInfo } from './api';
import { SET_PAYMENT_INFO } from './mutation-types';

const actions: ActionTree<PaymentState, RootState> = {
  async fetchPaymentInfo({ commit }):Promise<any> {
    const result = await getPaymentInfo();   
    commit(SET_PAYMENT_INFO, result.data);
  },
  async submitPayment({ commit }, paymentInfo : PaymentInfo) : Promise<ResponseModel> {
    const _result = await submitPaymentInfo(paymentInfo);
    return _result.data;
  }
};

export default actions;
