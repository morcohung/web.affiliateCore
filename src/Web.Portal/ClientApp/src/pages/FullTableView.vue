<template>
  <div class="full-table">
    <TheHeader>
      <template v-if="fullTableView">
        <div>
          <div class="text-xs mb-1">{{ $t(`collateral.performance`) }}</div>
          <VBtn
            color="#ffffff"
            class="black--text"
            small
            @click.stop="
              moreDetails({
                isShow: true,
                subpage: 'year',
                title: 'Year Month',
              })
            "
          >
            <span class="betfont icon-calendar mr-2"></span>
            {{ showCurrentMonth() }}
          </VBtn>
        </div>
        <VSpacer></VSpacer>
        <VBtn icon small class="mr-2" @click.stop="showSearch">
          <span class="betfont icon-search"></span>
        </VBtn>
        <VBtn icon small class="mr-1" @click.stop="downloadFile">
          <span class="betfont icon-download"></span>
        </VBtn>
      </template>
    </TheHeader>
    <SearchDrawer
      :isSearchVisible="isSearchVisible"
      @closeSearch="closeSearch"
      @setSearchFilter="setSearchFilter"
      @getSearchList="getSearchList"
      :searchSuggestions="searchItemList"
    ></SearchDrawer>
    <VDataTable
      :headers="headers"
      :items="dataTable"
      :items-per-page="-1"
      class="elevation-1"
      mobile-breakpoint="1"
      :calculate-widths="true"
      :hide-default-footer="true"
      no-data-text="No records found"
    >
      <template v-slot:item.CreativeID="{ item }">
        {{ item.CreativeID }}
      </template>
      <template v-slot:item.banner="{ item }">
        <VImg max-width="3.125rem" :src="item"></VImg>
      </template>
      <template v-slot:item.mediaSource="{ item }">
        <div class="media-source">{{ item.mediaSource }}</div>
      </template>
    </VDataTable>
    <SideDrawerDetail
      headingSubTitle=""
      :headingTitle="'Collateral Performance'"
      :showMoreDetails="showMoreDetails"
      @moreDetails="moreDetails"
    >
      <template slot="sideDrawerContent">
        <template v-for="month in Last3MonthsArray" v-if="subpage == 'year'">
          <VList>
            <VListItem class="px-8" @click="changeMonth(month.date)">{{
              month.dateString
            }}</VListItem>
          </VList>
          <VDivider></VDivider>
        </template>
      </template>
    </SideDrawerDetail>
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
// This component must use the header with <TheHeader :fullTableView="fullTableView" />
// fullTableView must be set to true
import { mapGetters, mapState, mapActions } from 'vuex';
import TheHeader from '@/components/common/TheHeader.vue';
import SideDrawerDetail from '@/components/reports/SideDrawerDetail.vue';
import CollateralDetails from '@/components/reports/CollateralDetails';
import moment from 'moment';
import { formatNumber } from '@/utils/numberFormat';
import SearchDrawer from '@/components/search/SearchDrawer.vue';
export default {
  data: () => ({
    detailHeadingTitle: '',
    fullTableView: true,
    showMoreDetails: false,
    isSearchVisible: false,
    showCollateralDetails: false,
    subpage: '',
    headers: [
      {
        text: 'Creative ID',
        align: 'start',

        value: 'CreativeID',
      },
      { text: 'Banner', sortable: false, value: 'banner' },
      { text: 'Name', value: 'name' },
      { text: 'Size', value: 'size' },
      { text: 'Media Source', value: 'mediaSource' },
      { text: 'Impressions', value: 'impressions' },
      { text: 'Clicks', value: 'clicks' },
      { text: 'Interest Members', value: 'interestMembers' },
      { text: 'Sign ups', value: 'signUps' },
      { text: 'Deposits', value: 'deposits' },
    ],
    dataTable: [
      {
        CreativeID: '001',
        banner: 159,
        name: 'Banner 1001',
        size: '200X200',
        mediaSource: 'http://youtube.com/username/gogogo',
        impressions: 13245,
        clicks: 1232,
        interestMembers: 345,
        signUps: 3465,
        deposits: 100,
      },
    ],

    filter: {
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
    TheHeader,
    SideDrawerDetail,
    SearchDrawer,
    CollateralDetails,
  },
  created: function() {
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
    moreDetails(payload) {
      switch (payload.subpage) {
        case 'year':
          break;
        default:
          break;
      }
      this.showMoreDetails = payload;
      this.headingSubTitle = payload.memberCode;
      this.haveFilter = true;
      this.subpage = payload.subpage;
    },
    getLast3Months() {
      Promise.all([this.fetchLast3Months()]).then(() => {
        if (this.Last3Months != null) {
          this.Last3Months.forEach((element) => {
            var date = element;
            var dateString = moment(element, 'yyyy-MM-DD').format('MMM yyyy');
            var dateInfo = {
              date: date,
              dateString: dateString,
            };
            this.Last3MonthsArray.push(dateInfo);
          });
          this.filter.yearMonth = this.Last3MonthsArray[2].date;
        }
        this.getCollateralPerformanceData();
      });
    },
    getCollateralPerformanceData() {
      const filter = this.prepareFilter();
      Promise.all([this.fetchAffiliatePromoting(filter)]).then(() => {
        if (this.AffiliatePromoting.data != null) {
          this.AffiliatePromotingModel = this.AffiliatePromoting.data;

          this.dataTable = this.AffiliatePromoting.data.PromotingList.map(
            function(value, index, array) {
              return {
                CreativeID: value.CreativeId,
                banner: value.PreviewUrl,
                name: value.BannerName,
                size: value.BannerSize,
                mediaSource: value.MediaSource,
                impressions: value.ImpressionCount,
                clicks: value.ClickCount,
                interestMembers: value.InterestMemberCount,
                signUps: value.NewSignUp,
                deposits: value.NewSignUpDeposit,
              };
            }
          );
        }
      });
    },
    prepareFilter() {
      const filter = {
        DateFrom: this.filter.yearMonth,
        Page: this.filter.page,
        PageSize: -1,
      };
      return filter;
    },
    changeMonth(yearMonth) {
      this.filter.yearMonth = yearMonth;
      this.showMoreDetails = false;
      this.getCollateralPerformanceData();
    },
    showCurrentMonth() {
      return moment(this.filter.yearMonth, 'yyyy-MM-DD').format('MMM yyyy');
    },
    showSearch() {
      this.isSearchVisible = true;
      this.searchItemList = [];
    },
    closeSearch() {
      this.isSearchVisible = false;
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
      var detailItem = this.searchAffiliatePromotingModel.PromotingList.find(
        (e) => e.CreativeId == creativeId
      );
      this.isSearchVisible = false;
      this.showDetails(detailItem, true);
    },
    showDetails(item, state) {
      this.detailHeadingTitle = item.CreativeId;
      this.showCollateralDetails = state;
      this.detailItem = item;
    },
    downloadFile() {
      const filter = this.prepareFilter();
      this.exportAffiliatePromoting(filter);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../assets/scss/05_pages/_full-table-view';
</style>
