import { Language } from './../Common/typings';
import { Module } from 'vuex';
import { WebState } from './typings';
import { RootState } from '@/store/typings';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state: WebState = {
  SecurityQuestions: [{
    Code: '',
    Descr: ''
  }],
  Languages: [{
    Id: '',
    Code: '',
    Descr: ''
  }],
  StaticContent: {
    metaInfo: {
      title: '',
      meta: [{
        name: '',
        property: '',
        content: ''
       }]
    },
    body: '',
    scriptUrls: ['']
  },
  HtmlResource: '',
  showLoginDialog: false,
  showSignUpDialog: false
};

const Web: Module<WebState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

export default Web;