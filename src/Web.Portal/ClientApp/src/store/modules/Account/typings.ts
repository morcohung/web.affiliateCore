export const moduleName = 'Account';

export interface AccountState  {
    AccountProfile: AccountProfile;
    AccountBalance: AccountBalance;
    AccountWebSite: AccountWebSite;
    ChangePassWord: ChangePassWord;
}

export interface AccountProfile {
    //General Account
    Id: string;
    Code:string;
    FirstName: string;
    LastName: string;
    Language: string;   
    Currency: string;
    //Contact
    Email: string;
    DialCode: number;
    ContactNo: string;
    ChatTool: string;
    ChatAddress: string;
    //Location
    Address: string;
    City: string;
    Country: string;
    Postal: string;//PostalCodeZip
    //Website
    OwnWebsite: number;
    Describe: string;
    WebsiteList:[{
        Id:string,
        Url:string,
        Descr:string
    }];
    //Transaction
    CommRcvOpt: string;
    CommRcvList:[{
        FieldName: string,
        Description: string,
        Support: boolean,
        Data:[{
            FieldName: string,
            FieldValue: string,
            Description: string,
        }];
    }];
    //Security
    SecurityQuestion: string,
    SecurityAnswer: string,
    //Extras
    ProfileList:[{
        FieldName:string,
        FieldValue:string,
        Description:string
    }];
}

export interface AccountBalance {    
    FirstName:string;
    LastName:string;
    Currency:string;
    Balance: number;  
}

export interface AccountWebSite {    
    OwnWebsite:string;
    Describe:number;
    WebsiteList:[{
        Id:string,
        WebUrl:string,
        WebDescr:string
    }];  
}

export interface ChangePassWord {    
    Current:string;
    NewPass:string;   
}