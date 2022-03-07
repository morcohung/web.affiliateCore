import axiosInstance from '@/utils/axios-instance';
import { 
  SummaryFilter,  
  CommissionPayoutDetailFilter,
  MonthlyCommissionSummaryFilter,
  GPRProductSummaryFilter,
  GPRProductDetailFilter,
  GPRMemberDetailFilter,
  GPRFilterDetailFilter,
  GPRExportFilter,
  ReferralsFilter,
  TransactionHistoryFilter,
  AwardBonusSubmission,
  AffiliatePromotingFilter
} from './typings';
import download from '@/utils/downloadFile';

export function getGPRSummary()  {
  return axiosInstance.post('/Api/Report/GPRSummary', {}, false);
}
export function getGPRProductSummary(filter:GPRProductSummaryFilter)  {
  const data ={
    YearMonth: filter.YearMonth,
    MemberCode:filter.MemberCode
  }
  return axiosInstance.post('/Api/Report/GPRProductSummary', data, false);
}
export function getGPRProductDetail(filter:GPRProductDetailFilter)  {
  const data ={
    YearMonth: filter.YearMonth,
    SettlementType: filter.SettlementType,  
    ProductCode: filter.ProductCode,  
  }
  return axiosInstance.post('/Api/Report/GPRProductDetail', data, false);
}
export function getGPRMemberDetail(filter:GPRMemberDetailFilter)  {
  const data ={
    YearMonth: filter.YearMonth,
    SettlementType: filter.SettlementType,  
    ProductCode: filter.ProductCode,  
    MemberCode: filter.MemberCode,  
  }
  return axiosInstance.post('/Api/Report/GPRMemberDetail', data, false);
}
export function getGPRFilterDetail(filter:GPRFilterDetailFilter)  {
  const data ={
    YearMonth: filter.YearMonth, 
    ProductCodes: filter.ProductCodes,   
  }
  return axiosInstance.post('/Api/Report/GPRFilterDetail', data, false);
}

export function getGPRToExcel(GPRExportFilter:GPRExportFilter)  {
  const data = {
    YearMonth: GPRExportFilter.YearMonth
  };  
  return download.downLoadPost('/Api/Report/GPRExport','GPR', data);
}

export function getSummary(summaryfilter:SummaryFilter)  {
  const data = {
    AffiliateCode: summaryfilter.AffiliateCode,
    YearMonth: summaryfilter.YearMonth,
    SettlementType: summaryfilter.SettlementType,  
    LanguageCode: summaryfilter.LanguageCode, 
    ConvertToAffCurrency: summaryfilter.ConvertToAffCurrency   
  };

  return axiosInstance.post('/Api/Report/GetReportLobby', data, false);
}

export function getCommissionPayout()  {

  return axiosInstance.post('/Api/Report/CommissionPayout', {}, false);
}

export function getCommissionPayoutDetail(commissionPayoutDetailfilter:CommissionPayoutDetailFilter)  {  
  const data = {
    AffiliateId: commissionPayoutDetailfilter.AffiliateId,
    CommissionPayoutId: commissionPayoutDetailfilter.CommissionPayoutId,
    CommssnRcvId: commissionPayoutDetailfilter.CommssnRcvId      
  };
  
  return axiosInstance.post('/Api/Report/CommissionPayoutDetail', data, false);
}

export function getCommissionPayoutToExcel()  {
  return download.downLoadGet('/Api/Report/CommissionPayoutExport','CommissionPayout',{});
}

export function getCommissionPayoutDetailToExcel(commissionPayoutDetailfilter:CommissionPayoutDetailFilter)  {
  const data = {
    AffiliateId: commissionPayoutDetailfilter.AffiliateId,
    CommissionPayoutId: commissionPayoutDetailfilter.CommissionPayoutId,
    CommssnRcvId: commissionPayoutDetailfilter.CommssnRcvId      
  };  
  return download.downLoadPost('/Api/Report/CommissionPayoutDetailExport','CommissionPayoutDetail', data);
}

export function getMonthlyCommissionSummery(monthlyCommissionSummaryFilter:MonthlyCommissionSummaryFilter)  {
  const data = {
    AffiliateId: monthlyCommissionSummaryFilter.AffiliateId,   
    DateTimeFrom: monthlyCommissionSummaryFilter.DateTimeFrom,
    DateTimeTo: monthlyCommissionSummaryFilter.DateTimeTo,
  };  
  return axiosInstance.post('/Api/Report/MonthlyCommissionSummery', data, false);
}

export function getMonthlyCommissionDetail(monthlyCommissionDetailFilter:MonthlyCommissionSummaryFilter)  {
  const data = {
    AffiliateId: monthlyCommissionDetailFilter.AffiliateId,  
    DateTimeFrom: monthlyCommissionDetailFilter.DateTimeFrom,
    DateTimeTo: monthlyCommissionDetailFilter.DateTimeTo,
  };  
  return axiosInstance.post('/Api/Report/MonthlyCommissionDetail', data, false);
}

