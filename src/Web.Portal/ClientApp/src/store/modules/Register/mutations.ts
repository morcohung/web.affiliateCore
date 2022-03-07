import { MutationTree } from 'vuex';
import { RegisterState } from './typings';
import { CREATE_AFFILIATE_ACCOUNT, AVAILABLE_AFFILIATE_ACCOUNT, AVAILABLE_AFFILIATE_EMAIL, AVAILABLE_AFFILIATE_CAPTCHA } from './mutation-types';

const mutations: MutationTree<RegisterState> = {
  [CREATE_AFFILIATE_ACCOUNT]:(state: RegisterState, response) => {
    state.RegisterResponse.data.Status = response.data.Status;
    state.RegisterResponse.data.Message = response.data.Message;    
  },
  [AVAILABLE_AFFILIATE_ACCOUNT]:(state: RegisterState, available) => {
    state.AvailableUserName.data.Status = available.data.Status;
    state.AvailableUserName.data.Message = available.data.Message   
  },
  [AVAILABLE_AFFILIATE_EMAIL]:(state: RegisterState, available) => {
    state.AvailableEmail.data.Status = available.data.Status;
    state.AvailableEmail.data.Message = available.data.Message   
  },
  [AVAILABLE_AFFILIATE_CAPTCHA]:(state: RegisterState, available) => {
    state.AvailableCaptcha.data.Status = available.data.Status;
    state.AvailableCaptcha.data.Message = available.data.Message   
  }   
};
export default mutations;