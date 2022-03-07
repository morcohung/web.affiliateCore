import { Module } from 'vuex';
import { CommonState } from './typings';
import { RootState } from '@/store/typings';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state: CommonState = {
    Languages:[],
    Countrys:[],
    ChatTools:[],
    DialCodes:[],
    Currencys:{
      Currenies:[],
      Default:''       
    },
    AllCountries:{
      CountryList:[{
        CountryCode:'',
        CountryDisplayName:''
      }],   
    },
    AllCurrencies:{
      CurrencyList:[{
        CurrencyCode:''
      }],   
    },
    Last3Months:[]
};
const Account: Module<CommonState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
export default Account;