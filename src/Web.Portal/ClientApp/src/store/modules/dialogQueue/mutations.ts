import { DialogQueueState } from './typings';
import { MutationTree } from 'vuex';
import * as types from './mutation-types';

const mutations: MutationTree<DialogQueueState> = {
  [types.ADD](state, option) {
    state.queue.push(option);
  },
  [types.INSERT](state, option) {
    state.queue.splice(0, 0, option);
  },
  [types.REPLACE](state, option) {
    state.visible = false;
    state.queue.splice(0, 0, state.option);
    state.queue.splice(0, 0, option);
  },
  [types.CLOSE](state) {
    state.visible = false;
  },
  [types.OPEN](state) {
    if (state.visible === false) {
      const options = state.queue.shift();
      if (options !== undefined) {
        state.option = options;
        state.visible = true;
      }
    }
  }
};

export default mutations;
