<template>
  <div class="select-menu">
    <VOverlay v-if="onOpenSelect">
      <div @click.stop="closeSelect"></div>
    </VOverlay>
    <VNavigationDrawer
      v-model="onOpenSelect"
      class="select-menu-list"
      width="100%"
      fixed
      right
      hide-overlay
    >
      <VAppBar height="auto" flat fixed v-if="selectType != 'menulang'">
        <VBtn icon class="ml-n3" @click.stop="closeSelect">
          <span class="betfont icon-stick-arrow-left"></span>
        </VBtn>
        <VSpacer><h2 class="text-md">{{$t(`select`)}}</h2></VSpacer>
      </VAppBar>
      <div class="v-app-bar"></div>
      <VList class="pt-0">
        <VListItemGroup>
          <div v-for="options in optionsPayload" :key="options.key">
            <VListItem @click.stop="closeSelect(options)">
              <VAvatar v-if="selectType === 'menulang'" size="3rem" class="mr-2">
                <span class="betfont " :class="options.icon"></span>
              </VAvatar>               
              <VListItemTitle>{{ options.text }}</VListItemTitle>
            </VListItem>
            <VDivider></VDivider>
          </div>
        </VListItemGroup>
      </VList>
    </VNavigationDrawer>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  props: {
    onOpenSelect: { default: false },
    optionsPayload: { required: true, default: [] },
    selectType: { default: false },
  },
  methods: {
    closeSelect(options) {
      this.$emit('onCloseSelect', options.key, this.selectType);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_select-menu';
</style>
