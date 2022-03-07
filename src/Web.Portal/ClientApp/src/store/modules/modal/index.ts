import { ModalState } from './typings';
import mutations from './mutations';
import { Module } from 'vuex';
import { RootState } from '@/store/typings';
import actions from './actions';

const state: ModalState = {
  payload: {},
  setting: {},
  visible: false
};

const Modal: Module<ModalState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default Modal;
