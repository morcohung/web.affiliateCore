import { Module } from 'vuex';
import { AccountState } from './typings';
import { RootState } from '@/store/typings';
import actions from './actions';
import mutations from './mutations';
const state: AccountState = {
  ChangePassWord:{
    Current: '',
    NewPass: ''
  },
  AccountWebSite:{
    OwnWebsite: '',
    Describe: 0,
    WebsiteList:[{
      Id: '',
      WebUrl: '',
      WebDescr: '',
    }],
  }, 
  AccountBalance:{
    FirstName: '',
    LastName: '',
    Currency: '',
    Balance: 0
  },
  AccountProfile:{
   //General Account
   Id: '',
   Code:'',
   FirstName: '',
   LastName: '',
   Language: '',  
   Currency: '',
   //Contact
   Email: '',
   DialCode: 0,
   ContactNo: '',
   ChatTool: '',
   ChatAddress: '',
   //Location
   Address: '',
   City: '',
   Country: '',
   Postal: '',//PostalCodeZip
   //Website
   OwnWebsite: 0,
   Describe: '',
   WebsiteList:[{
       Id: '',
       Url: '',
       Descr: '',
   }],
   //Transaction
   CommRcvOpt: '',
   CommRcvList:[{
       FieldName: '',
       Description: '',
       Support: false,
       Data:[{
           FieldName: '',
           FieldValue: '',
           Description: '',
       }]
   }],
   //Security
   SecurityQuestion: '',
   SecurityAnswer: '',
   //Extras
   ProfileList:[{
       FieldName: '',
       FieldValue: '',
       Description: ''
   }],
  } 

};
const Account: Module<AccountState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations
};
export default Account;