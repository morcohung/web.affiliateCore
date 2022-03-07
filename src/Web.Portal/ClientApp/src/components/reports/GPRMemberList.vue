<template>
  <div class="gpr-member-summary mt-6">
    <VCard
      class="rounded-lg mb-4"
      outlined
      :elevation="$vuetify.breakpoint.mdAndDown ? 4 : 0"
    >
      <SearchDrawer
        :isSearchVisible="isSearchVisible"
        @closeSearch="showSearch(false)"
      >
        <VCard class="ma-4" color="#f6f6f6" flat>
          <VCardText>
            <VRow dense class="align-center">
              <!-- <VCol class="text-center" cols="4" offset-sm="1" sm="2">
              <RevenueChart
                :pieSlice="
                  getPieSlice(
                    GPRSummaryDetailModel.GrossProductRevenueSummary.find(
                      (e) => e.SettlementType == detailSetting.settlementType
                    ).NetRevenue,
                    GPRSummaryDetailModel.GrossProductRevenueSummary.find(
                      (e) => e.SettlementType == detailSetting.settlementType
                    ).GrossRevenue
                  )
                "
              ></RevenueChart>
            </VCol> -->
              <VCol cols="6" offset="0" offset-sm="3">
                <VRow dense>
                  <VCol class="d-flex">
                    <VAvatar
                      size=".75rem"
                      color="#ff9200"
                      class="mt-1 mr-2"
                    ></VAvatar>
                    <div>
                      <div class="text-xxs">{{ $t(`total.stake`) }}</div>
                      <div class="text-md">
                        <span class="text--secondary mr-2">{{
                          detailSetting.product.Currency
                        }}</span>
                        <span class="text--primary font-weight-bold">{{
                          formatNumber(detailSetting.product.Stake)
                        }}</span>
                      </div>
                    </div>
                  </VCol>
                  <VCol class="d-flex">
                    <VAvatar size=".75rem" color="#666666" class="mt-1 mr-2">
                    </VAvatar>
                    <div>
                      <div class="text-xxs">
                        {{ $t(`total.gross.revenue`) }}
                      </div>
                      <div class="text-md">
                        <span class="text--secondary mr-2">{{
                          detailSetting.product.Currency
                        }}</span>
                        <span class="text--primary font-weight-bold">{{
                          formatNumber(detailSetting.product.GrossRevenue)
                        }}</span>
                      </div>
                    </div>
                  </VCol>
                </VRow>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
        <template v-if="!detailSetting.isMultiProduct">
          <h2 class="text-md ma-4" v-if="!filtered">{{$t(`all.members`)}}</h2>
          <VCard flat color="transparent" v-if="filtered">
            <VCardText class="pt-0">
              <template>
                <VTextField
                  v-model="filterValue"
                  prepend-inner-icon="icon-stick-arrow-left text-md"
                  append-icon="icon-search"
                  hide-details="true"
                  @click.stop="showSearch"
                  value=""
                ></VTextField>
                <div class="mt-3 ">
                  <div>
                    <h3 class="text-xs">{{$t(`search.results.from.members`)}}</h3>
                    <p class="text-xxs mb-0">{{ memberCount }} {{$t(`results`)}}</p>
                  </div>
                </div>
              </template>
            </VCardText>
          </VCard>
          <VList>
            <VItemGroup>
              <div v-for="(detail, $index) in filterProdutDetail" :key="$index">
                <VListItem @click="moreDetails(true, detail.MemberCode)">
                  <VRow class="align-center">
                    <VCol cols="5" sm="3" md="3">
                      <div class="font-weight-bold text--primary">
                        {{ detail.MemberCode }}
                      </div>
                    </VCol>
                    <VCol cols="7" sm="4">
                      <div class="text-md text-right">
                        <span class="text--secondary mr-2">{{
                          detail.Currency
                        }}</span>
                        <span class="text--primary">{{
                          detail.TotalGrossRevenue
                        }}</span>
                      </div>
                      <div class="text-xxs text-right">
                        {{ $t(`total.gross.revenue`) }}
                      </div>
                    </VCol>
                    <VDivider
                      vertical
                      class="my-4 d-none d-sm-block"
                    ></VDivider>
                    <VCol
                      v-if="detail.LastDepositDate != '-'"
                      class="d-none d-sm-block"
                      cols="2"
                      sm="3"
                      md="3"
                    >
                      <div class="text-md text-right pr-sm-6">
                        <span class="text--primary">{{
                          detail.LastDepositDate
                        }}</span>
                      </div>
                      <div class="text-xxs text-right pr-sm-6">
                        {{$(`colLastDepositDate`)}}
                      </div>
                    </VCol>
                    <VCol
                      v-if="detail.LastDepositDate == '-'"
                      class="d-none d-sm-block"
                      cols="2"
                      sm="3"
                      md="3"
                    >
                      <div class="text-md text-right pr-sm-6">
                        <span class="text--primary">{{
                          detail.RegistrationDate
                        }}</span>
                      </div>
                      <div class="text-xxs text-right pr-sm-6">
                        {{ $t(`registration.date`) }}
                      </div>
                    </VCol>
                    <VDivider
                      vertical
                      class="my-4 d-none d-sm-block"
                    ></VDivider>
                    <VCol class="d-none d-sm-block" cols="2" sm="2">
                      <div class="text-md text-right">
                        <span class="text--primary">{{
                          detail.MemberStatus
                        }}</span>
                      </div>
                      <div class="text-xxs text-right">
                        {{ $t(`member.status`) }}
                      </div>
                    </VCol>
                  </VRow>
                </VListItem>
                <VDivider class="my-2"></VDivider>
              </div>
            </VItemGroup>
          </VList>
        </template>
      </SearchDrawer>
    </VCard>
    <VCard color="transparent" flat v-if="detailSetting.isMultiProduct">
      <VRow dense>
        <VCol
          v-for="(childProduct, $index) in detailSetting.product
            .ChildProductList"
          :key="$index"
          class="mb-2"
          cols="12"
          sm="6"
        >
          <GPRProductSummary
            :yearMonth="detailSetting.yearMonth"
            :settlementType="detailSetting.settlementType"
            :parentProduct="detailSetting.product"
            :product="childProduct"
            @goToDetail="goToDetail"
          ></GPRProductSummary>
        </VCol>
      </VRow>
    </VCard>
  </div>
