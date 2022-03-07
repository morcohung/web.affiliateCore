import { MutationTree } from 'vuex';
import { CommonState } from './typings';
import {
    SET_COMMON_LANGUAGES,
    SET_COMMON_COUNTRY,
    SET_COMMON_CHATTOOLS,
    SET_COMMON_DIALCODES,
    SET_COMMON_CURRENCY,
    SET_COMMON_ALLCOUNTRIES,
    SET_COMMON_ALLCURRENCIES,
    SET_COMMON_LAST3MONTHS
} from './mutation-types';

const mutations: MutationTree<CommonState> = {
  [SET_COMMON_LANGUAGES]:(state: CommonState, Languages) => {
    state.Languages = Languages;  
  },
  [SET_COMMON_COUNTRY]:(state: CommonState, Countrys) => {
    state.Countrys = Countrys;  
  },
  [SET_COMMON_CHATTOOLS]:(state: CommonState, ChatTools) => {
    state.ChatTools = ChatTools;  
  },
  [SET_COMMON_DIALCODES]:(state: CommonState, DialCodes) => {
    state.DialCodes = DialCodes;  
  },  
  [SET_COMMON_CURRENCY]:(state: CommonState, CurrencyModel) => {   
    state.Currencys.Currenies = CurrencyModel.Currenies;  
    state.Currencys.Default = CurrencyModel.Default;  
  },    
  [SET_COMMON_ALLCOUNTRIES]:(state: CommonState, AllCountries) => {   
    state.AllCountries.CountryList = AllCountries.CountryList;  
  }, 
  [SET_COMMON_ALLCURRENCIES]:(state: CommonState, AllCurrencies) => {   
    state.AllCurrencies.CurrencyList = AllCurrencies.CurrencyList;  
  }, 
  [SET_COMMON_LAST3MONTHS]:(state: CommonState, Last3Months) => {   
    state.Last3Months = Last3Months;  
  }, 
};
export default mutations;
