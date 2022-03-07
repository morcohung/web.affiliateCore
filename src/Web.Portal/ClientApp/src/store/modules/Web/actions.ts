import { ActionTree } from 'vuex';
import { WebState, StaticContentModel } from './typings';
import { RootState } from '@/store/typings';
import { getSecurityQuestions, getLanguage, getHtmlResource, getStaticContent } from './api';
import { GET_SECURITY_QUESTIONS, SET_LANGUAGE, SET_STATIC_CONTENT, SET_HTML_RESOURCE, SET_SHOW_LOGIN_DIALOG, SET_SHOW_SIGNUP_DIALOG } from './mutation-types';

const actions: ActionTree<WebState, RootState> = {
  async fetchSecurityQuestions({ commit }):Promise<any> {
    const result = await getSecurityQuestions();   
    commit(GET_SECURITY_QUESTIONS, result.data);
  },
  async fetchLanguages({ commit }, id: number) : Promise<any> {
    const _result = await getLanguage(id);
    commit(SET_LANGUAGE, _result.data);
  },
  async fetchStaticContent({ commit }, content: StaticContentModel) : Promise<void> {
    const _result = await getStaticContent(content);
    commit(SET_STATIC_CONTENT, _result.data);
  },
  async setShowLoginDialog({ commit }, value: boolean) : Promise<void> {
    commit(SET_SHOW_LOGIN_DIALOG, value);
  },
  async setShowSignUpDialog({ commit }, value: boolean) : Promise<void> {
    commit(SET_SHOW_SIGNUP_DIALOG, value);
  }  
};

export default actions;
