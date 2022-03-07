import { Module } from 'vuex';
import { DialogQueueState } from './typings';
import { RootState } from '@/store/typings';
import actions from './actions';
import mutations from './mutations';
const state: DialogQueueState = {
  queue: [],
  visible: false,
  option: {
    payload: {
      title: '',
      subTitle: '',
      msg: '',
      buttons: [],
      closeAction: undefined,
    },
    setting: {
      titleAlign: 'left',
      contentClass: '',
      hideOverlay: false,
      closeOnClickOutside: true,
      separator: false,
      persistent: false,
      hideActionButtons: false,
      noClickAnimation: false,
      hideCloseButton: false,
      noBodyPadding: false,
      maxWidth: 'none',
      width: 'none',
    },
  },
};
const DialogQueue: Module<DialogQueueState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
};
export default DialogQueue;
