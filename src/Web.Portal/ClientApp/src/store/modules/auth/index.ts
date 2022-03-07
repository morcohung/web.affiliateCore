import { Module } from 'vuex';
import { AuthState } from './typings';
import { RootState } from '@/store/typings';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
const state: AuthState = {
  AuthModel:{
    Status: 0,
    Params:{
        CultureCode:''
    },
    Message:''   
  },
  SessionModel:{
    Status: 0,
    Params:{
        CultureCode:''
    },
    Message:''    
  },
  MemberSiteUrl:{
    Status: 0,
    Params:{
        CultureCode:''
    },
    Message:''    
  }  
};
const Auth: Module<AuthState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
export default Auth;