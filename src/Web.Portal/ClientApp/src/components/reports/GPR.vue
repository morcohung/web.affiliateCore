<template>
  <div class="gpr-lobby pb-2 pb-md-0">
    <SubPageHeader
      @goBack="goBack"
      @showFilter="showFilter"
      :headingTitle="headingTitle"
      :headingSubTitle="headingSubTitle"
      :features="features"
      @downloadFile="downloadFile"
    ></SubPageHeader>
    <div v-if="masterPage">
      <VTabs
        v-model="tab"
        background-color="transparent"
        color="#ff9200"
        class="d-none d-md-block mt-4"
      >
        <VTab @click="getGPRSummarydata()">
          {{ $t(`summary`) }}
        </VTab>

        <VTab
          v-for="(month, $index) in GPRSummaryModel.SummaryList"
          :key="$index"
          @click="getGPRProductSummarydata(month.YearMonth)"
        >
          {{ month.YearMonthString }}
        </VTab>
      </VTabs>
      <VDivider class="d-none d-md-block mb-4"></VDivider>

      <VTabsItems
        v-model="tab"
        class="rounded-lg pb-4 reports-content"
        touchless
      >
        <FilterResults
          v-model="filter.filterItems"
          v-if="tab > 0"
          :isFilterVisible="isFilterVisible"
          :items="filterProducts"
          @closeFilters="closeFilters"
          @showFilter="showFilter"
          @getGPRFilterDetaildata="getGPRFilterDetaildata"
        ></FilterResults>
        <VTabItem>
          <GPRMonthlySummary
            @switchTabs="switchTabs"
            :tabID="0"
            :GPRSummaryModel="GPRSummaryModel"
          />
        </VTabItem>
        <template v-for="month in GPRSummaryModel.SummaryList">
          <VTabItem :key="month.YearMonthString">
            <GPRProductsList
              @goToDetail="goToDetail"
              :GPRSummaryDetailModel="month"
              :GPRProductSummaryModel="GPRProductSummaryModel"
              :GPRFilterDetailModel="GPRFilterDetailModel"
            />
          </VTabItem>
        </template>
      </VTabsItems>
    </div>

    <div v-if="!masterPage">
      <GPRMemberList
        @goToDetail="goToDetail"
        @moreDetails="moreDetails"
        @MemberDetails="closeMemberDetails"
        @changeHeaderFeatures="changeHeaderFeatures"
        @showSearch="showSearch(true)"
        @closeSearch="showSearch(false)"
        :isSearchVisible="isSearchVisible"
        :detailSetting="detailSetting"
        :GPRSummaryDetailModel="
          GPRSummaryModel.SummaryList.find(
            (e) => e.YearMonth == GPRProductSummaryModel.YearMonth
          )
        "
        :GPRProductDetailModel="GPRProductDetailModel"
      />
    </div>
    <SideDrawerDetail
      :headingSubTitle="detailSetting.memberCode"
      :headingTitle="headingTitle"
      :showMoreDetails="showMoreDetails"
      @moreDetails="moreDetails"
    >
      <template slot="sideDrawerContent">
        <VList>
          <VListItem>
            <h2 class="text-md">{{ headingSubTitle }}</h2>
          </VListItem>
          <VDivider></VDivider>
          <VItemGroup>
            <template>
              <div
                v-for="(item, index) in GPRMemberDetailModel.MemberDetailList"
                :key="index"
              >
                <VListItem>
                  <VRow class="align-center">
                    <VCol cols="5">
                      <div class="font-weight-bold text--primary">
                        {{ item.TransactionDate }}
                      </div>
                    </VCol>
                    <VCol cols="7">
                      <div class="text-md text-right">
                        <span class="text--secondary mr-2">{{
                          item.Currency
                        }}</span>
                        <span class="text--primary">{{
                          formatNumber(item.GrossRevenue)
                        }}</span>
                      </div>
                      <div class="text-xxs text-right">
                        {{ $t(`stake`) }}: {{ item.Currency }}
                        {{ formatNumber(item.Stake) }}
                      </div>
                    </VCol>
                  </VRow>
                </VListItem>
                <VDivider class="my-2"></VDivider>
              </div>
            </template>
          </VItemGroup>
        </VList>
      </template>
    </SideDrawerDetail>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import GPRProductsList from '@/components/reports/GPRProductsList';
