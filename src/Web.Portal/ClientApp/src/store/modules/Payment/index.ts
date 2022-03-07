import { Module } from 'vuex';
import { PaymentState, PaymentInfo } from './typings';
import { RootState } from '@/store/typings';
import actions from './actions';
import mutations from './mutations';

const state: PaymentState = {
  PaymentInfo: {
    Amount: 0.0,
    CommRcvOpt: '',
    CommRcvList:[{
      FieldName: '',
      Description: '',
      Support: false,
      Data:[{
        FieldName: '',
        FieldValue: '',
        Description: '',
      }]
    }]
  } 
};

const Payment: Module<PaymentState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations
};

export default Payment;