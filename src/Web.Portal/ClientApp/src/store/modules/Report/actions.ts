import { ActionTree } from 'vuex';
import { ReportState } from './typings';
import { RootState } from '@/store/typings';
import { 
  getReferrals,
  getSummary,
  getGPRSummary,
  getGPRProductSummary,
  getGPRProductDetail,
  getGPRMemberDetail,
  getGPRFilterDetail,
  getGPRToExcel,
  getCommissionPayout,
  getCommissionPayoutToExcel,
  getCommissionPayoutDetail,
  getCommissionPayoutDetailToExcel,
  getMonthlyCommissionSummery,
  getMonthlyCommissionDetail,
  getMonthlyPromoBonusFilter,
  getMonthlyCommissionsAllToExcel,
  getMonthlyCommissionsDetailToExcel,
  getTransactionHistory,
  getAwardBonusSummary,
  getAwardBonusBalance,
  submitAwardBonus,
  getReferralsToExcel,
  getAffiliatePromoting,
  getAffiliatePromotingToExcel
   } from './api';
import {
    SET_REFERRAL_LIST,
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
    SET_TRANSACTION_HISTORY,
    SET_AWARD_BONUS_SUMMARY_LIST,
    SET_AWARD_BONUS_BALANCE,
    SET_SUBMIT_AWARD_BONUS_RESULT,
    SET_AFFILIATE_PROMOTING_LIST
       } from './mutation-types';
const actions: ActionTree<ReportState, RootState> = {
  async fetchSummary({ commit }, summaryfilter) {
    const result = await getSummary(summaryfilter);  
    const Summary=result.data; 
    commit(SET_SUMMARY, Summary);
  },
  async fetchGPRSummary({ commit }) {
    const result = await getGPRSummary();  
    const GPRSummary=result.data; 
    commit(SET_GPRSUMMARY_LIST, GPRSummary);
  },
  async fetchGPRProductSummary({ commit }, filter) {
    const result = await getGPRProductSummary(filter);  
    const GPRProductSummary=result.data; 
    commit(SET_GPRPRODUCTSUMMARY_LIST, GPRProductSummary);
  },
  async fetchGPRProductDetail({ commit }, filter) {
    const result = await getGPRProductDetail(filter);  
    const GPRProductDetail=result.data; 
    commit(SET_GPRPRODUCTDETAIL_LIST, GPRProductDetail);
  },
  async fetchGPRMemberDetail({ commit }, filter) {
    const result = await getGPRMemberDetail(filter);  
    const GPRMemberDetail=result.data; 
    commit(SET_GPRMEMBERDETAIL_LIST, GPRMemberDetail);
  },
  async fetchGPRFilterDetail({ commit }, filter) {
    const result = await getGPRFilterDetail(filter);  
    const GPRFilterDetail=result.data; 
    commit(SET_GPRFILTERDETAIL_LIST, GPRFilterDetail);
  },
  async exportGPR({},filter) {
    const result = await getGPRToExcel(filter);    
  }, 
  async fetchCommissionPayout({ commit }) {
    const result = await getCommissionPayout();  
    const CommissionPayout=result.data; 
    commit(SET_COMMISSION_PAYOUT, CommissionPayout);
  },
  async fetchCommissionPayoutDetail({ commit }, commissionPayoutDetailfilter) {   
    const result = await getCommissionPayoutDetail(commissionPayoutDetailfilter);  
    const CommissionPayoutDetail=result.data; 
    commit(SET_COMMISSION_PAYOUT_DETAIL, CommissionPayoutDetail);
  },
  async ExportCommissionPayout() {
    const result = await getCommissionPayoutToExcel();    
  }, 
  async ExportCommissionPayoutDetail({},commissionPayoutDetailfilte) {
    const result = await getCommissionPayoutDetailToExcel(commissionPayoutDetailfilte);    
  }, 
  async fetchMonthlyCommissionSummary({ commit }, monthlyCommissionSummaryFilter) {
    const result = await getMonthlyCommissionSummery(monthlyCommissionSummaryFilter);  
    const summary=result.data; 
    commit(SET_MONTHLY_COMMISSION_SUMMARY, summary);
  },  
  async fetchMonthlyCommissionDetail({ commit }, monthlyCommissionDetailFilter) {    
    const result = await getMonthlyCommissionDetail(monthlyCommissionDetailFilter);  
    const detail=result.data; 
    commit(SET_MONTHLY_COMMISSION_DETAIL, detail);
  },      
  async fetchMonthlyPromoBonus({ commit }, monthlyPromoBonusFilter) {    
    const result = await getMonthlyPromoBonusFilter(monthlyPromoBonusFilter);  
    const bonus=result.data; 
    commit(SET_MONTHLY_PROMOBONUS, bonus);
  },      
  async ExportMonthlyCommissionsAll({},monthlyCommissionsAllfilte) {
    const result = await getMonthlyCommissionsAllToExcel(monthlyCommissionsAllfilte);    
  }, 
  async ExportMonthlyCommissionsDetail({},monthlyCommissionsAllfilte) {
    const result = await getMonthlyCommissionsDetailToExcel(monthlyCommissionsAllfilte);    
  },
  async fetchReferrals({ commit },referralsFilter) {
    const result = await getReferrals(referralsFilter);  
    const referrals=result.data; 
    commit(SET_REFERRAL_LIST, referrals);
  },
  async fetchTransactionHistory({ commit },filter) {
    const result = await getTransactionHistory(filter);  
    const transactionHistory=result.data; 
    commit(SET_TRANSACTION_HISTORY, transactionHistory);
  },
  async fetchAwardBonusSummary({ commit },memberCode) {
    const result = await getAwardBonusSummary(memberCode);  
    const awardBonusSummary=result.data; 
    commit(SET_AWARD_BONUS_SUMMARY_LIST, awardBonusSummary);
  },
  async fetchAwardBonusBalance({ commit },memberCode) {
    const result = await getAwardBonusBalance(memberCode);  
    const awardBonusBalance=result.data; 
    commit(SET_AWARD_BONUS_BALANCE, awardBonusBalance);
  },
  async postAwardBonusSubmission({ commit },submission) {
    const result = await submitAwardBonus(submission);  
    const awardBonusSubmissionResult=result.data; 
    commit(SET_SUBMIT_AWARD_BONUS_RESULT, awardBonusSubmissionResult);
  },
  async exportReferrals({},filter) {
    const result = await getReferralsToExcel(filter);    
  }, 
  async fetchAffiliatePromoting({ commit },affiliatePromotingFilter) {
    const result = await getAffiliatePromoting(affiliatePromotingFilter);  
    const affiliatePromoting=result.data; 
    commit(SET_AFFILIATE_PROMOTING_LIST, affiliatePromoting);
  },
  async exportAffiliatePromoting({},filter) {
    const result = await getAffiliatePromotingToExcel(filter);    
  },
};

export default actions;
