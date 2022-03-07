<template>
  <div class="collateral-perfomance">
    <SubPageHeader
      v-if="haveHeading"
      @goBack="goBack"
      @goToFullTable="goToFullTable"
      @showSearch="showSearch(true)"
      @downloadFile="downloadFile"
      :headingTitle="headingTitle"
      :headingSubTitle="headingSubTitle"
      :features="[
        'haveBackButton',
        'responsiveBackButton',
        'haveFullTable',
        'haveSearch',
        'haveDownload',
      ]"
    >
    </SubPageHeader>
    <VTabs
      v-model="tab"
      class="px-3"
      background-color="transparent"
      color="#ff9200"
    >
      <VTab
        v-for="(month, $index) in Last3MonthsArray"
        :key="$index"
        @click="changeMonth(month.date)"
        >{{ month.dateString }}</VTab
      >
    </VTabs>

    <VDivider class="d-none d-md-block mb-4"></VDivider>
    <VTabsItems v-model="tab" touchless>
      <VTabItem v-for="(month, $index) in Last3MonthsArray" :key="$index">
        <CollateralPerformanceList
          @showDetails="showDetails"
          @showSearch="showSearch(true)"
          @closeSearch="showSearch(false)"
          :isSearchVisible="isSearchVisible"
          :AffiliatePromotingModel="AffiliatePromotingModel"
          @setSearchFilter="setSearchFilter"
          @getSearchList="getSearchList"
          :searchItemList="searchItemList"
        ></CollateralPerformanceList>
      </VTabItem>
    </VTabsItems>
    <infinite-loading
      @infinite="getCollateralPerformanceData"
      ref="InfiniteLoading"
    >
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
    <CollateralDetails
      :showCollateralDetails="showCollateralDetails"
      :headingTitle="detailHeadingTitle"
      @showDetails="showDetails"
      :isSearchVisible="isSearchVisible"
      :detailItem="detailItem"
    ></CollateralDetails>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import SubPageHeader from '@/components/headers/SubPageHeader';
import CollateralPerformanceList from '@/components/reports/CollateralPerformanceList';
import CollateralDetails from '@/components/reports/CollateralDetails';
import { chageMonthsToString } from '@/utils/monthFormat';
import InfiniteLoading from 'vue-infinite-loading';
import moment from 'moment';
export default {
  data: () => ({
    headingTitle: 'Collateral Performance',
    detailHeadingTitle: '',
    haveHeading: true,
    headingSubTitle: '',
    showCollateralDetails: false,
    features: [],
    isSearchVisible: false,
    tab: 2,
    filter: {
      ready: false,
      yearMonth: '',
      page: 1,
    },
    AffiliatePromotingModel: {
      PromotingList: [],
    },
    searchAffiliatePromotingModel: {
      PromotingList: [],
    },
    Last3MonthsArray: [],
    detailItem: {},
    searchItemList: [],
  }),
  components: {
    SubPageHeader,
    CollateralPerformanceList,
    CollateralDetails,
    InfiniteLoading,
  },
  created: function() {
    this.headingTitle = this.$t(`collateral.performance`);
    this.getLast3Months();
  },
  computed: {
    ...mapState('Common', ['Last3Months']),
    ...mapState('Report', ['AffiliatePromoting']),
  },
  methods: {
    ...mapActions('Common', ['fetchLast3Months']),
    ...mapActions('Report', ['fetchAffiliatePromoting']),
    ...mapActions('Report', ['exportAffiliatePromoting']),
    showDetails(item, state) {
      console.log(item);
      console.log(state);
      this.detailHeadingTitle = item.CreativeId;
      this.showCollateralDetails = state;
      this.detailItem = item;
    },
    goToFullTable() {
      window.open('/en-gb/full-view', '_blank');
    },
    showSearch(state) {
      this.isSearchVisible = state;
      this.searchItemList = [];
    },
    goBack() {
      this.$emit('goBack');
    },
    getLast3Months() {
      Promise.all([this.fetchLast3Months()]).then(() => {
        if (this.Last3Months != null) {
          this.Last3Months.forEach((element) => {
            var date = element;
            var dateString = chageMonthsToString(
              moment(element, 'yyyy-MM-DD')
                .toDate()
                .getMonth() + 1
            );
            var dateInfo = {
              date: date,
              dateString: this.$t(dateString),
            };
            this.Last3MonthsArray.push(dateInfo);
          });
          this.filter.yearMonth = this.Last3MonthsArray[2].date;
          this.filter.ready = true;
          this.resetInfiniteLoading();
        }
      });
    },
    getCollateralPerformanceData($state) {
      if (!this.filter.ready) {
        $state.complete();
        return;
      }
      const filter = this.prepareFilter();
      Promise.all([this.fetchAffiliatePromoting(filter)]).then(() => {
        if (this.AffiliatePromoting.data != null) {
          if (this.AffiliatePromoting.data.PromotingList.length) {
            this.AffiliatePromotingModel.PromotingList.push(
              ...this.AffiliatePromoting.data.PromotingList
            );
            this.filter.page += 1;
            $state.loaded();
          } else {
            $state.complete();
          }
        }
      });
    },
    prepareFilter() {
      const filter = {
        DateFrom: this.filter.yearMonth,
        Page: this.filter.page,
        PageSize: 20,
      };
      return filter;
    },
    changeMonth(yearMonth) {
      this.filter.yearMonth = yearMonth;
      this.resetInfiniteLoading();
    },
    resetInfiniteLoading() {
      this.filter.page = 1;
      this.AffiliatePromotingModel.PromotingList = [];
      this.$refs.InfiniteLoading.stateChanger.reset();
    },
    getSearchList(input) {
      const filter = {
        CreativeIdFuzzy: input,
        DateFrom: this.filter.yearMonth,
        Page: 1,
        PageSize: -1,
      };
      Promise.all([this.fetchAffiliatePromoting(filter)]).then(() => {
        if (this.AffiliatePromoting.data != null) {
          this.searchAffiliatePromotingModel.PromotingList = this.AffiliatePromoting.data.PromotingList;
          this.searchItemList = this.AffiliatePromoting.data.PromotingList.map(
            (item) => item.CreativeId
          );
        }
      });
    },
    setSearchFilter(selectedItem) {
      //this.changeMonth(this.Last3MonthsArray[2].date);
      this.viewDetailFromSearch(selectedItem);
    },
    viewDetailFromSearch(creativeId) {
      console.log(creativeId);
      var detailItem = this.searchAffiliatePromotingModel.PromotingList.find(
        (e) => e.CreativeId == creativeId
      );
      this.isSearchVisible = false;
      this.showDetails(detailItem, true);
    },
    downloadFile() {
      const filter = this.prepareFilter();
      this.exportAffiliatePromoting(filter);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/06_overlaps/_v-tabs.scss';
</style>
