import { MutationTree } from 'vuex';
import { DashboardState } from './typings';
import {
    SET_DASHBOARD_INFO
} from './mutation-types';

const mutations: MutationTree<DashboardState> = {
  [SET_DASHBOARD_INFO]:(state: DashboardState, dashbordinfo) => {
    state.DashboardInfo.ActiveMemberList = dashbordinfo.ActiveMemberList,
    state.DashboardInfo.DashboardDateList = dashbordinfo.DashboardDateList,
    state.DashboardInfo.NewSignUpMemberList = dashbordinfo.NewSignUpMemberList,
    state.DashboardInfo.CommissionList = dashbordinfo.CommissionList   
  }
};
export default mutations;
