import { GetterTree } from 'vuex';
import { PaymentState } from './typings';

const getters: GetterTree<PaymentState, any> = {
  getPaymentInfo(state: PaymentState) {
    return state.PaymentInfo ;
  } 
};

export default getters;