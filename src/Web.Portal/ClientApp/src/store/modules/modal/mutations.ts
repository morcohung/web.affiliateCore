import { ModalState } from './typings';
import { MutationTree } from 'vuex';
import { OPEN_MODAL, CLOSE_MODAL } from './mutation-types';

const defaultSetting = {
  showClose: true,
  showButton: true,
  titleAlign: '',
  contentClass: undefined,
  hideOverlay: false,
  persistent: true,
  noClickAnimation: false
};

const defaultPayload = {
  msg: '',
  title: '',
  buttonText: '',
  buttonText2: ''
};

interface CallBackStack {
  Func?: Function;
}

let ModalCallBack: CallBackStack = {
  Func: undefined
};

const execCallback = function(message?: string) {
  if (ModalCallBack.Func) ModalCallBack.Func(message);
  ModalCallBack.Func = undefined;
};

const mutations: MutationTree<ModalState> = {
  [OPEN_MODAL](state, { payload, setting, callback }) {
    if (ModalCallBack.Func) execCallback();
    state.setting = setting ?? defaultSetting;
    state.payload = payload;
    state.visible = true;
    if (callback) ModalCallBack.Func = callback;
  },
  [CLOSE_MODAL](state, message) {
    state.visible = false;
    if (ModalCallBack.Func) execCallback(message);
  }
};

export default mutations;
