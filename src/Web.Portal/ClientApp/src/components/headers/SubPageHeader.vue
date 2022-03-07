<template>
  <div>
    <VAppBar flat :fixed="$vuetify.breakpoint.mdAndDown">
      <div class="flex-grow-1">
        <h1
          class="d-flex align-center text-lg  px-md-0"
          :class="headingSubTitle.length > 0 ? 'px-4 py-2' : 'pa-4'"
        >
          <slot name="left-buttons">
            <VBtn
              class="d-block mr-4 ml-0"
              :class="{ 'd-md-none': haveFeature('responsiveBackButton') }"
              icon
              small
              @click="goBack()"
            >
              <span class="betfont icon-stick-arrow-left text-lg"></span>
            </VBtn>
          </slot>

          <slot name="title">
            <VSpacer>
              <div
                :class="
                  headingSubTitle.length > 0
                    ? 'text-xxs'
                    : haveFeature('largeHeadline')
                    ? 'text-xl'
                    : 'text-md'
                "
              >
                {{ headingTitle }}
              </div>
              <div>{{ headingSubTitle }}</div>
            </VSpacer>
          </slot>
          <slot name="right-buttons">
            <VBtn
              icon
              small
              class="mx-1 d-none d-md-block"
              v-if="haveFeature('haveSearch')"
              @click.stop="showSearch"
            >
              <span class="betfont icon-search text-lg "></span>
            </VBtn>
            <VBtn
              icon
              v-if="haveFeature('haveFilter')"
              @click.stop="showFilter"
              small
              class="d-block d-lg-none"
              ><span class="betfont icon-settings text-lg"></span>
            </VBtn>
            <VBtn
              icon
              small
              class="mx-1"
              v-show="$vuetify.breakpoint.mdAndUp"
              v-if="haveFeature('haveDownload')"
              @click="downloadfile(pageName)"
            >
              <span class="betfont icon-download text-lg"></span>
            </VBtn>
            <VBtn
              icon
              small
              class="mx-1"
              @click.stop="goToFullTable"
              v-show="$vuetify.breakpoint.mdAndUp"
              v-if="haveFeature('haveFullTable')"
            >
              <span class="betfont icon-focus text-lg"></span>
            </VBtn>
            <VMenu
              offset-y="true"
              v-if="
                $vuetify.breakpoint.smAndDown &&
                  (haveFeature('haveDownload') || haveFeature('haveFullTable'))
              "
            >
              <template v-slot:activator="{ on, attrs }">
                <VBtn icon small v-bind="attrs" v-on="on">
                  <span class="betfont icon-more text-lg"></span>
                </VBtn>
              </template>
              <VList>
                <template v-if="haveFeature('haveDownload')">
                  <VListItem @click="downloadfile(pageName)">
                    <VListItemTitle>Download</VListItemTitle>
                  </VListItem>
                  <VDivider></VDivider>
                </template>
                <template v-if="haveFeature('haveFullTable')">
                  <VListItem @click.stop="goToFullTable">
                    <VListItemTitle>View full Table</VListItemTitle>
                  </VListItem>
                </template>
              </VList>
            </VMenu>
          </slot>
          <div>
            <slot name="other-buttons"></slot>
          </div>
        </h1>
        <VDivider v-if="!haveFeature('noBorder')"></VDivider>
      </div>
    </VAppBar>
    <VAppBar class="mt-n4 d-block d-md-none mb-4" flat></VAppBar>
    <VBtn
      color="primary"
      class="mx-1 d-block d-lg-none"
      v-if="haveFeature('haveSearch')"
      @click.stop="showSearch"
      fab
      fixed
      bottom
      right
    >
      <span class="betfont icon-search text-lg "></span>
    </VBtn>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  data: () => ({}),
  props: {
    headingTitle: { default: '' },
    headingSubTitle: { default: '' },
    features: {
      default: [],
    },
    pageName: { default: '' },
    MonthlyCommissionFilter: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {},
  methods: {
    ...mapActions('Report', [
      'ExportCommissionPayout',
      'ExportMonthlyCommissionsAll',
      'ExportMonthlyCommissionsDetail',
    ]),
    goBack() {
      this.$emit('goBack');
    },
    showFilter() {
      this.$emit('showFilter');
    },
    haveFeature(featureCheck) {
      return this.features.indexOf(featureCheck) > -1 ? true : false;
    },
    goToFullTable() {
      this.$emit('goToFullTable');
    },
    showSearch() {
      this.$emit('showSearch');
    },
    downloadfile(pageName) {
      switch (pageName) {
        case 'Commission Payout':
          this.ExportCommissionPayout();
          break;
        case 'Monthly Commissions All':
          this.ExportMonthlyCommissionsAll(this.MonthlyCommissionFilter);
          break;
        case 'Monthly Commissions Detail':
          this.ExportMonthlyCommissionsDetail(this.MonthlyCommissionFilter);
          break;
      }
      this.$emit('downloadFile');
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_subpage-header';
</style>
