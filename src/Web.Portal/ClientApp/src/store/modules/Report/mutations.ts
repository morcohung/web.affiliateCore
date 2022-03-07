import { MutationTree } from 'vuex';
import { ReportState, GPRProductSummary } from './typings';
import {
  SET_SUMMARY,
  SET_GPRSUMMARY_LIST,
  SET_GPRPRODUCTSUMMARY_LIST,
  SET_GPRPRODUCTDETAIL_LIST,
  SET_GPRMEMBERDETAIL_LIST,
  SET_GPRFILTERDETAIL_LIST,
  SET_COMMISSION_PAYOUT,
  SET_COMMISSION_PAYOUT_DETAIL,
  SET_MONTHLY_COMMISSION_SUMMARY,
  SET_MONTHLY_COMMISSION_DETAIL,
  SET_MONTHLY_PROMOBONUS,
  SET_REFERRAL_LIST,
  SET_TRANSACTION_HISTORY,
  SET_AWARD_BONUS_SUMMARY_LIST,
  SET_AWARD_BONUS_BALANCE,
  SET_SUBMIT_AWARD_BONUS_RESULT,
  SET_AFFILIATE_PROMOTING_LIST
} from './mutation-types';

const mutations: MutationTree<ReportState> = {
  [SET_SUMMARY]:(state: ReportState, summary) => {  
    state.Summary.code = summary.Code;
    state.Summary.message = summary.Message,
    state.Summary.data = summary.Data;   
  },
  [SET_GPRSUMMARY_LIST]:(state:ReportState,GPRSummary)=>{
    state.GPRSummary.code = GPRSummary.Code;
    state.GPRSummary.message = GPRSummary.Message;
    state.GPRSummary.data = GPRSummary.Data; 
  },
  [SET_GPRPRODUCTSUMMARY_LIST]:(state:ReportState,GPRProductSummary)=>{
    state.GPRProductSummary.code = GPRProductSummary.Code;
    state.GPRProductSummary.message = GPRProductSummary.Message;
    state.GPRProductSummary.data = GPRProductSummary.Data; 
  },
  [SET_GPRPRODUCTDETAIL_LIST]:(state:ReportState,GPRProductDetail)=>{
    state.GPRProductDetail.code = GPRProductDetail.Code;
    state.GPRProductDetail.message = GPRProductDetail.Message;
    state.GPRProductDetail.data = GPRProductDetail.Data; 
  },
  [SET_GPRMEMBERDETAIL_LIST]:(state:ReportState,GPRMemberDetail)=>{
    state.GPRMemberDetail.code = GPRMemberDetail.Code;
    state.GPRMemberDetail.message = GPRMemberDetail.Message;
    state.GPRMemberDetail.data = GPRMemberDetail.Data; 
  },
  [SET_GPRFILTERDETAIL_LIST]:(state:ReportState,GPRFilterDetail)=>{
    state.GPRFilterDetail.code = GPRFilterDetail.Code;
    state.GPRFilterDetail.message = GPRFilterDetail.Message;
    state.GPRFilterDetail.data = GPRFilterDetail.Data; 
  },
  [SET_COMMISSION_PAYOUT]:(state: ReportState, commissionPayout) => {  
    state.CommissionPayout.code = commissionPayout.Code;
    state.CommissionPayout.message = commissionPayout.Message,
    state.CommissionPayout.data = commissionPayout.Data;   
  },
  [SET_COMMISSION_PAYOUT_DETAIL]:(state: ReportState, commissionPayoutDetail) => {  
    state.CommissionPayoutDetail.code = commissionPayoutDetail.Code;
    state.CommissionPayoutDetail.message = commissionPayoutDetail.Message,
    state.CommissionPayoutDetail.data = commissionPayoutDetail.Data;   
  },
  [SET_MONTHLY_COMMISSION_SUMMARY]:(state: ReportState, monthlyCommissionSummary) => {  
    state.MonthlyCommissionSummary.Currency = monthlyCommissionSummary.Currency;
    state.MonthlyCommissionSummary.SettlementCycle = monthlyCommissionSummary.SettlementCycle,
    state.MonthlyCommissionSummary.MonthlyCommissions = monthlyCommissionSummary.MonthlyCommissions;   
  },  
  [SET_MONTHLY_COMMISSION_DETAIL]:(state: ReportState, monthlyCommissionDetail) => {  
    state.MonthlyCommissionDetail.AdjustmentMonthFirst = monthlyCommissionDetail.AdjustmentMonthFirst;
    state.MonthlyCommissionDetail.AdjustmentMonthSecond = monthlyCommissionDetail.AdjustmentMonthSecond,
    state.MonthlyCommissionDetail.BonusMonthFirst = monthlyCommissionDetail.BonusMonthFirst,
    state.MonthlyCommissionDetail.BonusMonthSecond = monthlyCommissionDetail.BonusMonthSecond,
    state.MonthlyCommissionDetail.ChessGameActiveMemberMonthFirst = monthlyCommissionDetail.ChessGameActiveMemberMonthFirst,
    state.MonthlyCommissionDetail.ChessGameActiveMemberMonthSecond = monthlyCommissionDetail.ChessGameActiveMemberMonthSecond,
    state.MonthlyCommissionDetail.ChessGameCommissionMonthFirst = monthlyCommissionDetail.ChessGameCommissionMonthFirst,
    state.MonthlyCommissionDetail.ChessGameCommissionMonthSecond = monthlyCommissionDetail.ChessGameCommissionMonthSecond,
    state.MonthlyCommissionDetail.ChessGameRewardRateMonthFirst = monthlyCommissionDetail.ChessGameRewardRateMonthFirst,
    state.MonthlyCommissionDetail.ChessGameRewardRateMonthSecond = monthlyCommissionDetail.ChessGameRewardRateMonthSecond,
    state.MonthlyCommissionDetail.ChessGameStakeMonthFirst = monthlyCommissionDetail.ChessGameStakeMonthFirst,
    state.MonthlyCommissionDetail.ChessGameStakeMonthSecond = monthlyCommissionDetail.ChessGameStakeMonthSecond,
    state.MonthlyCommissionDetail.Currency = monthlyCommissionDetail.Currency,
    state.MonthlyCommissionDetail.LastPaidCommissionDateLongMonthFirst = monthlyCommissionDetail.LastPaidCommissionDateLongMonthFirst,
    state.MonthlyCommissionDetail.LastPaidCommissionDateLongMonthSecond = monthlyCommissionDetail.LastPaidCommissionDateLongMonthSecond,
    state.MonthlyCommissionDetail.LastPaidCommissionDateMonthFirst = monthlyCommissionDetail.LastPaidCommissionDateMonthFirst,
    state.MonthlyCommissionDetail.LastPaidCommissionDateMonthSecond = monthlyCommissionDetail.LastPaidCommissionDateMonthSecond,
    state.MonthlyCommissionDetail.NegativeCarryForwardMonthFirst = monthlyCommissionDetail.NegativeCarryForwardMonthFirst,
    state.MonthlyCommissionDetail.NegativeCarryForwardMonthSecond = monthlyCommissionDetail.NegativeCarryForwardMonthSecond,
    state.MonthlyCommissionDetail.PaidCommissionMonthFirst = monthlyCommissionDetail.PaidCommissionMonthFirst,
    state.MonthlyCommissionDetail.PaidCommissionMonthSecond = monthlyCommissionDetail.PaidCommissionMonthSecond,
    state.MonthlyCommissionDetail.PaymentFeeMonthFirst = monthlyCommissionDetail.PaymentFeeMonthFirst,
    state.MonthlyCommissionDetail.PaymentFeeMonthSecond = monthlyCommissionDetail.PaymentFeeMonthSecond,
    state.MonthlyCommissionDetail.PlatformFeeMonthFirst = monthlyCommissionDetail.PlatformFeeMonthFirst,
    state.MonthlyCommissionDetail.PlatformFeeMonthSecond = monthlyCommissionDetail.PlatformFeeMonthSecond,
    state.MonthlyCommissionDetail.ProductCommissionMonthFirst = monthlyCommissionDetail.ProductCommissionMonthFirst,
    state.MonthlyCommissionDetail.ProductCommissionMonthSecond = monthlyCommissionDetail.ProductCommissionMonthSecond, 
    state.MonthlyCommissionDetail.ProductGrossRevenueMonthFirst = monthlyCommissionDetail.ProductGrossRevenueMonthFirst, 
    state.MonthlyCommissionDetail.ProductGrossRevenueMonthSecond = monthlyCommissionDetail.ProductGrossRevenueMonthSecond, 
    state.MonthlyCommissionDetail.ProductNetRevenueMonthFirst = monthlyCommissionDetail.ProductNetRevenueMonthFirst, 
    state.MonthlyCommissionDetail.ProductNetRevenueMonthSecond = monthlyCommissionDetail.ProductNetRevenueMonthSecond, 
    state.MonthlyCommissionDetail.ProductRewardRateMonthFirst = monthlyCommissionDetail.ProductRewardRateMonthFirst, 
    state.MonthlyCommissionDetail.ProductRewardRateMonthSecond = monthlyCommissionDetail.ProductRewardRateMonthSecond, 
    state.MonthlyCommissionDetail.ProductTurnoverMonthFirst = monthlyCommissionDetail.ProductTurnoverMonthFirst, 
    state.MonthlyCommissionDetail.ProductTurnoverMonthSecond = monthlyCommissionDetail.ProductTurnoverMonthSecond, 
    state.MonthlyCommissionDetail.SettlementCycle = monthlyCommissionDetail.SettlementCycle, 
    state.MonthlyCommissionDetail.TotalActiveMemberMonthFirst = monthlyCommissionDetail.TotalActiveMemberMonthFirst, 
    state.MonthlyCommissionDetail.TotalActiveMemberMonthSecond = monthlyCommissionDetail.TotalActiveMemberMonthSecond, 
    state.MonthlyCommissionDetail.TotalCommissionBalanceMonthFirst = monthlyCommissionDetail.TotalCommissionBalanceMonthFirst, 
    state.MonthlyCommissionDetail.TotalCommissionBalanceMonthSecond = monthlyCommissionDetail.TotalCommissionBalanceMonthSecond, 
    state.MonthlyCommissionDetail.TotalMemberCountMonthFirst = monthlyCommissionDetail.TotalMemberCountMonthFirst, 
    state.MonthlyCommissionDetail.TotalMemberCountMonthSecond = monthlyCommissionDetail.TotalMemberCountMonthSecond,
    state.MonthlyCommissionDetail.SequenceMonthFirst = monthlyCommissionDetail.SequenceMonthFirst,
    state.MonthlyCommissionDetail.SequenceMonthSecond = monthlyCommissionDetail.SequenceMonthSecond,
    state.MonthlyCommissionDetail.StartDateMonthFirst = monthlyCommissionDetail.StartDateMonthFirst,
    state.MonthlyCommissionDetail.EndDateMonthFirst = monthlyCommissionDetail.EndDateMonthFirst,
    state.MonthlyCommissionDetail.StartDateMonthSecond = monthlyCommissionDetail.StartDateMonthSecond,
    state.MonthlyCommissionDetail.EndDateMonthSecond = monthlyCommissionDetail.EndDateMonthSecond       
    state.MonthlyCommissionDetail.TotalCommissionMonthFirst = monthlyCommissionDetail.TotalCommissionMonthFirst,
    state.MonthlyCommissionDetail.TotalCommissionMonthSecond = monthlyCommissionDetail.TotalCommissionMonthSecond           
  },
  [SET_MONTHLY_PROMOBONUS]:(state: ReportState, MonthlyPromoBonus) => {  
    state.MonthlyPromoBonus.code = MonthlyPromoBonus.Code;
    state.MonthlyPromoBonus.message = MonthlyPromoBonus.Message,
    state.MonthlyPromoBonus.data = MonthlyPromoBonus.Data;   
  },
  [SET_REFERRAL_LIST]:(state: ReportState, referrals) => {
    state.Referrals.code = referrals.Code;
    state.Referrals.message = referrals.Message,
    state.Referrals.data = referrals.Data;   
  },
  [SET_TRANSACTION_HISTORY]:(state: ReportState, transactionHistory) => {
    state.TransactionHistory.code =  transactionHistory.Code;
    state.TransactionHistory.message = transactionHistory.Message,
    state.TransactionHistory.data = transactionHistory.Data;   
  },
  [SET_AWARD_BONUS_SUMMARY_LIST]:(state: ReportState, summary) => {
    state.AwardBonusSummary =  summary;   
  },
  [SET_AWARD_BONUS_BALANCE]:(state: ReportState, balance) => {
    state.AwardBonusBalance =  balance;   
  },
  [SET_SUBMIT_AWARD_BONUS_RESULT]:(state: ReportState, result) => {
    state.AwardBonusSubmissionResult =  result;   
  },
  [SET_AFFILIATE_PROMOTING_LIST]:(state: ReportState, promoting) => {
    state.AffiliatePromoting.code = promoting.Code;
    state.AffiliatePromoting.message = promoting.Message,
    state.AffiliatePromoting.data = promoting.Data;   
  },
};
export default mutations;

