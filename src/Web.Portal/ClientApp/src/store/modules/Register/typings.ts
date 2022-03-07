export const moduleName = 'Register';

export interface RegisterState  {
    RegisterProfile: RegisterProfile;   
    AvailableUserName: availableModel;
    AvailableEmail: availableModel;
    RegisterResponse: availableModel;
    AvailableCaptcha: availableModel;
}

export interface RegisterProfile {   
    Username: string;
    Password:string;
    FirstName: string;
    LastName: string;
    Country: string;
    Language: string;   
    Currency: string;
    City: string;
    Address: string;     
    Postal: string;//PostalCodeZip
    DialCode: number;
    ContactNo: string;
    Email: string;   
    ChatTool: string;
    ChatAddress: string;    
    OwnWebsite: number;
    WebUrl: string;
    Describe: string;
    AffiliateCode: string;  
    Captcha: string;
    RegistrationPlatformId: number;
    ProfileList:[{
        FieldName:string,
        FieldValue:string,
        Description:string
    }];
}

export interface availableModel {   
    data:{
        Status: number;
        Message:string
    }
}