export function getMonthlyPromoBonusFilter(monthlyCommissionSummaryFilter:MonthlyCommissionSummaryFilter)  {
  const data = {
    AffiliateId: monthlyCommissionSummaryFilter.AffiliateId,   
    DateTimeFrom: monthlyCommissionSummaryFilter.DateTimeFrom,
    DateTimeTo: monthlyCommissionSummaryFilter.DateTimeTo,
  };  
  return axiosInstance.post('/Api/Report/MonthlyPromoBonus', data, false);
}

export function getMonthlyCommissionsAllToExcel(monthlyCommissionFilter:MonthlyCommissionSummaryFilter)  {
  const data = {
    AffiliateId: monthlyCommissionFilter.AffiliateId,
    DateTimeFrom: monthlyCommissionFilter.DateTimeFrom,
    DateTimeTo: monthlyCommissionFilter.DateTimeTo      
  };  
  return download.downLoadPost('/Api/Report/MonthlyCommissionSummaryExport','MonthlyCommissionSummary', data);
}

export function getMonthlyCommissionsDetailToExcel(monthlyCommissionFilter:MonthlyCommissionSummaryFilter)  {
  const data = {
    AffiliateId: monthlyCommissionFilter.AffiliateId,
    DateTimeFrom: monthlyCommissionFilter.DateTimeFrom,
    DateTimeTo: monthlyCommissionFilter.DateTimeTo       
  };  
  return download.downLoadPost('/Api/Report/MonthlyCommissionDetailExport','MonthlyCommissionDetail', data);
}
export function getReferrals(referralsFilter:ReferralsFilter)  {
  const data={
    MemberCodeFuzzy:referralsFilter.MemberCodeFuzzy,
    YearMonth:referralsFilter.YearMonth,
    SortType:referralsFilter.SortType,
    MemberStatus:referralsFilter.MemberStatus,
    DepositStatus:referralsFilter.DepositStatus,
    RegisterDateFrom:referralsFilter.RegisterDateFrom,
    RegisterDateTo:referralsFilter.RegisterDateTo,
    RegistrationDateExpress:referralsFilter.RegistrationDateExpress,
    MemberCountry:referralsFilter.MemberCountry,
    MemberCurrency:referralsFilter.MemberCurrency,
    Page:referralsFilter.Page,
    PageSize:referralsFilter.PageSize,
  };
  return axiosInstance.post('/Api/Report/Referrals', data, false);
}
export function getTransactionHistory(filter:TransactionHistoryFilter)  {
  const data={
    MemberCode:filter.MemberCode,  
  };
  return axiosInstance.post('/Api/Report/TransactionHistory', data, false);
}
export function getAwardBonusSummary(memberCode:string)  {

  return axiosInstance.get('/Api/Report/GetAwardBonusSummary', {params:{memberCode:memberCode}}, false);
}
export function getAwardBonusBalance(memberCode:string)  {
  const data={
    MemberCode:memberCode,  
  };
  return axiosInstance.post('/Api/Report/GetAwardBonusBalance', data, false);
}
export function submitAwardBonus(submission:AwardBonusSubmission)  {
  const data={
    MemberCode:submission.MemberCode,
    Amount:submission.Amount,
    Rollover:submission.Rollover,
    Remark:submission.Remark

  };
  return axiosInstance.post('/Api/Report/SubmitAwardBonus', data, false);
}

export function getReferralsToExcel(referralsFilter:ReferralsFilter)  {
  const data={
    YearMonth:referralsFilter.YearMonth,
    SortType:referralsFilter.SortType,
    MemberStatus:referralsFilter.MemberStatus,
    DepositStatus:referralsFilter.DepositStatus,
    RegisterDateFrom:referralsFilter.RegisterDateFrom,
    RegisterDateTo:referralsFilter.RegisterDateTo,
    RegistrationDateExpress:referralsFilter.RegistrationDateExpress,
    MemberCountry:referralsFilter.MemberCountry,
    MemberCurrency:referralsFilter.MemberCurrency,
  }; 
  return download.downLoadPost('/Api/Report/ReferralsExport','Referrals', data);
}

export function getAffiliatePromoting(affiliatePromotingFilter:AffiliatePromotingFilter)  {
  const data={
    CreativeIdFuzzy:affiliatePromotingFilter.CreativeIdFuzzy,
    DateFrom:affiliatePromotingFilter.DateFrom,
    Page:affiliatePromotingFilter.Page,
    PageSize:affiliatePromotingFilter.PageSize,
  };
  return axiosInstance.post('/Api/Report/AffiliatePromoting', data, false);
}

export function getAffiliatePromotingToExcel(affiliatePromotingFilter:AffiliatePromotingFilter)  {
  const data={
    CreativeIdFuzzy:affiliatePromotingFilter.CreativeIdFuzzy,
    DateFrom:affiliatePromotingFilter.DateFrom,
    Page:affiliatePromotingFilter.Page,
    PageSize:affiliatePromotingFilter.PageSize,
  };
  return download.downLoadPost('/Api/Report/AffiliatePromotingExport','AffiliatePromoting', data);
}