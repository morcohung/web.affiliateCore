import { ActionTree } from 'vuex';
import { DashboardState } from './typings';
import { RootState } from '@/store/typings';
import { getDashboardInfo } from './api';
import { SET_DASHBOARD_INFO } from './mutation-types';
const actions: ActionTree<DashboardState, RootState> = {
  async fetchDashboardInfo({ commit }) {
    const result = await getDashboardInfo();  
    const Info=result.data;   
    commit(SET_DASHBOARD_INFO, Info);
  }, 
};

export default actions;
