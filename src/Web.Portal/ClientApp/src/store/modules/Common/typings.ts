export const moduleName = 'Common';

export interface CommonState  {
    Languages: Language[];   
    Countrys: Country[];   
    ChatTools: ChatTool[];
    DialCodes: ChatTool[];
    Currencys: Currenys;
    AllCountries: AllCountries;
    AllCurrencies: AllCurrencies;
    Last3Months:[];
}

export interface Language {    
    Id:string;
    Code:string;
    Descr:string;      
}

export interface Country {    
    Code:string;
    LangCode:string;
    LangValue:string;      
}

export interface ChatTool {    
    Code:string;
    Descr:string;         
}

export interface Currenys {    
    Currenies:[];
    Default:string;         
}

export interface AllCountries{
    CountryList:[{
        CountryCode:string,
        CountryDisplayName:string
    }];  
}

export interface AllCurrencies{
    CurrencyList:[{
        CurrencyCode:string;
    }];
}