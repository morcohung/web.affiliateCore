<template>
  <div class="gpr-monthly-summary pb-2 pb-md-0">
    <VCard
      v-for="(month, $index) in GPRSummaryModel.SummaryList"
      :key="$index"
      class="rounded-lg mb-4"
      :elevation="$vuetify.breakpoint.mdAndDown ? 4 : 0"
      :ripple="$vuetify.breakpoint.mdAndDown"
      @click.stop="
        $vuetify.breakpoint.mdAndDown ? switchTabs($index, month) : null
      "
      outlined
    >
      <VCardText>
        <VRow class="align-center">
          <VCol>
            <h2 class="text-md text--primary">
              {{ month.YearMonthString }}
            </h2>
          </VCol>

          <VCol sm="3" class="d-none d-sm-flex justify-center">
            <div>
              <h3 class="text-sm text--primary text-right">
                <span class="text--secondary">{{ month.Currency }}</span>
                {{ formatNumber(month.TotalNetRevenue) }}
              </h3>
              <h4 class="text-xxs text-right">{{ $t(`total.net.revenue`) }}</h4>
            </div>
          </VCol>
          <VDivider vertical class="d-none d-sm-block my-3"></VDivider>
          <VCol sm="3" class="d-flex  justify-center">
            <div>
              <h3 class="text-sm text--primary text-right">
                <span class="text--secondary">{{ month.Currency }}</span>
                {{ formatNumber(month.TotalGrossRevenue) }}
              </h3>
              <h4 class="text-xxs text-right">
                {{ $t(`total.gross.revenue`) }}
              </h4>
            </div>
          </VCol>
        </VRow>
        <template v-if="month.GrossProductRevenueSummary.length > 1">
          <VRow class="mt-4" dense>
            <template v-for="settlement in month.GrossProductRevenueSummary">
              <VCol sm="6" :key="settlement.SettlementType">
                <VCard
                  class="rounded-lg"
                  :color="
                    $vuetify.breakpoint.mdAndUp ? '#f1f1f1' : 'transparent'
                  "
                  flat
                >
                  <VCardText class="px-0 px-sm-4">
                    <h4
                      class="text-xxs text-uppercase font-weight-medium d-none d-sm-block mb-4"
                    >
                      {{
                        CovertSettlementTypeToString(settlement.SettlementType)
                      }}
                    </h4>
                    <VRow>
                      <VCol class="d-none d-sm-block">
                        <h3 class="text-sm text--primary">
                          <span class="text--secondary">{{
                            month.Currency
                          }}</span>
                          {{ formatNumber(settlement.NetRevenue) }}
                        </h3>
                        <h4 class="text-xxs">{{ $t(`total.net.revenue`) }}</h4>
                      </VCol>
                      <VDivider
                        vertical
                        class="d-none d-sm-block my-3"
                      ></VDivider>
                      <VCol class="d-flex justify-start justify-sm-center">
                        <div>
                          <h3 class="text-sm text--primary">
                            <span class="text--secondary">{{
                              month.Currency
                            }}</span>
                            {{ formatNumber(settlement.GrossRevenue) }}
                          </h3>
                          <h4 class="d-none d-sm-block text-xxs">
                            {{ $t(`total.gross.revenue`) }}
                          </h4>
                          <h4 class="d-block d-sm-none text-xxs">
                            {{
                              CovertSettlementTypeToString(
                                settlement.SettlementType
                              )
                            }}
                          </h4>
                        </div>
                      </VCol>
                    </VRow>
                  </VCardText>
                </VCard>
              </VCol>
              <VDivider
                v-if="settlement.SettlementType == 1"
                vertical
                class="d-block d-sm-none my-3"
                :key="settlement.SettlementType + 100"
              ></VDivider>
            </template>
          </VRow>
        </template>
      </VCardText>
    </VCard>
  </div>
</template>
<style lang="scss" scoped>
@import '../../assets/scss/06_overlaps/_v-tabs.scss';
</style>
<script>
import { formatNumber } from '@/utils/numberFormat';
export default {
  data: () => ({
    tab: null,
    GPR: [
      { name: 'December', grossRevenue: 4354.0, netRevenue: 1123.0 },
      { name: 'January', grossRevenue: 6552.0, netRevenue: 2365.0 },
      { name: 'February', grossRevenue: 2345.0, netRevenue: 6543.0 },
    ],
  }),
  props: {
    tabID: { required: true },
    GPRSummaryModel: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    switchTabs(tabId, month) {
      this.$emit('switchTabs', tabId + 1, month);
    },
    formatNumber(number) {
      return formatNumber(number);
    },
    CovertSettlementTypeToString(type) {
      var text = '';
      switch (type) {
        case 1:
          text = this.$t(`first.half.monthly`);
          break;
        case 2:
          text = this.$t(`second.half.monthly`);
          break;
        default:
          break;
      }
      return text;
    },
  },
};
</script>
