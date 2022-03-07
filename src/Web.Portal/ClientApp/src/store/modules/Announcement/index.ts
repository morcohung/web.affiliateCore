import { Module } from 'vuex';
import { AnnouncementState } from './typings';
import { RootState } from '@/store/typings';
import actions from './actions';
import mutations from './mutations';
const state: AnnouncementState = {
  Announcement:{
    AnnouncementList:[{
      Id:'',
      Ord:0,
      Text:'',
      EffectiveDate:'',
      Language:'',
      Type:'' 
  }]

  }
};

const Announcement: Module<AnnouncementState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations
};
export default Announcement;