<template>
  <div>
    <VCard
      class="pb-lg-3"
      :class="
        $vuetify.breakpoint.mdAndDown ? 'rounded-0' : 'rounded-lg rounded-b-0'
      "
      :outlined="$vuetify.breakpoint.lgAndUp"
    >
      <SubPageHeader
        class="member-detail-subheader"
        @goBack="goBack"
        :headingTitle="member.MemberCode"
        :features="features"
      >
        <template slot="left-buttons">
          <VBtn class="d-block mr-4 ml-4" icon small @click="goBack()">
            <span class="betfont icon-stick-arrow-left text-lg"></span>
          </VBtn>
        </template>
        <template slot="other-buttons">
          <div class="mr-4">
            <VBtn
              v-if="displayAwardBonus"
              :disabled="!displayAwardBonus"
              :icon="$vuetify.breakpoint.lgAndDown"
              :outlined="$vuetify.breakpoint.xlOnly"
              :small="$vuetify.breakpoint.lgAndDown"
              class="faint-outline mr-2 ml-4"
              @click.stop="moreDetails({ isShow: true, subpage: 'award' })"
            >
              <span class="betfont icon-award"> </span>
              <span class="d-none d-lg-inline-block ml-4">{{
                $t(`referral.listing.award.bonus`)
              }}</span>
            </VBtn>
            <VBtn
              v-if="displayAwardBonus"
              :disabled="!displayAwardBonus"
              :icon="$vuetify.breakpoint.lgAndDown"
              :outlined="$vuetify.breakpoint.xlOnly"
              :small="$vuetify.breakpoint.lgAndDown"
              class="faint-outline"
              @click.stop="moreDetails({ isShow: true, subpage: 'summary' })"
            >
              <span class="betfont icon-document"> </span>
              <span class="d-none d-lg-inline-block ml-4">{{
                $t(`referral.listing.bonus.summary`)
              }}</span>
            </VBtn>
          </div>
        </template>
      </SubPageHeader>
      <VSheet>
        <VCardText :class="{ 'px-0': $vuetify.breakpoint.smAndDown }">
          <VRow :class="{ 'mx-0': $vuetify.breakpoint.smAndDown }">
            <VCol cols="12" sm="6" class="px-0 px-sm-3 py-0 py-sm-3">
              <VCard
                flat
                class="rounded-lg"
                :class="{
                  'fill-height align-center d-flex':
                    $vuetify.breakpoint.mdAndUp,
                }"
                :color="
                  $vuetify.breakpoint.smAndDown ? 'transparent' : '#f3f3f3'
                "
              >
                <VCardText class="px-0 px-sm-4 py-0 py-sm-3">
                  <VRow :class="{ 'mx-0 pb-3': $vuetify.breakpoint.smAndDown }">
                    <VCol
                      cols="6"
                      sm="12"
                      class="pb-md-0 px-7 px-sm-8"
                      :class="
                        $vuetify.breakpoint.smAndDown ? 'text-xs' : 'text-sm'
                      "
                    >
                      {{ $t(`member.status`) }}
                    </VCol>
                    <VCol
                      cols="6"
                      sm="12"
                      class="text--primary pt-md-0 text-right text-sm-left px-7 px-sm-8"
                      :class="{
                        'text-md font-weight-bold': $vuetify.breakpoint.mdAndUp,
                      }"
                    >
                      {{ ConvertMemberStatusLocalization(member.MemberStatus) }}
                    </VCol>
                  </VRow>
                  <VDivider class="d-block d-sm-none "></VDivider>
                  <VRow :class="{ 'mx-0 pt-3': $vuetify.breakpoint.smAndDown }">
                    <VCol
                      cols="6"
                      sm="12"
                      class="pb-md-0 px-7 px-sm-8"
                      :class="
                        $vuetify.breakpoint.smAndDown ? 'text-xs' : 'text-sm'
                      "
                    >
                      {{ $t(`total.gross.revenue`) }}
                    </VCol>
                    <VCol
                      cols="6"
                      sm="12"
                      class="pt-md-0 text-right text-sm-left px-7 px-sm-8"
                      :class="{
                        'text-md font-weight-bold text--primary':
                          $vuetify.breakpoint.mdAndUp,
                      }"
                    >
                      <span class="text--secondary">{{ member.Currency }}</span>
                      <span class="text--primary">
                        {{ formatNumber(member.TotalGrossRevenue) }}
                      </span>
                    </VCol>
                  </VRow>
                </VCardText>
              </VCard>
            </VCol>
            <VCol cols="12" sm="6" class="px-0 px-sm-3 pb-0 pb-sm-3">
              <VDivider class="d-block d-sm-none"></VDivider>
              <VList
                class="py-0 "
                :class="{ 'v-list-item--dense': $vuetify.breakpoint.mdAndUp }"
              >
                <VListItem class="text-xs px-7">
                  <span class="text--secondary">{{
                    $t(`colLastDepositDate`)
                  }}</span>
                  <VSpacer class="text-right">{{
                    member.LastDepositDate
                  }}</VSpacer>
                </VListItem>
                <VDivider></VDivider>
                <VListItem class="text-xs px-7">
                  <span class="text--secondary">{{
                    $t(`colLastDepositIP`)
                  }}</span>
                  <VSpacer class="text-right">{{
                    member.LastDepositIp
                  }}</VSpacer>
                </VListItem>
                <VDivider></VDivider>
                <VListItem class="text-xs px-7">
                  <span class="text--secondary"
                    >{{ $t(`country`) }} - {{ $t(`currency`) }}</span
                  >
                  <VSpacer class="text-right"
                    >{{ member.Country }} - {{ member.Currency }}</VSpacer
                  >
                </VListItem>
                <VDivider></VDivider>
                <VListItem class="text-xs px-7">
                  <span class="text--secondary">{{
                    $t(`registration.date`)
                  }}</span>
                  <VSpacer class="text-right ">2/4/2019</VSpacer>
                </VListItem>
                <VDivider class="d-none d-sm-block"></VDivider>
              </VList>
            </VCol>
          </VRow>
        </VCardText>
      </VSheet>
    </VCard>
    <VDivider v-if="$vuetify.breakpoint.mdAndDown"></VDivider>
    <VCard
      flat
      class="mt-3 mt-lg-n1 py-8 rounded-t-0 rounded-b-lg"
      outlined
      :color="$vuetify.breakpoint.smAndDown ? '#f3f3f3' : ''"
    >
      <VRow class="mx-sm-1">
        <VCol cols="12" sm="6">
          <VCard class="rounded-lg fill-height" outlined>
            <VCardTitle class="ml-2">
              <VSpacer class="font-weight-bold">{{
                $t(`colTransactionHistory`)
              }}</VSpacer>
              <VBtn
                :icon="$vuetify.breakpoint.mdAndDown"
                :text="$vuetify.breakpoint.lgAndUp"
                :color="$vuetify.breakpoint.lgAndUp ? 'blue' : ''"
                class="my-n1"
                @click.stop="moreDetails({ isShow: true, subpage: 'history' })"
              >
                <span
                  v-if="$vuetify.breakpoint.mdAndDown"
                  class="betfont icon-stick-arrow-right"
                ></span>
                <span v-if="$vuetify.breakpoint.lgAndUp">{{
                  $t(`view.all`)
                }}</span>
              </VBtn>
            </VCardTitle>
            <VDivider></VDivider>
            <template v-for="(history, index) in getFirst7TransactionHistory()">
              <VDivider v-if="index > 0"></VDivider>
              <VList class="py-0 ">
                <VListItem class=" px-7">
                  <h4 class="text-md">
                    <span class="text--secondary">{{ history.Currency }}</span>
                    <span class="text--primary">
                      {{ formatNumber(history.Amount) }}
                    </span>
                  </h4>

                  <VSpacer class="text-right text-xs text--secondary">{{
                    history.TransactionDate
                  }}</VSpacer>
                </VListItem>
              </VList>
            </template>
          </VCard>
        </VCol>
        <VCol cols="12" sm="6">
          <VTabs
            v-if="GPRProductSummaryModel.ProductSummaryList.length > 1"
            background-color="transparent"
            color="#ff9200"
            v-model="settlementTab"
          >
            <VTab
              v-for="(settlement,
              $index) in GPRProductSummaryModel.ProductSummaryList"
              :key="$index"
              >{{
                CovertSettlementTypeToString(settlement.SettlementType)
              }}</VTab
            >
          </VTabs>
          <VTabsItems v-model="settlementTab">
            <VTabItem
              v-for="(ProductSummary,
              $index) in GPRProductSummaryModel.ProductSummaryList"
              :key="$index"
            >
              <VCard class="rounded-lg fill-height" outlined>
                <VCardTitle class="ml-2">
                  <VSpacer class="font-weight-bold">{{
                    $t(`gross.product.revenue`)
                  }}</VSpacer>
                </VCardTitle>
                <VDivider></VDivider>
                <VList class="py-0 ">
                  <template
                    v-for="(product, index) in ProductSummary.ProductList"
                  >
                    <VListItem
                      class=" px-7"
                      :selectable="true"
                      @click.stop="
                        moreDetails({
                          isShow: true,
                          subpage: 'gpr',
                          settlementType: ProductSummary.SettlementType,
                          productCode: product.ProductCode,
                          yearMonth: yearMonth,
                        })
                      "
                      :key="index"
                    >
                      {{ product.DisplayName }}

                      <VSpacer class="text-right">
                        <h3 class="text-md">
                          <span class="text--secondary">{{
                            product.Currency
                          }}</span>
                          <span class="text--primary">
                            {{ formatNumber(product.GrossRevenue) }}
                          </span>
                        </h3>
                        <h4 class="text-xs text--disabled">
                          {{ $t(`stake`) }}: <span>{{ product.Currency }}</span>
                          <span>
                            {{ formatNumber(product.Stake) }}
                          </span>
                        </h4>
                      </VSpacer>
                    </VListItem>
                    <VDivider></VDivider>
                  </template>
                </VList>
              </VCard>
            </VTabItem>
          </VTabsItems>
        </VCol>
      </VRow>
    </VCard>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import SubPageHeader from '@/components/headers/SubPageHeader';
