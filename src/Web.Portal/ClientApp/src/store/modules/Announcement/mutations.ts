import { MutationTree } from 'vuex';
import { AnnouncementState } from './typings';
import { SET_ANNOUNCEMENT_LIST } from './mutation-types';

const mutations: MutationTree<AnnouncementState> = {
  [SET_ANNOUNCEMENT_LIST]:(state: AnnouncementState, announcementList) => {
    state.Announcement = announcementList;   
  }
};
export default mutations;
