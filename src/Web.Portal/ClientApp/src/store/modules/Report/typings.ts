export const moduleName = 'Report';

export interface ReportState  {
    Summary:Summary;
    SummaryFilter: SummaryFilter;
    GPRSummary:GPRSummary;
    GPRProductSummary:GPRProductSummary;
    GPRProductDetailFilter:GPRProductDetailFilter;
    GPRProductDetail:GPRProductDetail;
    GPRMemberDetailFilter:GPRMemberDetailFilter;
    GPRMemberDetail:GPRMemberDetail;
    GPRFilterDetailFilter:GPRFilterDetailFilter;
    GPRFilterDetail:GPRFilterDetail;
    GPRExportFilter:GPRExportFilter;
    CommissionPayout: CommissionPayout;
    CommissionPayoutDetail: CommissionPayoutDetail;
    CommissionPayoutDetailFilter: CommissionPayoutDetailFilter;
    MonthlyCommissionSummary: MonthlyCommissionSummary;
    MonthlyCommissionSummaryFilter: MonthlyCommissionSummaryFilter;
    MonthlyCommissionDetail: MonthlyCommissionDetail;
    MonthlyCommissionDetailFilter: MonthlyCommissionSummaryFilter;
    MonthlyPromoBonus:MonthlyPromoBonus;   
    ReferralsFilter:ReferralsFilter;
    Referrals:Referrals;
    TransactionHistoryFilter:TransactionHistoryFilter;
    TransactionHistory:TransactionHistory;
    AwardBonusSummary:AwardBonusSummary[];
    AwardBonusBalance:AwardBonusBalance;
    AwardBonusSubmission:AwardBonusSubmission;
    AwardBonusSubmissionResult:AwardBonusSubmissionResult;
    AffiliatePromotingFilter:AffiliatePromotingFilter;
    AffiliatePromoting:AffiliatePromoting;
}

export interface Summary {    
    code: number,
    message: string,
    data: {    
        affiliateCode: string,
        currency: number,
        yearMonth: string,
        collateralPerformance:{
            clicks: number,
            signUps: number
            deposits: number
        },
        refferrals:{
            completed: number,
            interest: number,
            deposits: number,
        },
        winlossProduct:[{
            yearMonth: string,
            settlementType: number,
            totalGrossRevenue: number,
            totalNetRevenue: number
        }],
        monthlyCommissions:[{
            yearMonth: string,
            settlementType: number,
            commissionBalance: number,
            totalCommissionEarned: number,
        }],
        commissionPayout:{
            amount:number
        }
    }
}

export interface SummaryFilter {    
    AffiliateCode: string,
    YearMonth: string,
    SettlementType: number,  
    LanguageCode: string, 
    ConvertToAffCurrency:boolean   
}

export interface CommissionPayout {    
    code: number,
    message: string,
    data: {
        CommissionPayouts:[{
            Id: string,
            CommssnRecvngId: string,
            TransactionDate: string,
            TransactionDateLong: number,
            LastUpdateDate: string,
            LastUpdateDateLong: number,
            VerifyStatus: number,
            VerifyStatusString: string,
            PaymentStatus: number,
            PaymentStatusString: string,
            Currency: string,
            Amount: number,
            FieldName: string,
            FieldValue: string
        }]   
    }
}

export interface CommissionPayoutDetail {    
    code: number,
    message: string,
    data: {    
        Detail:[{
            DetailFieldName: string,
            DetailFieldValue: string          
        }],        
        Id: string,
        CommssnRecvngId: string,
        TransactionDate: string,
        TransactionDateLong: number,
        LastUpdateDate: string,
        LastUpdateDateLong: number,        
        VerifyStatus: number,
        VerifyStatusString: string,
        PaymentStatus: number,
        PaymentStatusString: string,
        Currency: string,
        Amount: number,
        FieldName: string
    }
}

export interface CommissionPayoutDetailFilter {    
    AffiliateId: string,
    CommssnRcvId: string,
    CommissionPayoutId: string            
}


