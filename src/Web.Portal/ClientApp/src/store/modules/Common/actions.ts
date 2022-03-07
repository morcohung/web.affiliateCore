import { ActionTree } from 'vuex';
import { CommonState } from './typings';
import { RootState } from '@/store/typings';
import {
  getLanguage,
  getCountry,
  getChatTools,
  getDialCode,
  setCurrentLang,
  getCurrencys,
  getAllCountries,
  getAllCurrencies,
  getLast3Months,
} from './api';
import {
  SET_COMMON_LANGUAGES,
  SET_COMMON_COUNTRY,
  SET_COMMON_CHATTOOLS,
  SET_COMMON_DIALCODES,
  SET_COMMON_CURRENCY,
  SET_COMMON_ALLCOUNTRIES,
  SET_COMMON_ALLCURRENCIES,
  SET_COMMON_LAST3MONTHS,
} from './mutation-types';
const actions: ActionTree<CommonState, RootState> = {
  async getLanguage({ commit }): Promise<any> {
    const result = await getLanguage();
    const setting = result.data;
    commit(SET_COMMON_LANGUAGES, setting);
  },
  async getCountry({ commit }, langCode): Promise<any> {
    const result = await getCountry(langCode);
    const setting = result.data;
    commit(SET_COMMON_COUNTRY, setting);
  },
  async getChatTools({ commit }, langCode): Promise<any> {
    const result = await getChatTools(langCode);
    const setting = result.data;
    commit(SET_COMMON_CHATTOOLS, setting);
  },
  async getDialCode({ commit }): Promise<any> {
    const result = await getDialCode();
    const setting = result.data;
    commit(SET_COMMON_DIALCODES, setting);
  },
  async setCurrentLang({}, langCode) {
    const result = await setCurrentLang(langCode);
  },
  async getCurrencys({ commit }, countryCode): Promise<any> {
    const result = await getCurrencys(countryCode);
    const setting = result.data;
    commit(SET_COMMON_CURRENCY, setting);
  },

  async fetchAllCountries({ commit }) {
    const result = await getAllCountries();
    const AllCountries = result.data;
    commit(SET_COMMON_ALLCOUNTRIES, AllCountries);
  },
  async fetchAllCurrencies({ commit }) {
    const result = await getAllCurrencies();
    const AllCurrencies = result.data;
    commit(SET_COMMON_ALLCURRENCIES, AllCurrencies);
  },
  async fetchLast3Months({ commit }) {
    const result = await getLast3Months();
    const Last3Months = result.data;
    commit(SET_COMMON_LAST3MONTHS, Last3Months);
  },
};

export default actions;
