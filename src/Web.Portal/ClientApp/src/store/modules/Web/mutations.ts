import { MutationTree } from 'vuex';
import { WebState, SecurityQuestion, LanguageModel, StaticContentResult } from './typings';
import { GET_SECURITY_QUESTIONS, SET_LANGUAGE, SET_STATIC_CONTENT, SET_HTML_RESOURCE, SET_SHOW_LOGIN_DIALOG, SET_SHOW_SIGNUP_DIALOG } from './mutation-types';

const mutations: MutationTree<WebState> = {
  [GET_SECURITY_QUESTIONS]:(state: WebState, securityQuestion: SecurityQuestion[]) => {
    state.SecurityQuestions = securityQuestion;
  },
  [SET_LANGUAGE]:(state: WebState, languages: LanguageModel[]) => {
    state.Languages = languages;
  },
  [SET_STATIC_CONTENT]:(state: WebState, staticContent: StaticContentResult) => {
    state.StaticContent = staticContent
  },
  [SET_HTML_RESOURCE]:(state: WebState, htmlResource: string) => {
    state.HtmlResource = htmlResource;
  },
  [SET_SHOW_LOGIN_DIALOG]:(state: WebState, value: boolean) => {
    state.showLoginDialog = value;
  },
  [SET_SHOW_SIGNUP_DIALOG]:(state: WebState, value: boolean) => {
    state.showSignUpDialog = value;
  }
};
export default mutations;