export interface GPRSummary {    
    code: number,
    message: string,
    data: {
        summaryList: [{
            yearMonth:Date,
            grossProductRevenueSummary:[{
                settlementType:number,
                netRevenue:number,
                grossRevenue:number
            }],
            totalNetRevenue:number,
            totalGrossRevenue:number,
            currency:string
        }],
           
        }
}
export interface GPRProductSummaryFilter{
    YearMonth:Date,
    MemberCode:string
}
export interface GPRProductSummary {    
    code: number,
    message: string,
    data: {
        yearMonth:Date,
        productSummaryList: [{
            settlementType:number,
            productList:[{
                displayName:string,
                productCode:string,
                stake:number,
                grossRevenue:number,
                currency:string,
                childProductList:[{
                    displayName:string,
                    productCode:string,
                    stake:number,
                    grossRevenue:number,
                    currency:string
                }]
            }]
        }]          
    }
}
export interface GPRProductDetailFilter {    
    YearMonth:Date,
    SettlementType:number,
    ProductCode:string,
}
export interface GPRProductDetail {    
    code: number,
    message: string,
    data: {
        productDetailList: [{
            memberCode:string,
            totalGrossRevenue:number,
            registrationDate:string,
            lastDepositDate:string,
            memberStatus:string         
        }]          
    }
}
export interface GPRMemberDetailFilter {    
    YearMonth:Date,
    SettlementType:number,
    ProductCode:string,
    MemberCode:string,
}
export interface GPRMemberDetail {    
    code: number,
    message: string,
    data: {
        memberDetailList: [{
            transactionDate:string,
            stake:number,
            grossRevenue:number,
            currency:string,      
        }]          
    }
}
export interface GPRFilterDetailFilter{
    YearMonth:Date,
    ProductCodes:[string],
}
export interface GPRFilterDetail {    
    code: number,
    message: string,
    data: {
        yearMonth:Date,
        settlementTypeResultList:[{
            settlementType:number,
            filterDetailList: [{
                memberCode:string,
                totalGrossRevenue:number,
                currency:string,
                product:string,      
            }]  
        }]                
    }
}
export interface GPRExportFilter{
    YearMonth:Date,
}
export interface MonthlyCommissionSummary {    
    Currency: string,
    SettlementCycle:number,
    MonthlyCommissions:[{
        Monthly: string,
        MonthlyName: string,
        Sequence: number,
        TotalCommissionBalance: number,
        ProductCommission: number,
        ChessGameCommission: number,
        TotalCommissionHalfMonthFirst: number,
        ProductCommissionHalfMonthFirst: number,
        ChessGameCommissionHalfMonthFirst: number,
        TotalCommissionHalfMonthSecond: number,
        ProductCommissionHalfMonthSecond: number,
        ChessGameCommissionHalfMonthSecond: number,          
    }]        
}

export interface MonthlyCommissionSummaryFilter {    
    AffiliateId: string,   
    DateTimeFrom: string,       
    DateTimeTo: string,        
}

export interface MonthlyCommissionDetail {   
    Currency: string,
    SettlementCycle:number,
    SequenceMonthFirst:number,
    StartDateMonthFirst:string,
    EndDateMonthFirst:string,
    TotalCommissionMonthFirst: number,
    TotalCommissionBalanceMonthFirst: number,
    ProductCommissionMonthFirst: number,
    PlatformFeeMonthFirst: number,
    PaymentFeeMonthFirst: number,
    BonusMonthFirst: number,
    TotalMemberCountMonthFirst: number,
    TotalActiveMemberMonthFirst: number,
    AdjustmentMonthFirst: number,
    NegativeCarryForwardMonthFirst: number,
    PaidCommissionMonthFirst: number,
    LastPaidCommissionDateMonthFirst: string,
    LastPaidCommissionDateLongMonthFirst: number,
    ProductTurnoverMonthFirst: number,
    ProductGrossRevenueMonthFirst: number,
    ProductNetRevenueMonthFirst: number,
    ProductRewardRateMonthFirst: number,
    ChessGameCommissionMonthFirst: number,
    ChessGameActiveMemberMonthFirst: number,
    ChessGameStakeMonthFirst: number,
    ChessGameRewardRateMonthFirst: number,
    SequenceMonthSecond:number,
    StartDateMonthSecond:string,
    EndDateMonthSecond:string,    
    TotalCommissionMonthSecond: number,
    TotalCommissionBalanceMonthSecond: number,
    ProductCommissionMonthSecond: number,
    PlatformFeeMonthSecond: number,
    PaymentFeeMonthSecond: number,
    BonusMonthSecond: number,
    TotalMemberCountMonthSecond: number,
    TotalActiveMemberMonthSecond: number,
    AdjustmentMonthSecond: number,
    NegativeCarryForwardMonthSecond: number,
    PaidCommissionMonthSecond: number,
    LastPaidCommissionDateMonthSecond: string,
    LastPaidCommissionDateLongMonthSecond: number,
    ProductTurnoverMonthSecond: number,
    ProductGrossRevenueMonthSecond: number,
    ProductNetRevenueMonthSecond: number,
    ProductRewardRateMonthSecond: number,
    ChessGameCommissionMonthSecond: number,
    ChessGameActiveMemberMonthSecond: number,
    ChessGameStakeMonthSecond: number,
    ChessGameRewardRateMonthSecond: number  
}

