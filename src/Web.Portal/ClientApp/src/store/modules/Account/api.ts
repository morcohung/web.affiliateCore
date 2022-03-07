import axiosInstance from '@/utils/axios-instance';
import { AccountProfile, AccountWebSite, ChangePassWord } from './typings';

export function getAffiliateProfile()  {
  return axiosInstance.get('/Api/Account/Profile', {}, false);
}

export function updateProfile(AffiliateDetailModel: AccountProfile) {   
  const data = {
    Id: AffiliateDetailModel.Id,
    Code: AffiliateDetailModel.Code,
    FirstName: AffiliateDetailModel.FirstName,
    LastName: AffiliateDetailModel.LastName,
    Language: AffiliateDetailModel.Language,
    Currency: AffiliateDetailModel.Currency,  
    Email: AffiliateDetailModel.Email,
    DialCode: AffiliateDetailModel.DialCode,
    ContactNo: AffiliateDetailModel.ContactNo,
    ChatTool: AffiliateDetailModel.ChatTool,
    ChatAddress: AffiliateDetailModel.ChatAddress,
    Address: AffiliateDetailModel.Address,
    City: AffiliateDetailModel.City,
    Country: AffiliateDetailModel.Country,
    Postal: AffiliateDetailModel.Postal,   
    OwnWebsite: AffiliateDetailModel.OwnWebsite,
    Describe: AffiliateDetailModel.Describe,
    WebsiteList:AffiliateDetailModel.WebsiteList,
    CommRcvOpt:AffiliateDetailModel.CommRcvOpt,
    CommRcvList:AffiliateDetailModel.CommRcvList,
    SecurityQuestion:AffiliateDetailModel.SecurityQuestion,
    SecurityAnswer:AffiliateDetailModel.SecurityAnswer,
    ProfileList:AffiliateDetailModel.ProfileList
  };   
  return axiosInstance.post('/Api/Account/Update', data, false);
}

export function getSecurityQuestions() {
  return axiosInstance.get('/Api/Web/SecurityQuestions', {}, false);
}  

export function getAffiliateCommissionBalance()  {
  return axiosInstance.get('/Api/Account/GetAffiliateCommissionBalance', {}, false);
}

export function getAccountWebSite()  {
  return axiosInstance.get('/Api/Account/GetAccountWebSite', {}, false);
}

export function updateAccountWebSite(AccountWebSiteModel: AccountWebSite) {   
  const data = {
    OwnWebsite: AccountWebSiteModel.OwnWebsite,
    Describe: AccountWebSiteModel.Describe,
    WebsiteList: AccountWebSiteModel.WebsiteList    
  };   
  return axiosInstance.post('/Api/Account/UpdateAccountWebSite', data, false);
}

export function changePassword(ChangePassWordModel: ChangePassWord) {   
  const data = {
    Current: ChangePassWordModel.Current,
    NewPass: ChangePassWordModel.NewPass
   
  };   
  return axiosInstance.post('/Api/Account/Password', data, false);
}