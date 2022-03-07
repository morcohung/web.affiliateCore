export interface RootState {
    gv: GlobalVariable;
    uv: UserVariable;
    //
    fromRoute: any;   
    route: any;  
    displayLayout: any;
    showLogin: boolean;  
  }

  export interface GlobalVariable {
    lan: string;
    lans: Language[];
    language: Language;
    googletagid: string;
    cdnurl: any;
  }

  export interface UserVariable {
    sessionD: SessionData;  
  }

  export interface SessionData {
    affId: number;   
    userStatus: string; 
    login: boolean;
    loginId: string;    
    deviceOS: string;
  }

  export interface Language {
    display: string;
    index: number;
    value: string;
    code: string;
  }

  export interface SelectOptionItem {
    key: string,
    text: string
  }