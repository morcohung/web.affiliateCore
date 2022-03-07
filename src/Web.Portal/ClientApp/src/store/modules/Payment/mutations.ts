import { MutationTree } from 'vuex';
import { PaymentState } from './typings';
import {
  SET_PAYMENT_INFO
} from './mutation-types';

const mutations: MutationTree<PaymentState> = {
  [SET_PAYMENT_INFO]:(state: PaymentState, paymentInfo) => {
    state.PaymentInfo.Amount = paymentInfo.Amount;
    state.PaymentInfo.CommRcvOpt = paymentInfo.CommRcvOpt;
    state.PaymentInfo.CommRcvList = paymentInfo.CommRcvList;
  }
};
export default mutations;
