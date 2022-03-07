import { MutationTree } from 'vuex';
import { AuthState } from './typings';
import { AUTH_MESSAGE, CHECK_SESSION_EXPIRED, REDIRECT_TO_188MEMBERSITE } from './mutation-types';

const mutations: MutationTree<AuthState> = {
  [AUTH_MESSAGE]:(state: AuthState, payload) => {     
    state.AuthModel.Params = payload.Params;
    state.AuthModel.Status = payload.Status; 
    state.AuthModel.Message = payload.Message;  
  },
  [CHECK_SESSION_EXPIRED]:(state: AuthState, payload) => {  
    state.SessionModel.Status = payload.Status;    
  },
  [REDIRECT_TO_188MEMBERSITE]:(state: AuthState, payload) => {  
    console.log(payload);
    state.MemberSiteUrl.Message = payload.Message;    
  }  
  
};
export default mutations;