import GPRMonthlySummary from '@/components/reports/GPRMonthlySummary';
import SubPageHeader from '@/components/headers/SubPageHeader';
import GPRMemberList from '@/components/reports/GPRMemberList';
import SideDrawerDetail from '@/components/reports/SideDrawerDetail';
import FilterResults from '@/components/utilities/FilterResults';
import { chageMonthsToString } from '@/utils/monthFormat';
import { formatNumber } from '@/utils/numberFormat';
import SearchDrawer from '@/components/search/SearchDrawer.vue';

export default {
  data: () => ({
    tab: 2,
    headingTitle: 'Gross Product Revenue',
    headingSubTitle: '',
    masterPage: true,
    isFilterVisible: false,
    showMoreDetails: false,
    features: ['responsiveBackButton', 'haveDownload'],
    GPRSummaryModel: {},
    GPRProductSummaryModel: {},
    GPRProductDetailModel: {},
    GPRMemberDetailModel: {},
    GPRFilterDetailModel: {
      SettlementTypeResultList: [],
    },
    currentProductSummaryYearMonth: '',
    detailSetting: {
      isMultiProduct: false,
      productCode: '',
      yearMonth: '',
      settlementType: 0,
      memberCode: '',
      product: {},
    },
    filterProducts: [],
    filter: {
      filterItems: [],
    },
    isSearchVisible: false,
  }),
  props: {},
  components: {
    GPRProductsList,
    SubPageHeader,
    GPRMemberList,
    SideDrawerDetail,
    GPRMonthlySummary,
    FilterResults,
    SearchDrawer,
  },
  created: function() {
    //setting title tab
    this.headingTitle = this.$t(`gross.product.revenue`);
    var dt = new Date();
    this.FirstMonthly = this.$t(chageMonthsToString(dt.getMonth() - 2));
    this.SecondMonthly = this.$t(chageMonthsToString(dt.getMonth() - 1));
    this.ThirdMonthly = this.$t(chageMonthsToString(dt.getMonth()));
    this.getGPRSummarydata();
  },
  computed: {
    ...mapState('Report', ['GPRSummary']),
    ...mapState('Report', ['GPRProductSummary']),
    ...mapState('Report', ['GPRProductDetail']),
    ...mapState('Report', ['GPRMemberDetail']),
    ...mapState('Report', ['GPRFilterDetail']),
  },
  methods: {
    ...mapActions('Report', ['fetchGPRSummary']),
    ...mapActions('Report', ['fetchGPRProductSummary']),
    ...mapActions('Report', ['fetchGPRProductDetail']),
    ...mapActions('Report', ['fetchGPRMemberDetail']),
    ...mapActions('Report', ['fetchGPRFilterDetail']),
    ...mapActions('Report', ['exportGPR']),
    switchTabs(tabId, month) {
      this.tab = tabId;
      this.headingSubTitle = month.YearMonthString;
      this.haveFilter = true;
      this.features = [
        'haveBackButton',
        'responsiveBackButton',
        'haveDownload',
        'haveFilter',
      ];
      this.getGPRProductSummarydata(month.YearMonth);
    },
    goToDetail(product, yearMonth, settlementType, parentProduct) {
      this.headingSubTitle = product.DisplayName;
      this.masterPage = false;
      this.responsiveBackButton = false;
      this.haveFilter = true;

      this.detailSetting.productCode = product.ProductCode;
      this.detailSetting.yearMonth = yearMonth;
      this.detailSetting.settlementType = settlementType;

      this.detailSetting.product = this.findProduct(
        product.ProductCode,
        settlementType,
        parentProduct.ProductCode
      );

      this.detailSetting.isMultiProduct =
        this.detailSetting.product.ChildProductList.length > 0;
      if (!this.detailSetting.isMultiProduct) {
        this.getGPRProductDetaildata();
      }
    },
    goBack() {
      if (this.tab == 0) {
        this.$emit('goBack');
      } else {
        this.tab = 0;
        this.headingSubTitle = '';
        this.masterPage = true;
        this.haveFilter = false;
      }
    },
    moreDetails(payload, memberCode) {
      this.showMoreDetails = payload;
      this.haveFilter = true;
      this.detailSetting.memberCode = memberCode;
      if (payload) {
        this.getGPRMemberDetaildata();
      }
    },
    closeMemberDetails() {
      this.showMemberDetails = false;
      this.haveFilter = false;
    },
    showFilter() {
      this.isFilterVisible = true;
    },
    closeFilters() {
      this.isFilterVisible = false;
    },
    getGPRSummarydata() {
      this.currentProductSummaryYearMonth = '';
      Promise.all([this.fetchGPRSummary()]).then(() => {
        if (this.GPRSummary.data != null) {
          this.GPRSummaryModel = this.GPRSummary.data;
          this.GPRSummaryModel.SummaryList.forEach((element) => {
            element.YearMonthString = this.$t(
              chageMonthsToString(new Date(element.YearMonth).getMonth() + 1)
            );
          });
        }
      });
    },
    getGPRProductSummarydata(yearMonth) {
      const filter = {
        YearMonth: yearMonth,
        MemberCode: '',
      };
      this.currentProductSummaryYearMonth = yearMonth;
      Promise.all([this.fetchGPRProductSummary(filter)]).then(() => {
        if (this.GPRProductSummary.data != null) {
          this.GPRProductSummaryModel = this.GPRProductSummary.data;
        }

        this.findAllProducts();
      });
      this.clearFilterAndResult();
    },
    getGPRProductDetaildata() {
      var filter = {
        YearMonth: this.detailSetting.yearMonth,
        SettlementType: this.detailSetting.settlementType,
        ProductCode: this.detailSetting.productCode,
      };
      Promise.all([this.fetchGPRProductDetail(filter)]).then(() => {
        if (this.GPRProductDetail.data != null) {
          this.GPRProductDetailModel = this.GPRProductDetail.data;
        }
      });
    },
    getGPRMemberDetaildata() {
      const filter = {
        YearMonth: this.detailSetting.yearMonth,
        SettlementType: this.detailSetting.settlementType,
        ProductCode: this.detailSetting.productCode,
        MemberCode: this.detailSetting.memberCode,
      };
      Promise.all([this.fetchGPRMemberDetail(filter)]).then(() => {
        if (this.GPRMemberDetail.data != null) {
          this.GPRMemberDetailModel = this.GPRMemberDetail.data;
        }
      });
    },
    getGPRFilterDetaildata() {
      if (this.filter.filterItems.length > 0) {
        const filter = {
          YearMonth: this.currentProductSummaryYearMonth,
          ProductCodes: this.filter.filterItems,
        };
        Promise.all([this.fetchGPRFilterDetail(filter)]).then(() => {
          if (this.GPRFilterDetail.data != null) {
            this.GPRFilterDetailModel = this.GPRFilterDetail.data;
          }
        });
      } else {
        this.GPRFilterDetailModel = {
          SettlementTypeResultList: [],
        };
      }
    },
    findProduct(productCode, settlementType, parentProductCode) {
      var product;
      if (parentProductCode == '') {
        product = this.GPRProductSummaryModel.ProductSummaryList.find(
          (e) => e.SettlementType == settlementType
        ).ProductList.find((e) => e.ProductCode == productCode);
      } else {
        product = this.GPRProductSummaryModel.ProductSummaryList.find(
          (e) => e.SettlementType == settlementType
        )
          .ProductList.find((e) => e.ProductCode == parentProductCode)
          .ChildProductList.find((e) => e.ProductCode == productCode);
      }

      return product;
    },
    findAllProducts() {
      this.filterProducts = [];
      this.GPRProductSummaryModel.ProductSummaryList[0].ProductList.forEach(
        (element) => {
          this.filterProducts.push({
            DisplayName: element.DisplayName,
            ProductCode: element.ProductCode,
          });
        }
      );
    },
    getMonthDate(sequence) {
      var dt = new Date();
      var year = dt.getFullYear();
      var month = dt.getMonth() - sequence;
      if (month == 0) {
        month = 12;
        year = year - 1;
      }
      if (month < 10) {
        month = '0' + month;
      }
      var responseDate = year + '-' + month + '-01 00:00:00';
      return responseDate;
    },
    formatNumber(number) {
      return formatNumber(number);
    },
    changeHeaderFeatures(features) {
      this.features = features;
    },
    clearFilterAndResult() {
      this.filter.filterItems = [];
      this.GPRFilterDetailModel = {
        SettlementTypeResultList: [],
      };
    },
    downloadFile() {
      console.log(this.currentProductSummaryYearMonth);
      const filter = {
        YearMonth: this.currentProductSummaryYearMonth,
      };
      this.exportGPR(filter);
    },
  },
  showSearch(state) {
    this.isSearchVisible = state;
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/06_overlaps/_v-tabs.scss';
@import '../../assets/scss/04_templates/_gpr-lobby';
</style>
