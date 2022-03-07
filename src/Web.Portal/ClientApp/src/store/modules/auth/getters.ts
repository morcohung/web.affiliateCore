import { GetterTree } from 'vuex';
import { AuthState } from './typings';

const getters: GetterTree<AuthState, any> = {
  SessionStatus(state: AuthState, {}) {   
    return state.SessionModel.Status;
  }, 
  isLogin(state: AuthState, {}) {
    let isSession = false;   
    if (state.SessionModel.Status === 1)
    {
        isSession = true;
    }  
    return isSession;
  },     
};
export default getters;