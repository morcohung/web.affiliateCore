<template>
  <VRow dense>
    <VCol>
      <VCard class="rounded-lg">
        <VCardText class="pb-sm-2">
          <SummaryCard :SummaryCard="SummaryCard" />
        </VCardText>
        <TrendCharts :TrendCharts="TrendCharts" />
      </VCard>
      <MonthlyStats
        class="mt-4"
        monthlyStat="monthlyStat"
        :Monthly="FirstMonthly"
      />
      <MonthlyStats
        class="mt-4"
        monthlyStat="monthlyStat"
        v-if="SecondMonthly.Months !=0"
        :Monthly="SecondMonthly"
      />
      {{SecondMonthly.length}}
      <MonthlyStats
        class="mt-4"
        monthlyStat="monthlyStat"
        v-if="ThirdMonthly.Months !=0"
        :Monthly="ThirdMonthly"
      />
    </VCol>
  </VRow>
</template>
<script>
import { VRow, VCol } from 'vuetify/lib';
// import { Action, Getter, Mutation, State } from 'vuex-class';
import { mapState, mapActions } from 'vuex';
import SummaryCard from '@/components/dashboard/SummaryCard';
import TrendCharts from '@/components/dashboard/TrendCharts';
import MonthlyStats from '@/components/dashboard/MonthlyStats';
import { chageMonthsToString } from '@/utils/monthFormat';
export default {
  name: 'AfterLogin',
  data: () => ({
    SummaryCard: {
      TotalCommissionBalance: 0,
      TotalActives: 0,
      TotalNewDeposits: 0,
      TotalSignUps: 0,
    },
    TrendCharts:{
        NewSignUpList:'',
        NewDepositList:'',
        CommissionList:'',
        ActiveList:'',
        DashboardList:''
    },  
    FirstMonthly:{
      Months:'',
      CommissionBalance: 0,
      Actives: 0,
      NewDeposits: 0,
      SignUps: 0,
    },
    SecondMonthly:{
      Months:'',
      CommissionBalance: 0,
      Actives: 0,
      NewDeposits: 0,
      SignUps: 0,
    },
    ThirdMonthly:{
      Months:'',
      CommissionBalance: 0,
      Actives: 0,
      NewDeposits: 0,
      SignUps: 0,
    },
  }),
  components: {
    VRow,
    VCol,
    SummaryCard,
    MonthlyStats,
    TrendCharts,
  },
  created: function() {
    Promise.all([this.fetchDashboardInfo()]).then(() => {   
      this.SummaryCard.TotalCommissionBalance = this.SumDatareduce(this.DashboardInfo.CommissionList.map(el=>el.Commission));
      this.SummaryCard.TotalActives = this.SumDatareduce(this.DashboardInfo.ActiveMemberList.map(el=>el.MemberCount));
      this.SummaryCard.TotalNewDeposits = this.SumDatareduce(this.DashboardInfo.NewSignUpMemberList.map(el=>el.MemberNewDeposit));
      this.SummaryCard.TotalSignUps = this.SumDatareduce(this.DashboardInfo.NewSignUpMemberList.map(el=>el.MemberCount));    
      
      this.FirstMonthly.Months = this.$t(chageMonthsToString(this.DashboardInfo.DashboardDateList.map(item => item.MonthNum)[0])) ;     
      this.FirstMonthly.CommissionBalance = this.DashboardInfo.CommissionList.map(item => item.Commission)[0];
      this.FirstMonthly.Actives = this.DashboardInfo.ActiveMemberList.map(item => item.MemberCount)[0];
      this.FirstMonthly.NewDeposits = this.DashboardInfo.NewSignUpMemberList.map(item => item.MemberNewDeposit)[0];
      this.FirstMonthly.SignUps = this.DashboardInfo.NewSignUpMemberList.map(item => item.MemberCount)[0];     

      this.SecondMonthly.Months = this.$t(chageMonthsToString(this.DashboardInfo.DashboardDateList.map(item => item.MonthNum)[1])) ;
      this.SecondMonthly.CommissionBalance = this.DashboardInfo.CommissionList.map(item => item.Commission)[1];
      this.SecondMonthly.Actives = this.DashboardInfo.ActiveMemberList.map(item => item.MemberCount)[1];
      this.SecondMonthly.NewDeposits = this.DashboardInfo.NewSignUpMemberList.map(item => item.MemberNewDeposit)[1];
      this.SecondMonthly.SignUps = this.DashboardInfo.NewSignUpMemberList.map(item => item.MemberCount)[1];    
      
      this.ThirdMonthly.Months = this.$t(chageMonthsToString(this.DashboardInfo.DashboardDateList.map(item => item.MonthNum)[2])) ;
      this.ThirdMonthly.CommissionBalance = this.DashboardInfo.CommissionList.map(item => item.Commission)[2];
      this.ThirdMonthly.Actives = this.DashboardInfo.ActiveMemberList.map(item => item.MemberCount)[2];
      this.ThirdMonthly.NewDeposits = this.DashboardInfo.NewSignUpMemberList.map(item => item.MemberNewDeposit)[2];
      this.ThirdMonthly.SignUps = this.DashboardInfo.NewSignUpMemberList.map(item => item.MemberCount)[2];  
    });
  },
  computed: {
    ...mapState('Dashboard', ['DashboardInfo']),
  },
  methods: {
    ...mapActions('Dashboard', ['fetchDashboardInfo']),
    SumDatareduce(arr){
      return arr.reduce((a,b)=>a+b);  
    },    
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_after-login';
</style>
