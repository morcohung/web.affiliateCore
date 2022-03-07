export const moduleName = 'Dashboard';

export interface DashboardState  {
    DashboardInfo: DashboardModel; 
}

export interface DashboardModel  {
    DashboardDateList:[{
        MonthNum:number     
    }],
    ActiveMemberList:[{
        MemberCount:number     
    }],  
    NewSignUpMemberList:[{
        MemberNewDeposit:number,
        MemberCount:number    
    }],  
    CommissionList:[{
        Commission:number,
        SettlementType:number    
    }]         
}