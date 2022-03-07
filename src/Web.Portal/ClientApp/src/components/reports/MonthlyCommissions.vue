<template>
  <div class="gpr-lobby pb-2 pb-md-0">
    <SubPageHeader
      @goBack="goBack"
      @showFilter="showFilter"
      :headingTitle="headingTitle"
      :headingSubTitle="headingSubTitle"
      :features="features"
      :MonthlyCommissionFilter="MonthlyCommissionFilter"
      :pageName="pageName"
    ></SubPageHeader>

    <div v-if="masterPage">
      <VTabs
        v-model="tab"
        background-color="transparent"
        color="#ff9200"
        class="d-none d-md-block mt-4"     
      >
        <VTab @click="getMonthSummary()">
          {{$t(`summary`)}}
        </VTab>
        <VTab @click="getDetaildata(1)">
          {{FirstMonthly}}
        </VTab>
        <VTab @click="getDetaildata(0)">
          {{SecondMonthly}}
        </VTab>
        <VTab @click="getDetaildata(-1)">
          {{ThirdMonthly}}
        </VTab>
      </VTabs>
      <VDivider class="d-none d-md-block mb-4"></VDivider>

      <VTabsItems
        v-model="tab"
        class="rounded-lg pb-4 reports-content"
        touchless
      >
        <VTabItem>
          <MonthlyCommissionsSummary 
          :tabID ="tab"
          :MonthlyCommissionSummary="MonthlyCommissionSummary"
          @switchTabs="switchTabs" />
        </VTabItem>
        <VTabItem>
          <MonthlyCommissionsDetail 
          :monthlyDetail="MonthlyDetail"
          :headingSubTitle="FirstMonthly"
          :MonthlyCommissionFilter="MonthlyCommissionFilter"/>
        </VTabItem>
        <VTabItem>
          <MonthlyCommissionsDetail 
          :monthlyDetail="MonthlyDetail"
          :headingSubTitle="SecondMonthly"
          :MonthlyCommissionFilter="MonthlyCommissionFilter"/>
        </VTabItem>
        <VTabItem>
          <MonthlyCommissionsDetail 
          :monthlyDetail="MonthlyDetail"
          :headingSubTitle="ThirdMonthly"
          :MonthlyCommissionFilter="MonthlyCommissionFilter"/>
        </VTabItem>
      </VTabsItems>
    </div>

    <div v-if="!masterPage"></div>
  </div>
</template>

<script>
import SubPageHeader from '@/components/headers/SubPageHeader';
import SideDrawerDetail from '@/components/reports/SideDrawerDetail';
import FilterResults from '@/components/utilities/FilterResults';
import MonthlyCommissionsSummary from '@/components/reports/MonthlyCommissionsSummary';
import MonthlyCommissionsDetail from '@/components/reports/MonthlyCommissionsDetail';
import { chageMonthsToString } from '@/utils/monthFormat';
import { mapState, mapActions } from 'vuex';
export default {
  data: () => ({
    tab: 0,
    headingTitle: '',
    headingSubTitle: '',
    masterPage: true,
    isFilterVisible: false,
    pageName: 'Monthly Commissions All', 
    features: [
      'haveBackButton',
      'responsiveBackButton',    
      'haveDownload',
    ],
    FirstMonthly: '',
    SecondMonthly: '',
    ThirdMonthly: '', 
    MonthlyCommissionFilter: {    
      AffiliateId: '',    
      DateTimeFrom: '',       
      DateTimeTo: '',   
    },
    MonthlyDetail:{
        Currency: '',
        SettlementCycle:0,
        SequenceMonthFirst:0,
        StartDateMonthFirst:'',
        EndDateMonthFirst:'',        
        TotalCommissionMonthFirst:0 ,
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
        TotalCommissionMonthSecond:0 ,       
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
    }            
  }),
  props: {},
  components: {
    SubPageHeader,
    SideDrawerDetail,
    FilterResults,
    MonthlyCommissionsSummary,
    MonthlyCommissionsDetail,
  },
  created:function(){
      //setting title tab
    var dt = new Date();
    this.FirstMonthly = this.$t(chageMonthsToString(dt.getMonth()-1));
    this.SecondMonthly = this.$t(chageMonthsToString(dt.getMonth()));
    this.ThirdMonthly = this.$t(chageMonthsToString(dt.getMonth()+1));

    this.getMonthSummary();
  },
  computed: {     
    ...mapState('Report', ['MonthlyCommissionSummary','MonthlyCommissionDetail']) 
  },    
  methods: {
    ...mapActions({
      setLang: 'setLang'   
    }), 
    ...mapActions('Report', ['fetchMonthlyCommissionSummary','fetchMonthlyCommissionDetail']),  
    switchTabs(tabId, month) {
      this.tab = tabId;     
      this.headingSubTitle = month;    
      switch (tabId)
      {
        case 1:
          this.getDetaildata(2);
          break;
        case 2:
          this.getDetaildata(1);
          break;
        case 3:
          this.getDetaildata(0);
          break;                    
      }     
      this.features = [
        'haveBackButton',
        'responsiveBackButton',
        'haveFullTable',
        'haveDownload',
      ];
    },
    goToDetail(pageTitle) {
      this.headingSubTitle = pageTitle;
      this.masterPage = false;
      this.responsiveBackButton = false;
    },
    goBack() {
      if (this.tab == 0) {
        this.$emit('goBack');
      } else {
        this.tab = 0;
        this.headingSubTitle = '';
        this.masterPage = true;
      }
    },
    showMoreDetails() {
      this.showMemberDetails = true;
      this.headingSubTitle = 'Sports';
    },
    closeMemberDetails() {
      this.showMemberDetails = false;
    },
    showFilter() {
      this.isFilterVisible = true;
    },
    closeFilters() {
      this.isFilterVisible = false;
    },
    getMonthlyDetail(){      
      this.fetchMonthlyCommissionDetail(this.MonthlyCommissionFilter);
    },
    getDetaildata(sequence){   
      this.pageName = 'Monthly Commissions Detail';
      this.headingTitle = this.$t(`monthly.commissions`);      
      this.MonthlyCommissionFilter.DateTimeFrom = this.getMonthDate(sequence+1);    
      this.MonthlyCommissionFilter.DateTimeTo = this.getMonthDate(sequence);   
      Promise.all([this.fetchMonthlyCommissionDetail(this.MonthlyCommissionFilter)]).then(() => {           
          Object.keys(this.MonthlyCommissionDetail).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(this.MonthlyDetail, key)) {
              this.MonthlyDetail[key] = this.MonthlyCommissionDetail[key];
            }
          });             
      });  
     
    },
    getMonthDate(sequence){
      var dt = new Date();
      var year = dt.getFullYear();
      var month = dt.getMonth()- sequence;
      if(month==0){
          month = 12 ;
          year = year - 1;
      }
      if(month<10){
          month = '0'+ month ;
      }      
      var responseDate = year +'-'+ month +'-01 00:00:00'; 
      return responseDate
    },
    getMonthSummary(){
      this.headingTitle = this.$t(`monthly.commissions`);
      this.pageName = 'Monthly Commissions All';
      this.MonthlyCommissionFilter.DateTimeFrom = this.getMonthDate(2);
      this.MonthlyCommissionFilter.DateTimeTo = this.getMonthDate(-1);
      this.fetchMonthlyCommissionSummary(this.MonthlyCommissionFilter);  
    }    
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/06_overlaps/_v-tabs.scss';
@import '../../assets/scss/04_templates/_gpr-lobby';
</style>
