import { ActionTree } from 'vuex';
import { AccountState } from './typings';
import { RootState } from '@/store/typings';
import { 
  getAffiliateProfile,
  updateProfile,
  getAffiliateCommissionBalance,
  getAccountWebSite,
  updateAccountWebSite,
  changePassword } from './api';
import {
  SET_ACCOUNT_PROFILE, 
  SET_ACCOUNT_COMMISSION_BALANCE,
  SET_ACCOUNT_WEBSITE} from './mutation-types';
const actions: ActionTree<AccountState, RootState> = {
  async fetchAffiliateProfile({ commit }) {
    const result = await getAffiliateProfile();  
    const profile=result.data;   
    commit(SET_ACCOUNT_PROFILE, profile);
  },
  async updateProfile({ commit }, AccountProfile) {    
    const result = await updateProfile(AccountProfile);
    if (result.data.Status == 0) {
      commit(SET_ACCOUNT_PROFILE, AccountProfile);
    }
    return result;
  },
  async fetchAffiliateCommissionBalance({ commit }) {
    const result = await getAffiliateCommissionBalance();  
    const balance=result.data;   
    commit(SET_ACCOUNT_COMMISSION_BALANCE, balance);
  },

  async fetchAccountWebSite({ commit }) {
    const result = await getAccountWebSite();  
    const profile=result.data;   
    commit(SET_ACCOUNT_WEBSITE, profile);
  },

  async updateAccountWebSite({ commit }, AccountWebSite) {   
    const result = await updateAccountWebSite(AccountWebSite);  
    if (result.data.Status == 0) {     
      commit(SET_ACCOUNT_WEBSITE, AccountWebSite);
    }  
  },

  async changePassword({}, changePDModel) {   
    const result = await changePassword(changePDModel);  
    if (result.data.Status == 0) {     
     
    }  
  }

  // async fetchSecurityQuestions({ commit }) {
  //   const result = await getSecurityQuestions();
  //   commit(SET_ACCOUNT_SECURITY, result.data);
  // },
};

export default actions;
