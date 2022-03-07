import { ActionTree } from 'vuex';
import { RegisterState } from './typings';
import { RegisterAccount, CheckUserName, CheckEmail, CheckCaptcha } from './api';
import { RootState } from '@/store/typings';
import { CREATE_AFFILIATE_ACCOUNT, AVAILABLE_AFFILIATE_ACCOUNT, AVAILABLE_AFFILIATE_EMAIL, AVAILABLE_AFFILIATE_CAPTCHA } from './mutation-types';;
const actions: ActionTree<RegisterState, RootState> = {
  async registerAccount({ commit }, RegisterProfile) {    
      const result = await RegisterAccount(RegisterProfile);
      commit(CREATE_AFFILIATE_ACCOUNT, result);
      return result;
    },
    async CheckUserName({ commit }, username) {        
      const result = await CheckUserName(username);    
      commit(AVAILABLE_AFFILIATE_ACCOUNT, result);
      return result;
    },  
    async CheckEmail({ commit }, email) {        
      const result = await CheckEmail(email);    
      commit(AVAILABLE_AFFILIATE_EMAIL, result);
      return result;
    },     
    async CheckCaptcha({ commit }, captcha) {        
      const result = await CheckCaptcha(captcha);    
      commit(AVAILABLE_AFFILIATE_CAPTCHA, result);
      return result;
    },         
};

export default actions;