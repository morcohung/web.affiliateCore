import { MutationTree } from 'vuex';
import { AccountState } from './typings';
import {
  SET_ACCOUNT_PROFILE,
  SET_ACCOUNT_COMMISSION_BALANCE,
  SET_ACCOUNT_WEBSITE
} from './mutation-types';

const mutations: MutationTree<AccountState> = {
  [SET_ACCOUNT_PROFILE]:(state: AccountState, profile) => {
    state.AccountProfile.Id = profile.Id;
    state.AccountProfile.Code = profile.Code,
    state.AccountProfile.FirstName = profile.FirstName;
    state.AccountProfile.LastName = profile.LastName;
    state.AccountProfile.Language = profile.Language;
    state.AccountProfile.Currency = profile.Currency;
    state.AccountProfile.Email = profile.Email;
    state.AccountProfile.DialCode = profile.DialCode;
    state.AccountProfile.ContactNo = profile.ContactNo;
    state.AccountProfile.ChatTool = profile.ChatTool;
    state.AccountProfile.ChatAddress = profile.ChatAddress;
    state.AccountProfile.Address = profile.Address;
    state.AccountProfile.City = profile.City;
    state.AccountProfile.Country = profile.Country;
    state.AccountProfile.Postal = profile.Postal;
    state.AccountProfile.OwnWebsite = profile.OwnWebsite;
    state.AccountProfile.Describe = profile.Describe; 
    state.AccountProfile.WebsiteList = profile.WebsiteList;
    state.AccountProfile.CommRcvOpt = profile.CommRcvOpt;
    state.AccountProfile.CommRcvList = profile.CommRcvList;
    state.AccountProfile.SecurityQuestion = profile.SecurityQuestion;
    state.AccountProfile.SecurityAnswer = profile.SecurityAnswer;
    state.AccountProfile.ProfileList = profile.ProfileList;
  },
  [SET_ACCOUNT_COMMISSION_BALANCE]:(state: AccountState, accountBalance) => {
    state.AccountBalance.FirstName = accountBalance.FirstName;
    state.AccountBalance.LastName = accountBalance.LastName;
    state.AccountBalance.Currency = accountBalance.Currency;
    state.AccountBalance.Balance = accountBalance.Balance;   
  },
  [SET_ACCOUNT_WEBSITE]:(state: AccountState, AccountWebSite) => {
    state.AccountWebSite.OwnWebsite = AccountWebSite.OwnWebsite;
    state.AccountWebSite.Describe = AccountWebSite.Describe;
    state.AccountWebSite.WebsiteList = AccountWebSite.WebsiteList;     
  } 
};
export default mutations;
