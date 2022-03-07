<template>
  <div :class="{ 'mx-n3': $vuetify.breakpoint.mdAndDown }">
    <template v-if="page == 'master'">
      <SubPageHeader
        @goBack="goBack"
        @showFilter="showFilter"
        :headingTitle="headingTitle"
        :headingSubTitle="headingSubTitle"
        :features="features"
        @showSearch="showSearch(true)"
        @goToFullTable="goToFullTable"
        @downloadFile="downloadFile"
      ></SubPageHeader>
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
      <VTabsItems v-model="tab">
        <FilterReferrals
          v-model="filter.filterItems"
          :isFilterVisible="isFilterVisible"
          :items="[]"
          :allCountries="filter.AllCountriesModel"
          :allCurrencies="filter.AllCurrenciesModel"
          @closeFilters="closeFilters"
          @showFilter="showFilter"
          @applyFilters="resetInfiniteLoading"
        ></FilterReferrals>
        <VTabItem v-for="(month, $index) in Last3MonthsArray" :key="$index">
          <ReferralsMemberList
            @viewMemberDetail="viewMemberDetail"
            @moreDetails="moreDetails"
            @showSearch="showSearch(true)"
            @closeSearch="showSearch(false)"
            :isSearchVisible="isSearchVisible"
            :ReferralsModel="ReferralsModel"
            @setSearchFilter="setSearchFilter"
            @getSearchList="getSearchList"
            :searchMemberList="searchMemberList"
          />
        </VTabItem>
      </VTabsItems>
      <infinite-loading @infinite="getReferralsdata" ref="InfiniteLoading">
        <div slot="no-more"></div>
        <div slot="no-results"></div>
      </infinite-loading>
    </template>
    <template v-if="page == 'detail'">
      <ReferralsMemberDetail
        @goBack="goBack"
        @moreDetails="moreDetails"
        :member="detailMember"
        :yearMonth="detailYearMonth"
        :TransactionHistoryModel="TransactionHistoryModel"
        :enableAwardBonus="ReferralsModel.EnableAwardBonus"
      />
    </template>
    <SideDrawerDetail
      :headingSubTitle="sideDrawer.headingSubTitle"
      :headingTitle="sideDrawer.headingTitle"
      :showMoreDetails="showMoreDetails.isShow"
      @moreDetails="moreDetails"
    >
      <template slot="sideDrawerContent">
        <ReferralsTransactionHistory
          v-if="subpage == 'history'"
          :TransactionHistoryModel="TransactionHistoryModel"
        />
        <ReferralsAwardBonus
          v-if="subpage == 'award'"
          :awardBonusModel="awardBonusModel"
          @submitAwardBonus="submitAwardBonus"
        />
        <ReferralsBonusSummary
          v-if="subpage == 'summary'"
          :summaryList="awardBonusModel.summary"
          :memberCode="awardBonusModel.memberCode"
        />
        <ReferralsGPRDetail
          v-if="subpage == 'gpr'"
          :Product="GPRProduct"
          :info="GPRinfo"
          @gotoGPRChildDetail="gotoGPRChildDetail"
        />
      </template>
    </SideDrawerDetail>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import SubPageHeader from '@/components/headers/SubPageHeader';