export interface MonthlyPromoBonus {    
    code: number,
    message: string,
    data: {
        PromoList: [{
            TransactionDate:string,
            Amount:number
        }],
        BonusList:[{
            TransactionDate:string,
            Amount:number
        }],
    }   
}
export interface ReferralsFilter {    
    MemberCodeFuzzy:string,
    YearMonth:Date,
    SortType:number,
    MemberStatus:number,
    DepositStatus:number,
    RegisterDateFrom:Date,
    RegisterDateTo:Date,
    RegistrationDateExpress:string,
    MemberCountry:string,
    MemberCurrency:string,
    Page:number,
    PageSize:number
}
export interface Referrals {    
    code: number,
    message: string,
    data: {
        EnableAwardBonus:boolean,
        ReferralList: [{
            MemberId:string,
            MemberCode:string,
            TotalGrossRevenue:number,
            LastDepositDate:string,
            RegistrationDate:string,
            MemberStatus:string,
            Website:string,
            Country:string,
            Currency:string,
            LastDepositIp:string,
        }],
        Pagination:{
            Page:number,
            PageSize:number,
            TotalRecord:number,
            TotalPage:number
        },
    }   
}
export interface TransactionHistoryFilter {    
    MemberCode:string,
}
export interface TransactionHistory {    
    code: number,
    message: string,
    data: {
        HistoryList: [{
            Currency:string,
            Amount:number,
            TransactionDate:string,
            PaymentProvider:string,
        }]
    }   
}
export interface AwardBonusSummary {    
    CreateDate:Date,
    Currency:string,
    Amount:number,
    Rollover:number,
    Remark:string
}
export interface AwardBonusBalance {    
    MemberCode:string,
    AffiliateCurrency:string,
    MemberCurrency:string,
    RemainingBalanceSGD:number,
    RemainingBalanceAffCurrency:number,
    RemainingBalanceMemCurrency:number
}
export interface AwardBonusSubmission{
    Amount:number,
    Rollover:number,
    MemberCode:string,
    Remark:string
}
export interface AwardBonusSubmissionResult{
    Status:number,
    Message:string,
}
export interface AffiliatePromotingFilter {   
    CreativeIdFuzzy:string, 
    DateFrom:Date,
    Page:number,
    PageSize:number
}
export interface AffiliatePromoting {    
    code: number,
    message: string,
    data: {
        PromotingList: [{
            AffCode:string,
            AccountId:string,
            Level:number,
            AffType:number,
            AffStatus:number,
            AffCountry:string,
            CreativeId:string,
            CollateralId:string,
            BannerName:string,
            BannerSize:string,
            MediaSource:string,
            ImpressionCount:number,
            ClickCount:number,
            NewSignUp:number,
            NewSignUpDeposit:number,
            NewSignUpRate:number,
            NewSignUpDepositRate:number,
            InterestMemberCount:number,
            PreviewUrl:string
        }],
        Pagination:{
            Page:number,
            PageSize:number,
            TotalRecord:number,
            TotalPage:number
        },
    }   
}