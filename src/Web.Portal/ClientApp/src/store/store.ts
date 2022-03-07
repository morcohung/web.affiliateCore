import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
// import globalInit from '@/plugins/global-init';
import getters from "./getters";
import mutations from './mutations';
import actions from './actions';
import modules from "./modules";

import { RootState } from "./typings";
import VueCookies from "vue-cookies";

Vue.use(VueCookies);
Vue.use(Vuex);

export const state: RootState = {
  gv: window.gv,
  uv: window.uv,
  //
  fromRoute: undefined,
  route: {},
  displayLayout: {},
  showLogin: true,
};

const store: StoreOptions<RootState> = {
  strict: process.env.NODE_ENV !== "production",
  // plugins: [globalInit],
  modules,
  state,
  actions,
  mutations,
  getters,
};

export default new Vuex.Store<RootState>(store);