</template>
<script>
import RevenueChart from '@/components/charts/PieChart';
import GPRProductSummary from '@/components/reports/GPRProductSummary';
import { formatNumber } from '@/utils/numberFormat';
import SearchDrawer from '@/components/search/SearchDrawer.vue';
export default {
  data: () => ({
    pieSlice: Math.floor(Math.random() * 100),
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    filtered: true,
    filterValue: '',
    filteredGPRProductDetailModel: {},
    filtered: false,
  }),
  props: {
    detailSetting: { type: Object, default: () => ({}) },
    GPRSummaryDetailModel: { type: Object, default: () => ({}) },
    GPRProductDetailModel: {
      type: Object,
      default: () => ({}),
    },
    isSearchVisible: { default: false },
  },
  computed: {
    filterProdutDetail: function() {
      if (this.filterValue.length > 0) {
        return this.GPRProductDetailModel.ProductDetailList.filter((d) =>
          d.MemberCode.includes(this.filterValue)
        );
      } else {
        return this.GPRProductDetailModel.ProductDetailList;
      }
    },
    memberCount: function() {
      if (this.GPRProductDetailModel.ProductDetailList) {
        if (this.filterValue.length > 0) {
          return this.GPRProductDetailModel.ProductDetailList.filter((d) =>
            d.MemberCode.includes(this.filterValue)
          ).length;
        } else {
          return this.GPRProductDetailModel.ProductDetailList.length;
        }
      } else {
        return 0;
      }
    },
  },
  components: { RevenueChart, GPRProductSummary, SearchDrawer },
  methods: {
    moreDetails(payload, memberCode) {
      this.$emit('moreDetails', payload, memberCode);
    },
    closeMemberDetails() {
      this.$emit('closeMemberDetails');
    },
    goToDetail(productTitle, productCode, settlementType, parentProductCode) {
      this.$emit(
        'goToDetail',
        productTitle,
        productCode,
        settlementType,
        parentProductCode
      );
    },
    formatNumber(number) {
      return formatNumber(number);
    },
    getPieSlice(netRevenue, grossRevenue) {
      var rate = (netRevenue / grossRevenue) * 100;
      return rate;
    },
    showSearch() {
      this.$emit('showSearch');
    },
    closeSearch() {
      this.$emit('closeSearch');
    },
  },
  mounted() {
    this.$emit('changeHeaderFeatures', ['haveBackButton', 'haveDownload']);
  },
  destroyed() {
    console.log('destoryed');
    this.$emit('changeHeaderFeatures', ['haveDownload']);
  },
};
</script>
<style lang="scss" scoped>
.v-card {
  &::v-deep {
    @include icon(
      ('icon-stick-arrow-left', 'icon-search'),
      (
        'class': 'v-icon',
      )
    );
    .v-input__slot {
      .v-icon {
        font-size: rem(16);
      }
    }
  }
}
</style>
