<template>
  <div class="trend-chart">
    <VCardText class=" pb-0 d-block d-sm-none ">
      <component
        :is="$vuetify.breakpoint.mdAndUp ? `VRow` : `VTabs`"
        v-model="tab"
        color="#ff9200"
      >
        <component :is="$vuetify.breakpoint.mdAndUp ? `VCol` : `VTab`">
          {{ $t(`referrals`) }}
        </component>
        <component :is="$vuetify.breakpoint.mdAndUp ? `VCol` : `VTab`">
          {{ $t(`commissions`) }}
        </component>
      </component>
    </VCardText>
    <VDivider class="pb-0 d-block d-sm-none"></VDivider>
    <VCardText class="pt-sm-2 ">
      <component
        :is="$vuetify.breakpoint.mdAndUp ? `VRow` : `VTabsItems`"
        v-model="tab"
        dense
      >
        <component
          :is="$vuetify.breakpoint.mdAndUp ? `VCol` : `VTabItem`"
          class="trend-chart pr-sm-2"
        >
          <VCard class="rounded-lg " outlined>
            <VCardText class="pa-0">
              <AffTrendChart
                :dataTitle="$t(`referrals`)"
                :dataSets="referralsData"
                :labels="referalsLabels"
              />
            </VCardText>
          </VCard>
        </component>
        <component
          :is="$vuetify.breakpoint.mdAndUp ? `VCol` : `VTabItem`"
          class="trend-chart pl-sm-2"
        >
          <VCard class="rounded-lg" outlined>
            <VCardText class="pa-0">
              <AffTrendChart
                :dataTitle="$t(`commissions`)"
                :dataSets="commissionsData"
                :labels="commissionsLabels"
              />
            </VCardText>
          </VCard>
        </component>
      </component>
    </VCardText>
  </div>
</template>

<script>
import {
  VContainer,
  VRow,
  VTabs,
  VTab,
  VCol,
  VTabsItems,
  VTabItem,
} from 'vuetify/lib';
// import { Action, Getter, Mutation, State } from 'vuex-class';
import { mapState, mapActions } from 'vuex';
import AffTrendChart from '@/components/charts/LineChart';
import { chageMonthToAbbreviation } from '@/utils/monthFormat';
export default {
  name: 'TrendCharts',
  data: () => ({
    referralsData: [
      {
        data: [0, 0, 0],
        smooth: false,
        showPoints: true,
        className: 'orange',
        title: '',
      },
      {
        data: [0, 0, 0],
        smooth: false,
        showPoints: true,
        className: 'purple',
        title: '',
      },
      {
        data: [0, 0, 0],
        smooth: false,
        showPoints: true,
        className: 'blue',
        title: '',
      },
    ],
    commissionsData: [
      {
        data: [0, 0, 0],
        smooth: false,
        showPoints: true,
        className: 'green',
        title: '',
      },
    ],
    referalsLabels: {
      xLabels: [0, 0, 0],
      yLabels: 5,
      yLabelsTextFormatter: (val) => Math.round(val * 100) / 100,
    },
    commissionsLabels: {
      xLabels: [0, 0, 0],
      yLabels: 5,
      yLabelsTextFormatter: (val) => Math.round(val * 100) / 100,
    },
    tab: null,
    CommissionsDataTitle: '',
  }),
  components: {
    VContainer,
    AffTrendChart,
    VRow,
    VTabs,
    VTab,
    VCol,
    VTabsItems,
    VTabItem,
  },
  created: function() {
    Promise.all([this.fetchDashboardInfo()]).then(() => {
      //sign up count
      this.referralsData[0].data = this.DashboardInfo.NewSignUpMemberList.map(
        (item) => item.MemberCount
      );
      this.referralsData[0].title = this.$t(`signUps`);
      // new deposit
      this.referralsData[1].data = this.DashboardInfo.NewSignUpMemberList.map(
        (item) => item.MemberNewDeposit
      );
      this.referralsData[1].title = this.$t(`new.deposits`);
      // active member count
      this.referralsData[2].data = this.DashboardInfo.ActiveMemberList.map(
        (item) => item.MemberCount
      );
      this.referralsData[2].title = this.$t(`actives`);
      // commissions
      this.commissionsData[0].data = this.DashboardInfo.CommissionList.map(
        (item) => item.Commission
      );
      this.commissionsData[0].title = this.$t(`commissions.earned`);

      this.referalsLabels.xLabels = this.DashboardInfo.DashboardDateList.map(
        (item) => this.$t(chageMonthToAbbreviation(item.MonthNum))
      );
      this.commissionsLabels.xLabels = this.DashboardInfo.DashboardDateList.map(
        (item) => this.$t(chageMonthToAbbreviation(item.MonthNum))
      );
    });
  },
  computed: {
    ...mapState('Dashboard', ['DashboardInfo']),
  },
  methods: {
    ...mapActions('Dashboard', ['fetchDashboardInfo']),
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_trend-charts';
</style>
