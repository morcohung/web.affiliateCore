<template>
  <div class="full-table">
    <TheHeader>
      <template v-if="fullTableView">
        <div>
          <div class="text-xs mb-1">{{ $t(`referrals`) }}</div>
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
      @closeSearch="closeSearch()"
      @setSearchFilter="setSearchFilter"
      @getSearchList="getSearchList"
      :searchSuggestions="searchMemberList"
    ></SearchDrawer>
    <template v-if="page == 'master'">
      <FilterReferrals
        v-model="filter.filterItems"
        :isFilterVisible="isFilterVisible"
        :items="[]"
        :allCountries="filter.AllCountriesModel"
        :allCurrencies="filter.AllCurrenciesModel"
        @closeFilters="closeFilters"
        @showFilter="showFilter"
        @applyFilters="getReferralsdata"
      ></FilterReferrals>
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
        <template v-slot:item.RegistrationDate="{ item }">
          <span v-html="item.RegistrationDate"></span>
        </template>
        <template v-slot:item.LastDepositDate="{ item }">
          <span v-html="item.LastDepositDate"></span>
        </template>
        <template v-slot:item.MemberStatus="{ item }">
          <span>{{ ConvertMemberStatusLocalization(item.MemberStatus) }}</span>
        </template>
        <template v-slot:item.Action="{ item }">
          <VCol class="d-none d-lg-flex justify-center" :lg="2">
            <div>
              <VBtn
                v-if="displayAwardBonus(item.MemberStatus)"
                :disabled="!displayAwardBonus(item.MemberStatus)"
                @click.stop="
                  moreDetails({
                    isShow: true,
                    subpage: 'award',
                    memberCode: item.MemberCode,
                  })
                "
                icon
                ><span
                  class="betfont icon-award"
                  :class="
                    displayAwardBonus(item.MemberStatus)
                      ? 'color-blue'
                      : 'color-gray'
                  "
                ></span
              ></VBtn>
              <VBtn
                @click.stop="
                  moreDetails({
                    isShow: true,
                    subpage: 'history',
                    memberCode: item.MemberCode,
                  })
                "
                icon
                ><span class="betfont icon-history" :class="'color-blue'"></span
              ></VBtn>
              <VBtn
                v-if="displayAwardBonus(item.MemberStatus)"
                :disabled="!displayAwardBonus(item.MemberStatus)"
                @click.stop="
                  moreDetails({
                    isShow: true,
                    subpage: 'summary',
                    memberCode: item.MemberCode,
                  })
                "
                icon
                ><span
                  class="betfont icon-document"
                  :class="
                    displayAwardBonus(item.MemberStatus)
                      ? 'color-blue'
                      : 'color-gray'
                  "
                ></span
              ></VBtn>
            </div>
          </VCol>
        </template>
      </VDataTable>
    </template>

    <template v-if="page == 'detail'">
      <ReferralsMemberDetail
        @goBack="goBack"
        @moreDetails="moreDetails"
        :member="detailMember"
        :yearMonth="detailYearMonth"
        :TransactionHistoryModel="TransactionHistoryModel"
      />
    </template>

    <SideDrawerDetail
      :headingSubTitle="headingSubTitle"
      :headingTitle="headingTitle"
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
  </div>