import ReferralsMemberList from '@/components/reports/ReferralsMemberList';
import ReferralsMemberDetail from '@/components/reports/ReferralsMemberDetail';
import SideDrawerDetail from '@/components/reports/SideDrawerDetail';
import ReferralsBonusSummary from '@/components/reports/ReferralsBonusSummary';
import ReferralsAwardBonus from '@/components/reports/ReferralsAwardBonus';
import ReferralsTransactionHistory from '@/components/reports/ReferralsTransactionHistory';
import ReferralsGPRDetail from '@/components/reports/ReferralsGPRDetail';
import SearchDrawer from '@/components/search/SearchDrawer.vue';
import FilterReferrals from '@/components/utilities/FilterReferrals';
import { chageMonthsToString } from '@/utils/monthFormat';
import moment from 'moment';
import InfiniteLoading from 'vue-infinite-loading';
import { SET_ACCOUNT_COMMISSION_BALANCE } from '@/store/modules/Account/mutation-types';
import { formatNumber } from '@/utils/numberFormat';
export default {
  data: () => ({
    headingTitle: '',
    headingSubTitle: '',
    sideDrawer: {
      headingTitle: '',
      headingSubTitle: '',
    },
    features: [
      'haveSearch',
      'haveDownload',
      'haveBackButton',
      'haveFullTable',
      'haveFilter',
      'responsiveBackButton',
      'haveFilter',
      'haveFullTable',
    ],
    page: 'master',
    tab: 2,
    offsetTop: 0,
    showMoreDetails: false,
    subpage: '',
    isSearchVisible: false,
    isFilterVisible: false,
    filterProducts: [],
    searchMemberList: [],
    searchReferralsModel: {
      ReferralList: [],
    },
    detailYearMonth: '',
    filter: {
      ready: false,
      yearMonth: '',
      page: 1,

      filterItems: {
        sortType: '',
        memberStatus: '',
        depositStatus: '',
        registrationDateExpress: '',
        registrationDate: [],
        memberCurrency: '',
        memberCountry: '',
      },
      AllCountriesModel: {
        CountryList: [
          {
            CountryDisplayName: '',
            CountryCode: '',
          },
        ],
      },
      AllCurrenciesModel: {
        CurrencyList: [
          {
            CurrencyCode: '',
          },
        ],
      },
    },
    ReferralsModel: {
      EnableAwardBonus: false,
      ReferralList: [],
    },
    Last3MonthsArray: [],
    detailMember: {},
    TransactionHistoryModel: {
      HistoryList: [],
    },
    GPRinfo: {},
    GPRProduct: {},
    awardBonusModel: {
      memberCode: '',
      balance: {},
      submission: {},
      summary: [],
      loading: false,
    },
  }),
  props: {},
  components: {
    SubPageHeader,
    ReferralsMemberList,
    ReferralsMemberDetail,
    SideDrawerDetail,
    ReferralsTransactionHistory,
    ReferralsAwardBonus,
    ReferralsBonusSummary,
    ReferralsGPRDetail,
    SearchDrawer,
    FilterReferrals,
    InfiniteLoading,
  },
  computed: {
    ...mapState('Report', ['Referrals']),
    ...mapState('Common', ['AllCountries']),
    ...mapState('Common', ['AllCurrencies']),
    ...mapState('Common', ['Last3Months']),
    ...mapState('Report', ['TransactionHistory']),
    ...mapState('Report', ['AwardBonusSummary']),
    ...mapState('Report', ['AwardBonusBalance']),
    ...mapState('Report', ['AwardBonusSubmissionResult']),
  },
  created: function() {
    this.headingTitle = this.$t(`referrals`);
    this.getAllCountries();
    this.getAllCurrencies();
  },
  mounted: function() {
    this.getLast3Months();
  },
  methods: {
    ...mapActions('Report', ['fetchReferrals']),
    ...mapActions('Common', ['fetchAllCountries']),
    ...mapActions('Common', ['fetchAllCurrencies']),
    ...mapActions('Common', ['fetchLast3Months']),
    ...mapActions('Report', ['fetchTransactionHistory']),
    ...mapActions('Report', ['fetchAwardBonusSummary']),
    ...mapActions('Report', ['fetchAwardBonusBalance']),
    ...mapActions('Report', ['postAwardBonusSubmission']),
    ...mapActions('Report', ['exportReferrals']),
    ...mapActions({
      openDialog: 'DialogQueue/queue',
      closeDialog: 'DialogQueue/close',
    }),
    goBack(path) {
      if (this.page == 'master') {
        this.$emit('goBack');
      } else {
        this.page = 'master';
      }
    },
    moreDetails(payload) {
      switch (payload.subpage) {
        case 'history':
          this.getTransactionHistory(payload.memberCode);
          this.sideDrawer.headingTitle = this.$t(`colTransactionHistory`);
          break;
        case 'gpr':
          this.GPRProduct = payload.data;
          this.sideDrawer.headingTitle = this.$t(`gross.product.revenue`);
          this.GPRinfo = {
            yearMonth: payload.yearMonth,
            settlementType: payload.settlementType,
            memberCode: payload.memberCode,
            parentProductName: '',
          };
          break;
        case 'award':
          this.sideDrawer.headingTitle = this.$t(
            `referral.listing.award.bonus`
          );
          this.getAwardBonusBalance(payload.memberCode);
          break;
        case 'summary':
          this.sideDrawer.headingTitle = this.$t(
            `referral.listing.bonus.summary`
          );
          this.getAwardBonusSummary(payload.memberCode);
          break;
        default:
          break;
      }
      this.showMoreDetails = payload;
      this.sideDrawer.headingSubTitle = payload.memberCode;
      this.haveFilter = true;
      this.subpage = payload.subpage;
    },
    showSearch(state) {
      this.isSearchVisible = state;
      this.searchMemberList = [];
    },
    showFilter() {
      this.isFilterVisible = true;
    },
    closeFilters() {
      this.isFilterVisible = false;
    },
    getReferralsdata($state) {
      if (!this.filter.ready) {
        $state.complete();
        return;
      }
      const filter = this.prepareFilter();
      Promise.all([this.fetchReferrals(filter)]).then(() => {
        if (this.Referrals.data != null) {
          this.ReferralsModel.EnableAwardBonus = this.Referrals.data.EnableAwardBonus;
          if (this.Referrals.data.ReferralList.length) {
            this.ReferralsModel.ReferralList.push(
              ...this.Referrals.data.ReferralList
            );
            this.filter.page += 1;
            $state.loaded();
          } else {
            $state.complete();
          }
        }
      });
    },
    getAllCountries() {
      Promise.all([this.fetchAllCountries()]).then(() => {
        if (this.AllCountries != null) {
          this.filter.AllCountriesModel = this.AllCountries;
        }
      });
    },
    getAllCurrencies() {
      Promise.all([this.fetchAllCurrencies()]).then(() => {
        if (this.AllCurrencies != null) {
          this.filter.AllCurrenciesModel = this.AllCurrencies;
        }
      });
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
    getTransactionHistory(memberCode) {
      const filter = {
        MemberCode: memberCode,
      };
      Promise.all([this.fetchTransactionHistory(filter)]).then(() => {
        if (this.TransactionHistory != null) {
          this.TransactionHistoryModel = this.TransactionHistory.data;
        }
      });
    },
    getAwardBonusBalance(memberCode) {
      Promise.all([this.fetchAwardBonusBalance(memberCode)]).then(() => {
        if (this.AwardBonusBalance != null) {
          this.awardBonusModel.balance = this.AwardBonusBalance;
        }
      });
    },
    submitAwardBonus(submission) {
      console.log(submission);
      this.awardBonusModel.loading = true;
      Promise.all([this.postAwardBonusSubmission(submission)]).then(() => {
        if (this.AwardBonusSubmissionResult != null) {
          console.log(this.AwardBonusSubmissionResult);
          this.awardBonusModel.loading = false;
          let payload = {
            title:
              this.AwardBonusSubmissionResult.Status == 0
                ? `Success`
                : `Failed`,
            msg:
              this.AwardBonusSubmissionResult.Status == 0
                ? `You have successfully awarded ${
                    this.awardBonusModel.balance.MemberCurrency
                  } ${this.formatNumber(submission.Amount)} to ${
                    this.awardBonusModel.balance.MemberCode
                  }`
                : this.AwardBonusSubmissionResult.Message,
            buttons: [
              {
                text: this.$t(`okayBtn`),
                color: 'text-link',
                action: this.closeModal,
              },
            ],
          };
          this.openDialog({
            payload,
            setting: { maxWidth: '18.5rem' },
          });
        }
      });
    },
    getAwardBonusSummary(memberCode) {
      this.awardBonusModel.memberCode = memberCode;
      Promise.all([this.fetchAwardBonusSummary(memberCode)]).then(() => {
        if (this.AwardBonusSummary != null) {
          this.awardBonusModel.summary = this.AwardBonusSummary;
        }
      });
    },
    changeMonth(yearMonth) {
      this.filter.yearMonth = yearMonth;
      this.filter.filterItems = {
        sortType: '',
        memberStatus: '',
        depositStatus: '',
        registrationDateExpress: '',
        registrationDate: [],
        memberCurrency: '',
        memberCountry: '',
      };
      this.resetInfiniteLoading();
    },
    resetInfiniteLoading() {
      this.filter.page = 1;
      this.ReferralsModel.ReferralList = [];
      this.$refs.InfiniteLoading.stateChanger.reset();
    },
    goToFullTable() {
      const route = this.$router.resolve({
        name: 'referralsFullView',
        params: {},
      });
      window.open(route.href, '_blank');
    },
    viewMemberDetail(memberCode) {
      this.page = 'detail';
      this.detailYearMonth = this.filter.yearMonth;
      this.detailMember = this.ReferralsModel.ReferralList.find(
        (e) => e.MemberCode == memberCode
      );
      this.getTransactionHistory(memberCode);
    },
    gotoGPRChildDetail(childProductCode) {
      this.GPRinfo.parentProductName = this.GPRProduct.DisplayName;
      this.GPRProduct = this.GPRProduct.ChildProductList.find(
        (e) => e.ProductCode == childProductCode
      );
    },
    formatNumber(number) {
      return formatNumber(number);
    },
    downloadFile() {
      const filter = this.prepareFilter();
      this.exportReferrals(filter);
    },
    prepareFilter() {
      var regDateFrom;
      var regDateTo;

      if (this.filter.filterItems.registrationDate.length > 0) {
        regDateFrom = this.filter.filterItems.registrationDate[0];
        regDateTo = this.filter.filterItems.registrationDate[1];
      }

      const filter = {
        YearMonth: this.filter.yearMonth,
        SortType:
          this.filter.filterItems.sortType == ''
            ? -1
            : this.filter.filterItems.sortType == 'AtoZ'
            ? 1
            : 2,
        MemberStatus:
          this.filter.filterItems.memberStatus == ''
            ? -1
            : this.filter.filterItems.memberStatus == 'Interest'
            ? 0
            : 1,
        DepositStatus:
          this.filter.filterItems.depositStatus == ''
            ? -1
            : this.filter.filterItems.depositStatus == 'Non-deposited'
            ? 0
            : 1,
        RegisterDateFrom: regDateFrom,
        RegisterDateTo: regDateTo,
        RegistrationDateExpress: this.filter.filterItems
          .registrationDateExpress,
        MemberCountry:
          this.filter.filterItems.memberCountry == ''
            ? 'ALL'
            : this.filter.filterItems.memberCountry,
        MemberCurrency:
          this.filter.filterItems.memberCurrency == ''
            ? 'ALL'
            : this.filter.filterItems.memberCurrency,
        Page: this.filter.page,
        PageSize: 20,
      };
      return filter;
    },
    setSearchFilter(selectedItem) {
      //this.changeMonth(this.Last3MonthsArray[2].date);
      this.viewMemberDetailFromSearch(selectedItem);
    },
    viewMemberDetailFromSearch(memberCode) {
      this.page = 'detail';
      this.detailYearMonth = this.Last3MonthsArray[2].date;
      this.detailMember = this.searchReferralsModel.ReferralList.find(
        (e) => e.MemberCode == memberCode
      );
      this.getTransactionHistory(memberCode);
    },
    getSearchList(input) {
      const filter = {
        MemberCodeFuzzy: input,
        YearMonth: this.Last3MonthsArray[2].date,
        SortType: 1,
        MemberStatus: -1,
        DepositStatus: -1,
        RegisterDateFrom: null,
        RegisterDateTo: null,
        MemberCountry: 'ALL',
        MemberCurrency: 'ALL',
        Page: 1,
        PageSize: -1,
      };
      Promise.all([this.fetchReferrals(filter)]).then(() => {
        if (this.Referrals.data != null) {
          this.searchReferralsModel.ReferralList = this.Referrals.data.ReferralList;
          this.searchMemberList = this.Referrals.data.ReferralList.map(
            (item) => item.MemberCode
          );
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/06_overlaps/_v-tabs.scss';
</style>
