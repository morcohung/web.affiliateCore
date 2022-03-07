import axiosInstance from '@/utils/axios-instance';
import { RegisterProfile } from './typings';

export function RegisterAccount(AffiliateDetailModel: RegisterProfile) {   
    const data = { 
      Username: AffiliateDetailModel.Username,
      Password: AffiliateDetailModel.Password,
      FirstName: AffiliateDetailModel.FirstName,
      LastName: AffiliateDetailModel.LastName,
      Country: AffiliateDetailModel.Country,
      Language: AffiliateDetailModel.Language,
      Currency: AffiliateDetailModel.Currency,
      City: AffiliateDetailModel.City,
      Address: AffiliateDetailModel.Address,    
      Postal: AffiliateDetailModel.Postal,
      DialCode: AffiliateDetailModel.DialCode,
      ContactNo: AffiliateDetailModel.ContactNo,
      Email: AffiliateDetailModel.Email, 
      ChatTool: AffiliateDetailModel.ChatTool,
      ChatAddress: AffiliateDetailModel.ChatAddress,  
      OwnWebsite: AffiliateDetailModel.OwnWebsite,
      WebUrl: AffiliateDetailModel.WebUrl,
      Describe: AffiliateDetailModel.Describe,
      AffiliateCode: AffiliateDetailModel.AffiliateCode,
      Captcha: AffiliateDetailModel.Captcha,
      RegistrationPlatformId: AffiliateDetailModel.RegistrationPlatformId
      // ProfileList:AffiliateDetailModel.ProfileList
    };   
    return axiosInstance.post('/Api/Account/Register', data, false);
  }

  export function CheckUserName(username: string) {  
    const params = {username};
    const payload = { params };     
    return axiosInstance.get('/Api/Account/availableUsername', payload, false);
  }  

  export function CheckEmail(email: string) {  
    const params = {email};
    const payload = { params };     
    return axiosInstance.get('/Api/Account/availableEmail', payload, false);
  }  

  export function CheckCaptcha(captcha: string) {  
    const params = {captcha};
    const payload = { params };      
    return axiosInstance.get(`/Api/Web/availableCaptcha`, payload, false);
  }