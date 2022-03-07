import { Module } from 'vuex';
import { ReportState } from './typings';
import { RootState } from '@/store/typings';
import actions from './actions';
import mutations from './mutations';
import date from '@/filters/date';
const state: ReportState = { 
    Summary:{
        code: 0,
        message: '',
        data: {    
            affiliateCode: '',
            currency: 0,
            yearMonth: '',
            collateralPerformance:{
                clicks: 0,
                signUps: 0,
                deposits: 0
            },
            refferrals:{
                completed: 0,
                interest: 0,
                deposits: 0,
            },
            winlossProduct:[{
                yearMonth: '',
                settlementType: 0,
                totalGrossRevenue: 0,
                totalNetRevenue: 0
            }],
            monthlyCommissions:[{
                yearMonth: '',
                settlementType: 0,
                commissionBalance: 0,
                totalCommissionEarned: 0,
            }],
            commissionPayout:{
                amount:0
            }
        }        
    },
    SummaryFilter:{
        AffiliateCode: '',
        YearMonth: '',
        SettlementType: 0,  
        LanguageCode: '', 
        ConvertToAffCurrency:false   
    },
    GPRSummary:{
        code: 0,
        message: '',
        data: {
            summaryList: [{
                yearMonth:new Date(),
                grossProductRevenueSummary:[{
                settlementType:0,
                netRevenue:0,
                grossRevenue:0
                }],
            totalNetRevenue:0,
            totalGrossRevenue:0,
            currency:''
            }],             
        }
    },
    GPRProductSummary:{
        code: 0,
        message: '',
        data: {
            yearMonth:new Date(),
            productSummaryList: [{
                settlementType:0,
                productList:[{
                    displayName:'',
                    productCode:'',
                    stake:0,
                    grossRevenue:0,
                    currency:'',
                    childProductList:[{
                        displayName:'',
                        productCode:'',
                        stake:0,
                        grossRevenue:0,
                        currency:''
                    }]
                }]
            }]          
        }
    },
    GPRProductDetailFilter: {    
        YearMonth:new Date(),
        SettlementType:0,
        ProductCode:'',
    },
    GPRProductDetail:{
        code: 0,
        message: '',
        data: {
            productDetailList: [{
                memberCode:'',
                totalGrossRevenue:0,
                registrationDate:'',
                lastDepositDate:'',
                memberStatus:''         
            }]          
        }
    },
    GPRMemberDetailFilter: {    
        YearMonth:new Date(),
        SettlementType:0,
        ProductCode:'',
        MemberCode:'',
    },
    GPRMemberDetail:{
        code: 0,
        message: '',
        data: {
            memberDetailList: [{
                transactionDate:'',
                stake:0,
                grossRevenue:0,
                currency:''         
            }]          
        }
    },
    GPRFilterDetailFilter: {    
        YearMonth:new Date(),
        ProductCodes:[''],
    },
    GPRFilterDetail:{
        code: 0,
        message: '',
        data: {
            yearMonth:new Date(),
            settlementTypeResultList:[
                {
                    settlementType:0,
                    filterDetailList: [{
                        memberCode:'',
                        totalGrossRevenue:0,
                        currency:'',
                        product:''         
                    }]    
                }
            ]               
        }
    },
    GPRExportFilter:{
        YearMonth:new Date()
    },
    CommissionPayout:{
        code: 0,
        message: '',
        data: {   
            CommissionPayouts:[{
                Id: '',
                CommssnRecvngId: '',
                TransactionDate: '',
                TransactionDateLong: 0,
                LastUpdateDate: '',
                LastUpdateDateLong: 0,                
                VerifyStatus: 0,
                VerifyStatusString: '',
                PaymentStatus: 0,
                PaymentStatusString: '',
                Currency: '',
                Amount: 0,
                FieldName: '',
                FieldValue: ''
            }] 

        }
    },
    CommissionPayoutDetail:{
        code: 0,
        message: '',
        data: {    
            Detail:[{
                DetailFieldName: '',
                DetailFieldValue: ''          
            }],        
            Id: '',
            CommssnRecvngId: '',
            TransactionDate: '',
            TransactionDateLong: 0,
            LastUpdateDate: '',
            LastUpdateDateLong: 0,              
            VerifyStatus: 0,
            VerifyStatusString: '',
            PaymentStatus: 0,
            PaymentStatusString: '',
            Currency: '',
            Amount: 0,
            FieldName: ''         
        }        
    },
    CommissionPayoutDetailFilter:{
        AffiliateId: '',
        CommssnRcvId: '',
        CommissionPayoutId: ''  
    },
    MonthlyCommissionSummary:{
        Currency: '',
        SettlementCycle:0,
        MonthlyCommissions:[{
            Monthly: '',
            MonthlyName: '',
            Sequence: 0,                
            TotalCommissionBalance: 0,
            ProductCommission: 0,
            ChessGameCommission: 0,
            TotalCommissionHalfMonthFirst: 0,
            ProductCommissionHalfMonthFirst: 0,
            ChessGameCommissionHalfMonthFirst: 0,
            TotalCommissionHalfMonthSecond: 0,
            ProductCommissionHalfMonthSecond: 0,
            ChessGameCommissionHalfMonthSecond: 0,                        
        }] 
    },
    MonthlyCommissionSummaryFilter:{
        AffiliateId: '',     
        DateTimeFrom: '',       
        DateTimeTo: '',            
    },
    MonthlyCommissionDetail:{
        Currency: '',
        SettlementCycle:0,
        SequenceMonthFirst:0,
        StartDateMonthFirst:'',
        EndDateMonthFirst:'', 
        TotalCommissionMonthFirst:0,           
        TotalCommissionBalanceMonthFirst: 0,
        ProductCommissionMonthFirst: 0,
        PlatformFeeMonthFirst: 0,
        PaymentFeeMonthFirst: 0,
        BonusMonthFirst: 0,
        TotalMemberCountMonthFirst: 0,
        TotalActiveMemberMonthFirst: 0,
        AdjustmentMonthFirst: 0,
        NegativeCarryForwardMonthFirst: 0,
        PaidCommissionMonthFirst: 0,
        LastPaidCommissionDateMonthFirst: '',
        LastPaidCommissionDateLongMonthFirst: 0,
        ProductTurnoverMonthFirst: 0,
        ProductGrossRevenueMonthFirst: 0,
        ProductNetRevenueMonthFirst: 0,
        ProductRewardRateMonthFirst: 0,
        ChessGameCommissionMonthFirst: 0,
        ChessGameActiveMemberMonthFirst: 0,
        ChessGameStakeMonthFirst: 0,
        ChessGameRewardRateMonthFirst: 0,
        SequenceMonthSecond:0,
        StartDateMonthSecond:'',
        EndDateMonthSecond:'',       
        TotalCommissionMonthSecond:0,    
        TotalCommissionBalanceMonthSecond: 0,
        ProductCommissionMonthSecond: 0,
        PlatformFeeMonthSecond: 0,
        PaymentFeeMonthSecond: 0,
        BonusMonthSecond: 0,
        TotalMemberCountMonthSecond: 0,
        TotalActiveMemberMonthSecond: 0,
        AdjustmentMonthSecond: 0,
        NegativeCarryForwardMonthSecond: 0,
        PaidCommissionMonthSecond: 0,
        LastPaidCommissionDateMonthSecond: '',
        LastPaidCommissionDateLongMonthSecond: 0,
        ProductTurnoverMonthSecond: 0,
        ProductGrossRevenueMonthSecond: 0,
        ProductNetRevenueMonthSecond: 0,
        ProductRewardRateMonthSecond: 0,
        ChessGameCommissionMonthSecond: 0,
        ChessGameActiveMemberMonthSecond: 0,
        ChessGameStakeMonthSecond: 0,
        ChessGameRewardRateMonthSecond: 0          
    },
    MonthlyCommissionDetailFilter:{
        AffiliateId: '',       
        DateTimeFrom: '',       
        DateTimeTo: '',            
    },
    MonthlyPromoBonus:{
        code: 0,
        message: '',
        data: {
            PromoList: [{
                TransactionDate:'',
                Amount:0
            }],
            BonusList:[{
                TransactionDate:'',
                Amount:0
            }],
        } 
    },
    ReferralsFilter:{
        MemberCodeFuzzy:'',
        YearMonth:new Date(),
        SortType:0,
        MemberStatus:0,
        DepositStatus:0,
        RegisterDateFrom:new Date(),
        RegisterDateTo:new Date(),
        RegistrationDateExpress:'',
        MemberCountry:'',
        MemberCurrency:'',
        Page:0,
        PageSize:0
    },
    Referrals:{
        code: 0,
        message: '',
        data: {
            EnableAwardBonus: false,
            ReferralList: [{
                MemberId:'',
                MemberCode: '',
                TotalGrossRevenue: 0,
                LastDepositDate: '',
                RegistrationDate: '',
                MemberStatus: '',
                Website:'',
                Country: '',
                Currency: '',
                LastDepositIp: '',               
                }],
                Pagination:{
                    Page:0,
                    PageSize:0,
                    TotalRecord:0,
                    TotalPage:0
                }
            },
           
        },  
        TransactionHistoryFilter: {    
            MemberCode:''
        },
        TransactionHistory: {    
            code: 0,
            message: '',
            data: {
                HistoryList: [{
                    Currency:'',
                    Amount:0,
                    TransactionDate:'',
                    PaymentProvider:'',
                }]
            }   
        },
        AwardBonusSummary:[{
            CreateDate:new Date(),
            Currency:'',
            Amount:0,
            Rollover:0,
            Remark:''
        }],
        AwardBonusBalance: {    
            MemberCode:'',
            AffiliateCurrency:'',
            MemberCurrency:'',
            RemainingBalanceSGD:0,
            RemainingBalanceAffCurrency:0,
            RemainingBalanceMemCurrency:0
        },
        AwardBonusSubmission:{
            Amount:0,
            Rollover:0,
            MemberCode:'',
            Remark:''
        },
        AwardBonusSubmissionResult:{
            Status:0,
            Message:'',
        },
        AffiliatePromotingFilter:{
            CreativeIdFuzzy:'',
            DateFrom:new Date(),
            Page:0,
            PageSize:0
        },
        AffiliatePromoting: {    
            code: 0,
            message: '',
            data: {
                PromotingList: [{
                    AffCode:'',
                    AccountId:'',
                    Level:0,
                    AffType:0,
                    AffStatus:0,
                    AffCountry:'',
                    CreativeId:'',
                    CollateralId:'',
                    BannerName:'',
                    BannerSize:'',
                    MediaSource:'',
                    ImpressionCount:0,
                    ClickCount:0,
                    NewSignUp:0,
                    NewSignUpDeposit:0,
                    NewSignUpRate:0,
                    NewSignUpDepositRate:0,
                    InterestMemberCount:0,
                    PreviewUrl:''
                }],
                Pagination:{
                    Page:0,
                    PageSize:0,
                    TotalRecord:0,
                    TotalPage:0
                },
            }   
        }
    
}
const Report: Module<ReportState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations
};
export default Report;