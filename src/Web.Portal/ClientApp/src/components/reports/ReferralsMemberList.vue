<template>
  <div>
    <VCard
      class="rounded-lg mt-3"
      flat
      :color="$vuetify.breakpoint.mdAndDown ? 'transparent' : ''"
      :outlined="$vuetify.breakpoint.mdAndDown ? false : true"
    >
      <SearchDrawer
        :isSearchVisible="isSearchVisible"
        @closeSearch="closeSearch()"
        @setSearchFilter="setSearchFilter"
        @getSearchList="getSearchList"
        :searchSuggestions="searchMemberList"
      >
        <VList color="transparent">
          <template v-for="item in ReferralsModel.ReferralList">
            <VListItem
              :v-ripple="$vuetify.breakpoint.lgAndDown"
              @click.stop="
                $vuetify.breakpoint.lgAndDown
                  ? viewMemberDetail(item.MemberCode)
                  : undefined
              "
              :key="item.MemberCode"
            >
              <VListItemTitle class="member-list-item">
                <VRow class="align-center">
                  <VCol
                    cols="6"
                    sm="5"
                    :lg="displayAwardBonus(item.MemberStatus) ? 3 : 4"
                    class="py-4"
                    :class="filtered ? 'px-0' : 'px-7'"
                    :v-ripple="$vuetify.breakpoint.xlOnly"
                    @click.stop="viewMemberDetail(item.MemberCode)"
                  >
                    <h2 class="font-weight-medium text-md">
                      {{ item.MemberCode }}
                    </h2>
                  </VCol>
                  <VCol sm="3" class="d-none d-sm-flex py-4 px-2 ">
                    <div style="min-width:8.125rem">
                      <h3 class="font-weight-medium text-sm text-right">
                        <span class="text--secondary">{{ item.Currency }}</span>
                        <span class="text--primary">
                          {{ formatNumber(item.TotalGrossRevenue) }}
                        </span>
                      </h3>
                      <h4 class="font-weight-medium text-xxs text-right">
                        {{ $t(`total.gross.revenue`) }}
                      </h4>
                    </div>
                  </VCol>
                  <VDivider vertical class="my-4 d-none d-sm-block"></VDivider>
                  <VCol
                    sm="2"
                    class="d-none d-sm-flex justify-center py-4 px-7 "
                  >
                    <div>
                      <h3 class="font-weight-medium text-sm text-right">
                        {{ DisplayDepositOrRegisterDate(item) }}
                      </h3>
                      <h4 class="font-weight-medium text-xxs text-right">
                        {{ DisplayDepositOrRegisterTitle(item) }}
                      </h4>
                    </div>
                  </VCol>
                  <VDivider vertical class="my-4 d-none d-sm-block"></VDivider>
                  <VCol
                    cols="6"
                    sm="2"
                    class="py-4 px-7 "
                    :class="{
                      'd-flex justify-center': $vuetify.breakpoint.mdAndUp,
                    }"
                  >
                    <div>
                      <h3
                        class=" font-weight-medium  text-right"
                        :class="
                          $vuetify.breakpoint.smAndDown
                            ? 'text-uppercase text-xxxs'
                            : 'text-sm'
                        "
                      >
                        {{ ConvertMemberStatusLocalization(item.MemberStatus) }}
                      </h3>
                      <h4 class="font-weight-medium text-xxs text-right">
                        <span v-if="$vuetify.breakpoint.smAndDown">{{
                          DisplayDepositOrRegisterDate(item)
                        }}</span>
                        <span v-if="$vuetify.breakpoint.mdAndUp">{{
                          $t(`member.status`)
                        }}</span>
                      </h4>
                    </div>
                  </VCol>
                  <VDivider vertical class="my-4 d-none d-lg-block"></VDivider>
                  <VCol
                    class="d-none d-lg-flex justify-center"
                    :lg="displayAwardBonus(item.MemberStatus) ? 2 : 1"
                  >
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
                              : ''
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
                        ><span
                          class="betfont icon-history"
                          :class="'color-blue'"
                        ></span
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
                              : ''
                          "
                        ></span
                      ></VBtn>
                    </div>
                  </VCol>
                </VRow>
              </VListItemTitle>
            </VListItem>
            <VDivider class="d-block"></VDivider>
          </template>
        </VList>
      </SearchDrawer>
    </VCard>
  </div>
</template>

<script>
import SearchDrawer from '@/components/search/SearchDrawer.vue';
import { formatNumber } from '@/utils/numberFormat';
import moment from 'moment';
// You can use VLazy to load infinite list items
// I just ond't have time to implement it here
export default {
  data: () => ({
    filtered: false,
  }),
  props: {
    isSearchVisible: { default: false },
    ReferralsModel: {
      type: Object,
      default: () => {},
    },
    searchMemberList: { type: Array, default: () => [] },
  },
  components: { SearchDrawer },
  computed: {},
  created: function() {},
  methods: {
    viewMemberDetail(memberCode) {
      this.$emit('viewMemberDetail', memberCode);
    },
    moreDetails(payload) {
      this.$emit('moreDetails', payload);
    },
    showSearch() {
      this.$emit('showSearch');
    },
    closeSearch() {
      this.$emit('closeSearch');
    },
    formatNumber(number) {
      return formatNumber(number);
    },
    DisplayDepositOrRegisterDate(item) {
      if (item.LastDepositDate != '') {
        return moment(item.LastDepositDate, 'DD/MM/yyyy mm:ss').format(
          'DD/MM/yyyy'
        );
      } else {
        return moment(item.RegistrationDate, 'DD/MM/yyyy mm:ss').format(
          'DD/MM/yyyy'
        );
      }
    },
    DisplayDepositOrRegisterTitle(item) {
      if (item.LastDepositDate != '') {
        return this.$t(`colLastDepositDate`);
      } else {
        return this.$t(`registration.date`);
      }
    },
    ConvertMemberStatusLocalization(status) {
      if (status == 'Completed') {
        return this.$t(`fo.member.status.completed`);
      } else {
        return this.$t(`fo.member.status.interest`);
      }
    },
    setSearchFilter(selectedItem) {
      this.$emit('setSearchFilter', selectedItem);
    },
    getSearchList(input) {
      this.$emit('getSearchList', input);
    },
    displayAwardBonus(memberStatus) {
      return this.ReferralsModel.EnableAwardBonus && memberStatus != 'Interest';
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_referral-member-list';
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
