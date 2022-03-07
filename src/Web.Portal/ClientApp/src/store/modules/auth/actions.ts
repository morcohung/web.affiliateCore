import { ActionTree } from 'vuex';
import { AuthState } from './typings';
import { login, IsSessionExpired, logout, RedirectTo188MemberSite } from './api';
import { RootState } from '@/store/typings';
import {
  AUTH_MESSAGE,
  CHECK_SESSION_EXPIRED,
  REDIRECT_TO_188MEMBERSITE
} from './mutation-types';;
const actions: ActionTree<AuthState, RootState> = {
  async login({ commit }, { username, password, blackbox }): Promise<any> {    
    const result = await login(username, password, blackbox);
    const message = result.data;  
    commit(AUTH_MESSAGE, message);        
  },

  async checkSession({ commit },): Promise<any> {    
    const result = await IsSessionExpired();
    const payload = result.data;       
    commit(CHECK_SESSION_EXPIRED, payload);   
  },

  async logout({}) {
    const result = await logout();  
  },  

  async fetch188MemberSiteUrl({ commit },{ isMobileBrowser }): Promise<any> {    
    const result = await RedirectTo188MemberSite(isMobileBrowser);    
    const payload = result.data;    
    commit(REDIRECT_TO_188MEMBERSITE, payload);   
  },

  

  
};

export default actions;

