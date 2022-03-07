import { ActionTree } from 'vuex';
import { AnnouncementState } from './typings';
import { RootState } from '@/store/typings';
import { getAnnouncementList } from './api';
import {SET_ANNOUNCEMENT_LIST } from './mutation-types';
const actions: ActionTree<AnnouncementState, RootState> = {
  async fetchAnnouncementList({ commit }) {
    const result = await getAnnouncementList();  
    const profile=result.data;  
    commit(SET_ANNOUNCEMENT_LIST, profile);
  },  
};



export default actions;
