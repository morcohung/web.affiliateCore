import { Payload, DialogQueueState } from './typings';
import { RootState } from '@/store/typings';
import { ActionTree } from 'vuex';

const defaultSetting = {
  titleAlign: 'left',
  contentClass: '',
  hideOverlay: false,
  persistent: false,
  noClickAnimation: false,
  hideCloseButton: false,
  maxWidth: 'none',
  width: 'none',
};

const defaultPayload: Payload = {
  title: '',
  subTitle: '',
  msg: '',
  buttons: [],
  closeAction: undefined,
};

const actions: ActionTree<DialogQueueState, RootState> = {
  async queue({ commit }, options) {
    const fullOption = fillUpWithDefault(options);
    commit('ADD', fullOption);
    commit('OPEN');
  },
  async cut({ commit }, options) {
    const fullOption = fillUpWithDefault(options);
    commit('INSERT', fullOption);
    commit('OPEN');
  },
  async force({ commit }, options) {
    commit('CLOSE');
    const fullOption = fillUpWithDefault(options);
    commit('REPLACE', fullOption);
    setTimeout(() => {
      commit('OPEN');
    }, 20);
  },
  async close({ state, commit }) {
    commit('CLOSE');
    if (state.option.payload.closeAction) {
      state.option.payload.closeAction();
    }
    setTimeout(() => {
      commit('OPEN');
    }, 20);
  },
};
function fillUpWithDefault(options) {
  return {
    payload: Object.assign({}, defaultPayload, options.payload),
    setting: Object.assign({}, defaultSetting, options.setting),
  };
}

export default actions;
