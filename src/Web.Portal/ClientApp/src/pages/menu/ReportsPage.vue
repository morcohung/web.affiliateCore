<template>
  <VSheet class="bg--gray">
    <VContainer class="larger">
      <VRow>
        <VCol cols="4" class="d-none d-md-block desktop-sidebar">
          <VCard elevation="0" outlined class="rounded-lg">
            <VList>
              <VListItemGroup>
                <div v-for="(item, $index) in items" :key="$index">
                  <VListItem
                    color="#ffa301"
                    @click.stop="switchPage(item.path)"
                    :class="{ 'v-list-item--active': item.path == currentPage }"
                  >
                    <VListItemTitle class="text--primary">
                      {{ item.title }}
                    </VListItemTitle>
                  </VListItem>
                  <VDivider v-if="$index < items.length - 1"></VDivider>
                </div>
              </VListItemGroup>
            </VList>
          </VCard>
        </VCol>
        <VCol class="main-content">
          <SummaryReport
            v-if="currentPage == `summary-report`"
            @goToLink="switchPage"
          />
          <GPR
            v-if="currentPage == `GPR`"
            @goBack="switchPage('summary-report')"
          />
          <CollateralPerformance
            v-if="currentPage == `collateral-performance`"
            @goBack="switchPage('summary-report')"
          />
          <MonthlyCommissions
            v-if="currentPage == `monthly-commissions`"
            @goBack="switchPage('summary-report')"
          />
          <CommissionPayout
            v-if="currentPage == `commission-payout`"
            @goBack="switchPage('summary-report')"
          />
          <Referrals
            v-if="currentPage == `referrals`"
            @goBack="switchPage('summary-report')"
          />
        </VCol>
      </VRow>
    </VContainer>
  </VSheet>
</template>
<script>
// The back arrow navigation and reports navigation are a bit buggy...
// please find a better way to implement
import SummaryReport from '@/components/reports/SummaryReport';
import GPR from '@/components/reports/GPR';
import CollateralPerformance from '@/components/reports/CollateralPerformance';
import MonthlyCommissions from '@/components/reports/MonthlyCommissions';
import CommissionPayout from '@/components/reports/CommissionPayout';
import Referrals from '@/components/reports/Referrals';
import { mapGetters, mapState, mapActions } from 'vuex';
export default {
  inject: ['reload'],
  data: () => ({
    currentPage: 'summary-report',
    items: [
      { title: 'Summary', path: 'summary-report' },
      { title: 'Collateral Performance', path: 'collateral-performance' },
      { title: 'Referrals', path: 'referrals' },
      { title: 'Gross Product Revenue', path: 'GPR' },
      { title: 'Monthly Commissions', path: 'monthly-commissions' },
      { title: 'Commission Payout', path: 'commission-payout' },
    ],
  }),
  components: {
    SummaryReport,
    GPR,
    CollateralPerformance,
    MonthlyCommissions,
    CommissionPayout,
    Referrals,
  },
  created: function() {  
    this.items[0].title = this.$t(`summary`);
    this.items[1].title = this.$t(`collateral.performance`);
    this.items[2].title = this.$t(`referrals`);
    this.items[3].title = this.$t(`gross.product.revenue`);
    this.items[4].title = this.$t(`monthly.commissions`);
    this.items[5].title = this.$t(`commission.payout`);
    Promise.all([this.checkSession()]).then(() => { 
      if(this.SessionModel.Status != 1)   
      {
        this.$router.push({ path: `/${this.langCode}/` });
        this.reload();
      }  
    });     
  },  
  computed: {   
    ...mapGetters({
      langCode: 'langCode',
    }),     
    ...mapState('Auth',['SessionModel'])
  },   
  methods: {
    ...mapActions('Auth', ['checkSession']),
    switchPage(path) {
      this.currentPage = path;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/05_pages/_reports';
</style>
