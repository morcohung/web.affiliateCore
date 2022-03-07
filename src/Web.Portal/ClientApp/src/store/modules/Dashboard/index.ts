import { Module } from 'vuex';
import { DashboardState } from './typings';
import { RootState } from '@/store/typings';
import actions from './actions';
import mutations from './mutations';

const state: DashboardState = {
    DashboardInfo:{    
        DashboardDateList:[{
            MonthNum:0     
        }],
        ActiveMemberList:[{
            MemberCount:0
        }],  
        NewSignUpMemberList:[{
            MemberNewDeposit:0,
            MemberCount:0    
        }],  
        CommissionList:[{
            Commission:0,
            SettlementType:0    
        }]
    }
};
const Account: Module<DashboardState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations
};
export default Account;