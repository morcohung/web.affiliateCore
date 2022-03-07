<template>
  <div class="gpr-monthly-lobby">
    <VCard
      class="pa-2 rounded-lg mb-4"
      outlined
      :elevation="$vuetify.breakpoint.mdAndDown ? 4 : 0"
    >
      <VCard color="#f6f6f6" flat>
        <VCardText>
          <VRow dense class="align-center">
            <VCol class="text-center" cols="4" offset-sm="1" sm="2">
              <RevenueChart
                :pieSlice="
                  getPieSlice(
                    GPRSummaryDetailModel.TotalNetRevenue,
                    GPRSummaryDetailModel.TotalGrossRevenue
                  )
                "
              ></RevenueChart>
            </VCol>
            <VCol cols="6" offset="0" offset-sm="1">
              <VRow dense>
                <VCol class="d-flex">
                  <VAvatar
                    size=".75rem"
                    color="#ff9200"
                    class="mt-1 mr-2"
                  ></VAvatar>
                  <div>
                    <div class="text-xxs">{{ $t(`total.net.revenue`) }}</div>
                    <div class="text-md">
                      <span class="text--secondary mr-2">{{
                        GPRSummaryDetailModel.Currency
                      }}</span>
                      <span class="text--primary font-weight-bold">{{
                        formatNumber(GPRSummaryDetailModel.TotalNetRevenue)
                      }}</span>
                    </div>
                  </div>
                </VCol>
                <VCol class="d-flex">
                  <VAvatar size=".75rem" color="#666666" class="mt-1 mr-2">
                  </VAvatar>
                  <div>
                    <div class="text-xxs">{{ $t(`total.gross.revenue`) }}</div>
                    <div>
                      <span class="text--secondary mr-2">{{
                        GPRSummaryDetailModel.Currency
                      }}</span>
                      <span class="text--primary font-weight-bold">{{
                        formatNumber(GPRSummaryDetailModel.TotalGrossRevenue)
                      }}</span>
                    </div>
                  </div>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCard>
    <VTabs
      v-if="GPRSummaryDetailModel.GrossProductRevenueSummary.length > 1"
      background-color="transparent"
      color="#ff9200"
      v-model="revenuePeriod"
    >
      <VTab
        v-for="(settlement,
        $index) in GPRSummaryDetailModel.GrossProductRevenueSummary"
        :key="$index"
        >{{ CovertSettlementTypeToString(settlement.SettlementType) }}</VTab
      >
    </VTabs>
    <VDivider class="mb-4"></VDivider>
    <VTabsItems
      v-if="GPRFilterDetailModel.SettlementTypeResultList.length == 0"
      v-model="revenuePeriod"
      class="rounded-lg pb-4 reports-content"
      touchless
    >
      <VTabItem
        v-for="(ProductSummary,
        $index) in GPRProductSummaryModel.ProductSummaryList"
        :key="$index"
      >
        <VCard
          class="pa-2 mb-2 rounded-lg"
          v-if="GPRSummaryDetailModel.GrossProductRevenueSummary.length > 1"
        >
          <VCard flat color="#f1f1f1">
            <VCardText>
              <VRow dense>
                <VCol cols="12" sm="6" class="d-flex ">
                  <div>
                    <h4 class="text-xxs">{{$t(`netrevenue`)}}</h4>
                    <h3 class="text-sm text--primary">
                      <span class="text--secondary">{{
                        GPRSummaryDetailModel.Currency
                      }}</span>
                      {{
                        formatNumber(
                          GPRSummaryDetailModel.GrossProductRevenueSummary.find(
                            (e) =>
                              e.SettlementType == ProductSummary.SettlementType
                          ).NetRevenue
                        )
                      }}
                    </h3>
                  </div>
                </VCol>
                <VDivider vertical class="d-none d-sm-block"></VDivider>
                <VCol cols="12" sm="6" class="d-flex pl-md-6">
                  <div>
                    <h4 class="text-xxs">{{$t(`gross.revenue`)}}</h4>
                    <h3 class="text-sm text--primary">
                      <span class="text--secondary">{{
                        GPRSummaryDetailModel.Currency
                      }}</span>
                      {{
                        formatNumber(
                          GPRSummaryDetailModel.GrossProductRevenueSummary.find(
                            (e) =>
                              e.SettlementType == ProductSummary.SettlementType
                          ).GrossRevenue
                        )
                      }}
                    </h3>
                  </div>
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
        </VCard>
        <VCard color="transparent" flat>
          <VRow dense>
            <VCol
              v-for="(product, $indexChild) in ProductSummary.ProductList"
              :key="$indexChild"
              class="mb-2"
              cols="12"
              sm="6"
            >
              <GPRProductSummary
                :yearMonth="GPRSummaryDetailModel.YearMonth"
                :settlementType="ProductSummary.SettlementType"
                :parentProduct="parentProduct"
                :product="product"
                @goToDetail="goToDetail"
              ></GPRProductSummary>
            </VCol>
          </VRow>
        </VCard>
      </VTabItem>
    </VTabsItems>

    <VTabsItems
      v-if="GPRFilterDetailModel.SettlementTypeResultList.length > 0"
      v-model="revenuePeriod"
      class="rounded-lg pb-4 reports-content"
      touchless
    >
      <VTabItem
        v-for="(settlemtnetTypeResult,
        $index) in GPRFilterDetailModel.SettlementTypeResultList"
        :key="$index"
      >
        <VCard color="transparent" flat>
          <VList
            class="rounded-lg mb-1"
            :class="$vuetify.breakpoint.mdAndDown ? 'elevation-4' : ''"
            outlined
          >
            <VItemGroup>
              <div
                v-for="(detail,
                $index) in settlemtnetTypeResult.FilterDetailList"
                :key="$index"
              >
                <VListItem>
                  <VRow class="align-center">
                    <VCol cols="5" sm="5" md="5">
                      <div class="font-weight-bold text--primary">
                        {{ detail.MemberCode }}
                      </div>
                    </VCol>
                    <VCol
                      cols="7"
                      sm="4"
                      class="d-flex justify-end justify-sm-center"
                    >
                      <div>
                        <div class="d-block d-sm-none text-xxs text-right">
                          {{ detail.Product }}
                        </div>
                        <div class="text-md text-right">
                          <span class="text--secondary mr-2">{{
                            detail.Currency
                          }}</span>
                          <span class=" text--primary">{{
                            detail.TotalGrossRevenue
                          }}</span>
                        </div>
                        <div class="d-none d-sm-block text-xxs text-right">
                          {{ $t(`total.gross.revenue`) }}
                        </div>
                      </div>
                    </VCol>
                    <VDivider
                      vertical
                      class="my-4 d-none d-sm-block"
                    ></VDivider>
                    <VCol
                      class="d-none d-sm-flex justify-center"
                      cols="2"
                      sm="3"
                      md="3"
                    >
                      <div>
                        <div class="text-md text-right pr-sm-6">
                          <span class="text--primary">{{
                            detail.Product
                          }}</span>
                        </div>
                        <div class="text-xxs text-right pr-sm-6">
                          {{$t(`product`)}}
                        </div>
                      </div>
                    </VCol>
                  </VRow>
                </VListItem>
                <VDivider class="my-2"></VDivider>
              </div>
            </VItemGroup>
          </VList>
        </VCard>
      </VTabItem>
    </VTabsItems>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import RevenueChart from '@/components/charts/PieChart';
import GPRProductSummary from '@/components/reports/GPRProductSummary';
import { formatNumber } from '@/utils/numberFormat';
export default {
  data: () => ({
    pieSlice: Math.floor(Math.random() * 100),
    grossRevenues: [{ name: '1st Month' }, { name: '2nd Month' }],
    revenuePeriod: 0,
    parentProduct: {
      ProductCode: '',
    },
  }),
  props: {
    GPRSummaryDetailModel: {
      type: Object,
      default: () => ({}),
    },
    GPRProductSummaryModel: {
      type: Object,
      default: () => ({}),
    },
    GPRFilterDetailModel: {
      type: Object,
      default: () => ({}),
    },
  },
  created: function() {},
  computed: {},
  components: { RevenueChart, GPRProductSummary },
  methods: {
    goToDetail(product, yearMonth, settlementType, parentProduct) {
      this.$emit(
        'goToDetail',
        product,
        yearMonth,
        settlementType,
        parentProduct
      );
    },
    getPieSlice(netRevenue, grossRevenue) {
      var rate = (netRevenue / grossRevenue) * 100;
      return rate;
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
<style lang="scss" scoped>
@import '../../assets/scss/06_overlaps/_v-tabs.scss';
</style>
