<template>
  <div class="side-drawer-detail">
    <VOverlay v-if="showCollateralDetails">
      <div></div>
    </VOverlay>
    <VDialog
      v-model="showCollateralDetails"
      fullscreen
      :content-class="
        $vuetify.breakpoint.mdAndUp ? 'desktop-drawer' : 'mobile-drawer'
      "
      transition="slide-x-reverse-transition"
      @click:outside="showDetails()"
      persistent
      ><VSheet>
        <VAppBar height="auto" flat absolute>
          <VBtn icon class="ml-n3" @click.stop="showDetails()">
            <span class="betfont icon-stick-arrow-left"></span>
          </VBtn>
          <VSpacer class="font-weight-bold">
            <div :class="headingSubTitle.length > 0 ? 'text-xxs' : 'text-md'">
              {{ headingTitle }}
            </div>
            <div>{{ headingSubTitle }}</div>
          </VSpacer>
        </VAppBar>
        <div class="v-app-bar"></div>
        <VList>
          <VListItem class="text-xs">
            <div class="text--secondary">{{ $t(`creative.id`) }}</div>
            <VSpacer class="text--primary font-weight-bold text-right">{{
              detailItem.CreativeId
            }}</VSpacer>
          </VListItem>
          <VDivider></VDivider>
          <VListItem class="text-xs">
            <div class="text--secondary">{{ $t(`size`) }}</div>
            <VSpacer class="text--primary font-weight-bold text-right">{{
              detailItem.BannerSize
            }}</VSpacer>
          </VListItem>
          <VDivider></VDivider>
          <VListItem class="text-xs">
            <div class="text--secondary">{{ $t(`media.source`) }}</div>
            <VSpacer class="text--primary font-weight-bold text-right">{{
              detailItem.MediaSource
            }}</VSpacer>
          </VListItem>
          <VDivider></VDivider>
          <VListItem class="text-xs">
            <div class="text--secondary">{{ $t(`impressions`) }}</div>
            <VSpacer class="text--primary font-weight-bold text-right">
              {{ detailItem.ImpressionCount }}</VSpacer
            >
          </VListItem>
          <VDivider></VDivider>
          <VListItem class="text-xs">
            <div class="text--secondary">{{ $t(`clicks`) }}</div>
            <VSpacer class="text--primary font-weight-bold text-right">{{
              detailItem.ClickCount
            }}</VSpacer>
          </VListItem>
          <VDivider></VDivider>
          <VListItem class="text-xs">
            <div class="text--secondary">{{ $t(`signUps`) }}</div>
            <VSpacer class="text--primary font-weight-bold text-right">{{
              detailItem.NewSignUp
            }}</VSpacer>
          </VListItem>
          <VDivider></VDivider>
          <VListItem class="text-xs">
            <div class="text--secondary">{{ $t(`interest.members`) }}</div>
            <VSpacer class="text--primary font-weight-bold text-right">{{
              detailItem.InterestMemberCount
            }}</VSpacer>
          </VListItem>
          <VDivider></VDivider>
          <VListItem class="text-xs">
            <div class="text--secondary">{{ $t(`deposits`) }}</div>
            <VSpacer class="text--primary font-weight-bold text-right">{{
              detailItem.NewSignUpDeposit
            }}</VSpacer>
          </VListItem>
          <VDivider></VDivider>
        </VList>
      </VSheet>
    </VDialog>
  </div>
</template>
<script>
//You can use VLazy to lazy load the data
export default {
  data: () => ({}),
  props: {
    showCollateralDetails: { default: false },
    headingTitle: { default: '' },
    headingSubTitle: { type: String, default: '' },
    detailItem: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    showDetails() {
      this.$emit('showDetails', {}, false);
    },
  },
};
</script>
<style lang="scss" scoped>
@include icon(icon-stick-arrow-left);
@import '../../assets/scss/03_organisms/_side-drawer-dialog';
</style>
