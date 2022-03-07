import { ActionTree } from 'vuex';
import { RootState } from './typings';
import * as mutationTypes from './mutation-type';

const actions: ActionTree<RootState, RootState> = {
  async initApp({ commit }) {
    commit(mutationTypes.SET_CURRENT_LAN);
  },
  async setLang({ commit },langCode) {
    commit(mutationTypes.CHANGE_CURRENT_LAN, langCode);
  }  
};
export default actions;
