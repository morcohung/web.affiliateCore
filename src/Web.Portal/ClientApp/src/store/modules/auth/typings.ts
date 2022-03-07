export const moduleName = 'Auth';

export interface AuthState {
    AuthModel: AuthResponse,
    SessionModel:AuthResponse,
    MemberSiteUrl: AuthResponse
}

export interface AuthResponse {    
    Status: number;
    Params:{
        CultureCode:string
    },
    Message:string 
}