</template>
<script>
// This component must use the header with <TheHeader :fullTableView="fullTableView" />
// fullTableView must be set to true
import SearchDrawer from '@/components/search/SearchDrawer.vue';
import { mapGetters, mapState, mapActions } from 'vuex';
import TheHeader from '@/components/common/TheHeader.vue';
import SideDrawerDetail from '@/components/reports/SideDrawerDetail.vue';
import ReferralsMemberDetail from '@/components/reports/ReferralsMemberDetail';
import ReferralsBonusSummary from '@/components/reports/ReferralsBonusSummary';
import ReferralsAwardBonus from '@/components/reports/ReferralsAwardBonus';
import ReferralsTransactionHistory from '@/components/reports/ReferralsTransactionHistory';
import ReferralsGPRDetail from '@/components/reports/ReferralsGPRDetail';
import FilterReferrals from '@/components/utilities/FilterReferrals';
import { integer } from 'vee-validate/dist/rules';
import moment from 'moment';
import { formatNumber } from '@/utils/numberFormat';
export default {
  data() {
    var self = this;
    return {
      page: 'master',

      isSearchVisible: false,
      isFilterVisible: false,
      searchMemberList: [],
      searchReferralsModel: {
        ReferralList: [],
      },

      fullTableView: true,
      showMoreDetails: false,
      headers: [
        {
          text: this.$t(`member.code`),
          align: 'start',
          value: 'MemberCode',
        },
        { text: this.$t(`member.status`), value: 'MemberStatus' },
        {
          text: this.$t(`registration.date`),
          value: 'RegistrationDate',
          sort: self.sortDate,
        },
        { text: this.$t(`website`), sortable: false, value: 'Website' },
        { text: this.$t(`country`), value: 'Country' },
        { text: this.$t(`currency`), value: 'Currency' },
        {
          text: this.$t(`colLastDepositDate`),
          value: 'LastDepositDate',
          sortable: false,
        },
        {
          text: this.$t(`colLastDepositIP`),
          sortable: false,
          value: 'LastDepositIP',
        },
        {
          text: this.$t(`referral.listing.action`),
          sortable: false,
          value: 'Action',
        },
      ],
      dataTable: [
        // {
        //   MemberCode: '001',
        //   MemberStatus: 'Completed',
        //   RegistrationDate:
        //     '23/07/2020' + '<div class="text-xs text--secondary">13:45</div>',
        //   Website: 'http://youtube.com/username/gogogo',
        //   Country: 'China',
        //   Currency: 'RMB',
        //   LastDepositDate:
        //     '23/07/2020' + '<div class="text-xs text--secondary">13:45</div>',
        //   LastDepositIP: '123.456.789.1',
        // },
        // {
        //   MemberCode: '002',
        //   MemberStatus: 'Completed',
        //   RegistrationDate:
        //     '23/07/2020' + '<div class="text-xs text--secondary">13:55</div>',
        //   Website: 'http://youtube.com/username/gogogo',
        //   Country: 'China',
        //   Currency: 'RMB',
        //   LastDepositDate:
        //     '23/07/2020' + '<div class="text-xs text--secondary">13:55</div>',
        //   LastDepositIP: '123.456.789.1',
        // },
      ],
      headingTitle: 'Referrals',
      headingSubTitle: '',
      subpage: '',
      showMoreDetails: false,
      Last3MonthsArray: [],
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
        ReferralList: [],
        EnableAwardBonus: false,
      },
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
    };
  },
  components: {
    TheHeader,
    SideDrawerDetail,
    ReferralsTransactionHistory,
    ReferralsAwardBonus,
    ReferralsBonusSummary,
    SearchDrawer,
    ReferralsMemberDetail,
    ReferralsGPRDetail,
    FilterReferrals,
  },
  created: function() {
    this.getAllCountries();
    this.getAllCurrencies();
    this.getLast3Months();
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
    goBack() {
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
          this.headingTitle = this.$t(`colTransactionHistory`);
          break;
        case 'award':
          this.headingTitle = this.$t(`referral.listing.award.bonus`);
          this.getAwardBonusBalance(payload.memberCode);
          break;
        case 'summary':
          this.headingTitle = this.$t(`referral.listing.bonus.summary`);
          this.getAwardBonusSummary(payload.memberCode);
          break;
        case 'year':
          break;
        case 'gpr':
          this.GPRProduct = payload.data;
          this.headingTitle = this.$t(`gross.product.revenue`);
          this.GPRinfo = {
            yearMonth: payload.yearMonth,
            settlementType: payload.settlementType,
            memberCode: payload.memberCode,
            parentProductName: '',
          };
          break;
        default:
          break;
      }
      this.showMoreDetails = payload;
      this.headingSubTitle = payload.memberCode;
      this.haveFilter = true;
      this.subpage = payload.subpage;
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
    getReferralsdata() {
      const filter = this.prepareFilter();
      var self = this;
      Promise.all([this.fetchReferrals(filter)]).then(() => {
        if (this.Referrals.data != null) {
          this.ReferralsModel.ReferralList = this.Referrals.data.ReferralList;
          this.ReferralsModel.EnableAwardBonus = this.Referrals.data.EnableAwardBonus;
          this.dataTable = this.Referrals.data.ReferralList.map(function(
            value,
            index,
            array
          ) {
            return {
              MemberCode: value.MemberCode,
              MemberStatus: value.MemberStatus,
              RegistrationDate:
                moment(value.RegistrationDate, 'DD/MM/yyyy HH:mm').format(
                  'DD/MM/yyyy'
                ) +
                '<div class="text-xs text--secondary">' +
                moment(value.RegistrationDate, 'DD/MM/yyyy HH:mm').format(
                  'HH:mm'
                ) +
                '</div>',
              Website: value.Website,
              Country: value.Country,
              Currency: value.Currency,
              LastDepositDate:
                value.LastDepositDate == ''
                  ? ''
                  : moment(value.LastDepositDate, 'DD/MM/yyyy HH:mm').format(
                      'DD/MM/yyyy'
                    ) +
                    '<div class="text-xs text--secondary">' +
                    moment(value.LastDepositDate, 'DD/MM/yyyy HH:mm').format(
                      'HH:mm'
                    ) +
                    '</div>',
              LastDepositIP: value.LastDepositIP,
            };
          });
        }
      });
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
        this.getReferralsdata();
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
      this.awardBonusModel.loading = true;
      Promise.all([this.postAwardBonusSubmission(submission)]).then(() => {
        if (this.AwardBonusSubmissionResult != null) {
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
      this.showMoreDetails = false;
      this.getReferralsdata();
    },
    showCurrentMonth() {
      return moment(this.filter.yearMonth, 'yyyy-MM-DD').format('MMM yyyy');
    },
    sortDate(a, b) {
      var aa = a
        .replace('<div class="text-xs text--secondary">', ' ')
        .replace('</div>', '');
      var bb = b
        .replace('<div class="text-xs text--secondary">', ' ')
        .replace('</div>', '');
      var dateA = moment(aa, 'DD/MM/yyyy HH:mm').toDate();
      var dateB = moment(bb, 'DD/MM/yyyy HH:mm').toDate();
      if (dateA.valueOf() == dateB.valueOf()) {
        return 0;
      } else if (dateA.valueOf() < dateB.valueOf()) {
        return -1;
      } else {
        return 1;
      }
    },
    formatNumber(number) {
      return formatNumber(number);
    },
    downloadFile() {
      const filter = {
        YearMonth: this.filter.yearMonth,
        SortType: -1,
        MemberStatus: -1,
        DepositStatus: -1,
        RegisterDateFrom: null,
        RegisterDateTo: null,
        MemberCountry: 'ALL',
        MemberCurrency: 'ALL',
        Page: 1,
        PageSize: -1,
      };
      this.exportReferrals(filter);
    },
    setSearchFilter(selectedItem) {
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
      console.log(filter);
      Promise.all([this.fetchReferrals(filter)]).then(() => {
        if (this.Referrals.data != null) {
          this.searchReferralsModel.ReferralList = this.Referrals.data.ReferralList;
          this.searchMemberList = this.Referrals.data.ReferralList.map(
            (item) => item.MemberCode
          );
        }
      });
    },
    showSearch() {
      this.isSearchVisible = true;
      this.searchMemberList = [];
    },
    closeSearch() {
      this.isSearchVisible = false;
    },
    showFilter() {
      this.isFilterVisible = true;
    },
    closeFilters() {
      this.isFilterVisible = false;
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
        PageSize: -1,
      };
      return filter;
    },
    displayAwardBonus(memberStatus) {
      return this.ReferralsModel.EnableAwardBonus && memberStatus != 'Interest';
    },
    ConvertMemberStatusLocalization(status) {
      if (status == 'Completed') {
        return this.$t(`fo.member.status.completed`);
      } else {
        return this.$t(`fo.member.status.interest`);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../assets/scss/05_pages/_full-table-view';
@include icon(('icon-award', 'icon-history', 'icon-document'));
.color-blue {
  color: $blue-link;
}
</style>
