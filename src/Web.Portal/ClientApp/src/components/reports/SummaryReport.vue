<template>
  <div class="summary-report">
    <VTabs v-model="tab" background-color="transparent" color="#ff9200">
      <VTab @click="getSummarydata(1)">
        {{FirstMonthly}}
      </VTab>
      <VTab @click="getSummarydata(0)">
        {{SecondMonthly}}
      </VTab>
      <VTab @click="getSummarydata(-1)">
        {{ThirdMonthly}}
      </VTab>
    </VTabs>
    <VDivider class="mb-4"></VDivider>

    <VTabsItems v-model="tab" class="rounded-lg ">
      <VTabItem
        class="summary-cards "
        :class="{
          'theme--light v-sheet--outlined': $vuetify.breakpoint.lgAndUp,
        }"
      >
        <SummaryReportMonthly 
        @goToLink="goToLink"
        :summaryModel="summaryModel"
        >
        </SummaryReportMonthly>
      </VTabItem>
      <VTabItem
        class="summary-cards "
        :class="{
          'theme--light v-sheet--outlined': $vuetify.breakpoint.lgAndUp,
        }"
      >
        <SummaryReportMonthly
         @goToLink="goToLink"
         :summaryModel="summaryModel"
         ></SummaryReportMonthly>
      </VTabItem>
      <VTabItem
        class="summary-cards "
        :class="{
          'theme--light v-sheet--outlined': $vuetify.breakpoint.lgAndUp,
        }"
      >
        <SummaryReportMonthly 
        @goToLink="goToLink"
        :summaryModel="summaryModel"></SummaryReportMonthly>
      </VTabItem>
    </VTabsItems>
  </div>
</template>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_summary-report';
</style>
<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import SummaryReportMonthly from '@/components/reports/SummaryReportMonthly';
import { chageMonthsToString } from '@/utils/monthFormat';
export default {
  name: 'SummaryReport',
  data: () => ({
    tab: null,
    summaryfilter: {
      AffiliateCode: '',
      YearMonth: '',
      SettlementType: 0,
      LanguageCode: '',
      ConvertToAffCurrency: true,
    },
    FirstMonthly: '',
    SecondMonthly: '',
    ThirdMonthly: '',  
    summaryModel:{
        code: 0,
        message: '',
        data: {    
            affiliateCode: '',
            currency: 0,
            yearMonth: '',
            CollateralPerformance:{
                Clicks: 0,
                SignUps: 0,
                Deposits: 0
            },
            Refferrals:{
                Completed: 0,
                Interest: 0,
                Deposits: 0,
            },
            WinlossProduct:[{
                YearMonth: '',
                SettlementType: 0,
                TotalGrossRevenue: 0,
                TotalNetRevenue: 0
            }],
            MonthlyCommissions:[{
                YearMonth: '',
                SettlementType: 0,
                CommissionBalance: 0,
                TotalCommissionEarned: 0,
            }],
            CommissionPayout:{
                Amount:0
            }
        }        
    }  
  }),
  components: {
    SummaryReportMonthly,
  },
  created: function() {
      //setting title tab
    var dt = new Date();
    this.FirstMonthly = this.$t(chageMonthsToString(dt.getMonth()-1));
    this.SecondMonthly = this.$t(chageMonthsToString(dt.getMonth()));
    this.ThirdMonthly = this.$t(chageMonthsToString(dt.getMonth()+1));
    this.getSummarydata(1);

  },
  computed: {
    ...mapState('Report', ['Summary']),
  },
  methods: {
    ...mapActions('Report', ['fetchSummary']),
    goBack() {
      this.$emit('goBack');
    },
    goToLink(payload) {   
      this.$emit('goToLink', payload);
    },
    getSummarydata(sequence){
      this.summaryfilter.YearMonth = this.getMonthDate(sequence);    
      Promise.all([this.fetchSummary(this.summaryfilter)]).then(() => {
      if (this.Summary.data != null)
      {        
        Object.keys(this.Summary).forEach((key) => {
          if (Object.prototype.hasOwnProperty.call(this.summaryModel, key)) {
            this.summaryModel[key] = this.Summary[key];
          }
        });
      } 
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
    }
  },
};
</script>