import { formatNumber } from '@/utils/numberFormat';
export default {
  data: () => ({
    headingTitle: 'user-cn-1234567',
    features: ['largeHeadline', 'noBorder'],
    GPRProductSummaryModel: {
      ProductSummaryList: [],
    },
    settlementTab: 0,
  }),
  props: {
    member: {
      type: Object,
      default: () => {},
    },
    TransactionHistoryModel: {
      type: Object,
      default: () => {},
    },
    yearMonth: '',
    enableAwardBonus: false,
  },
  watch: {
    member: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.getGPRProductSummary();
      },
    },
  },
  components: { SubPageHeader },
  computed: {
    ...mapState('Report', ['GPRProductSummary']),
    displayAwardBonus: function() {
      return this.enableAwardBonus && this.member.MemberStatus != 'Interest';
    },
  },
  methods: {
    ...mapActions('Report', ['fetchGPRProductSummary']),

    goBack() {
      this.$emit('goBack', 'referrals');
    },
    moreDetails(payload) {
      switch (payload.subpage) {
        case 'history':
          break;
        case 'gpr':
          payload.data = this.GPRProductSummaryModel.ProductSummaryList.find(
            (p) => p.SettlementType == payload.settlementType
          ).ProductList.find((p) => p.ProductCode == payload.productCode);
          break;
        case 'award':
          break;
        case 'summary':
          break;
        default:
          break;
      }
      payload.memberCode = this.member.MemberCode;
      this.$emit('moreDetails', payload);
    },
    getMemberDetail(member) {},

    getGPRProductSummary() {
      const filter = {
        YearMonth: this.yearMonth,
        MemberCode: this.member.MemberCode,
      };
      Promise.all([this.fetchGPRProductSummary(filter)]).then(() => {
        if (this.GPRProductSummary != null) {
          this.GPRProductSummaryModel = this.GPRProductSummary.data;
        }
      });
    },
    ConvertMemberStatusLocalization(status) {
      if (status == 'Completed') {
        return this.$t(`fo.member.status.completed`);
      } else {
        return this.$t(`fo.member.status.interest`);
      }
    },
    formatNumber(number) {
      return formatNumber(number);
    },
    getFirst7TransactionHistory() {
      return this.TransactionHistoryModel.HistoryList.slice(0, 7);
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
    showGPRDetail(productCode, settlementType) {},
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_referral-member-detail';
</style>
