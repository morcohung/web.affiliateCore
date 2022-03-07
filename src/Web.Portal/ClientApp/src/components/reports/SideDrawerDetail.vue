<template>
  <div class="side-drawer-detail">
    <VOverlay v-if="showMoreDetails">
      <div></div>
    </VOverlay>
    <VDialog
      fullscreen
      :content-class="
        $vuetify.breakpoint.mdAndUp ? 'desktop-drawer' : 'mobile-drawer'
      "
      v-model="showMoreDetails"
      transition="slide-x-reverse-transition"
      @click:outside="moreDetails(false)"
      persistent
    >
      <VSheet :color="color">
        <VAppBar height="auto" flat absolute color="white">
          <VBtn icon class="ml-n3" @click.stop="moreDetails(false)">
            <span class="betfont icon-stick-arrow-left"></span>
          </VBtn>
          <VSpacer class="font-weight-bold">
            <h2
              :class="
                headingSubTitle.length > 0
                  ? 'text-xxs text--secondary'
                  : 'text-md'
              "
            >
              {{ headingTitle }}
            </h2>
            <h3>{{ headingSubTitle }}</h3>
          </VSpacer>
        </VAppBar>
        <div class="v-app-bar"></div>
        <VDivider></VDivider>
        <slot name="sideDrawerContent"></slot>
      </VSheet>
    </VDialog>
  </div>
</template>
<script>
//You can use VLazy to lazy load the data
export default {
  data: () => ({}),
  props: {
    showMoreDetails: { default: false },
    headingTitle: { default: '' },
    headingSubTitle: { type: String, default: '' },
    color: { default: '#fbfbfb' },
  },
  methods: {
    moreDetails() {
      this.$emit('moreDetails', false);
    },
  },
};
</script>
<style lang="scss" scoped>
@include icon(icon-stick-arrow-left);
@import '../../assets/scss/03_organisms/_side-drawer-dialog';
</style>
