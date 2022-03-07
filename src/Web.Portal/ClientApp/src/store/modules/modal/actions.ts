import { ModalState } from './typings';
import { RootState } from '@/store/typings';
import { ActionTree } from 'vuex';
import { OPEN_MODAL, CLOSE_MODAL } from './mutation-types';
const actions: ActionTree<ModalState, RootState> = {
  openModal({ commit }, options) {
    commit(OPEN_MODAL, { payload: options });
  },
  closeModal({ commit }) {
    commit(CLOSE_MODAL);
  }
};

export default actions;