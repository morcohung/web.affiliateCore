<template>
  <div class="filters">
    <VCard
      :outlined="filterItems.length > 0"
      :color="filterItems.length > 0 ? '#f6f6f6' : 'transparent'"
      class="filter-box rounded-lg p mb-4 elevation-0 d-flex"
      :class="{
        'with-result': filterItems.length > 0,
        mobile: $vuetify.breakpoint.mdAndDown,
        'expanded-filter': expandFilter,
      }"
    >
      <VCardText class="d-flex pa-0">
        <VSpacer :class="{ 'py-2 pl-2': $vuetify.breakpoint.lgAndUp }">
          <VChip
            v-for="(filterItem, $index) in filterItems"
            :key="$index"
            class="ma-2"
            close
            outlined
            @click:close="removeItems(filterItem)"
          >
            {{ filterItem }}
          </VChip>
          <div class="px-2 pb-2 text-right mr-n14 d-block d-md-none">
            <VBtn v-if="filterItems.length > 0" text class="mt-2 color-blue">
              Clear All
            </VBtn>
          </div>
        </VSpacer>
        <div
          :cols="filterItems.length > 0 ? '4' : '12'"
          class="text-center pa-5 d-none d-md-block"
        >
          <VBtn outlined @click.stop="showFilter()">
            <span class="betfont icon-settings mr-4"></span><span>Filter</span>
          </VBtn>
          <br />
          <VBtn
            v-if="filterItems.length > 0"
            text
            class="mt-2 color-blue"
            @click="clearFilter()"
          >
            Clear All
          </VBtn>
        </div>
        <div
          v-if="filterItems.length > 0"
          class="text-center pa-3 d-block d-md-none"
        >
          <VBtn
            icon
            small
            class="btn-caret"
            @click.stop="expandFilter = !expandFilter"
          >
            <span
              class="betfont "
              :class="expandFilter ? 'icon-caretup' : 'icon-caretdown'"
            ></span>
          </VBtn>
        </div>
      </VCardText>
    </VCard>
    <VOverlay v-if="isFilterVisible">
      <div></div>
    </VOverlay>
    <VDialog
      v-model="isFilterVisible"
      :content-class="
        $vuetify.breakpoint.mdAndUp ? 'desktop-drawer' : 'mobile-drawer'
      "
      transition="slide-x-reverse-transition"
      @click:outside="closeFilters"
      persistent
      fullscreen
    >
      <VSheet class="rounded-0 pb-12">
        <VAppBar height="auto" flat absolute>
          <VBtn icon class="ml-n3" @click.stop="closeFilters">
            <span class="betfont icon-stick-arrow-left"></span>
          </VBtn>
          <VSpacer class="font-weight-bold">
            <div :class="headingSubTitle.length > 0 ? 'text-xxs' : 'text-md'">
              {{ headingTitle }}
            </div>
            <div>{{ headingSubTitle }}</div>
          </VSpacer>
        </VAppBar>

        <VBottomNavigation absolute height="auto">
          <VCard flat>
            <VCardText>
              <VBtn
                class="rounded mr-4 text-uppercase"
                outlined
                @click.stop="clearFilter"
                >{{$t(`clear.all`)}}</VBtn
              >
              <VBtn
                color="primary"
                class="rounded text-uppercase"
                @click.stop="closeFilters"
                ><span class="color-white">{{$t(`apply`)}}</span></VBtn
              >
            </VCardText>
          </VCard>
        </VBottomNavigation>
        <div class="v-app-bar"></div>
        <VDivider></VDivider>

        <VItemGroup>
          <div v-for="(item, $index) in items" :key="$index">
            <VListItem>
              <VCheckbox
                v-model="filterItems"
                on-icon="icon-checked"
                off-icon="icon-unchecked"
                :label="item.DisplayName"
                color="#ff9200"
                :value="item.ProductCode"
              >
              </VCheckbox>
            </VListItem>
            <VDivider class="my-2"></VDivider>
          </div>
        </VItemGroup>
      </VSheet>
    </VDialog>
  </div>
</template>
<script>
export default {
  props: {
    value: Array,
    isFilterVisible: { default: false },
    headingTitle: { default: 'Filters' },
    headingSubTitle: { type: String, default: '' },
    items: Array,
  },

  data() {
    return {
      expandFilter: false,
      filterItems: this.value,
    };
  },
  watch: {
    value(newValue) {
      this.filterItems = newValue;
    },
  },
  methods: {
    closeFilters() {
      this.$emit('closeFilters');
      this.$emit('input', this.filterItems);
      this.$emit('getGPRFilterDetaildata');
    },
    showFilter() {
      this.$emit('showFilter');
    },
    clearFilter() {
      this.filterItems = [];
      this.$emit('input', this.filterItems);
      this.$emit('getGPRFilterDetaildata');
    },
    removeItems(item) {
      var index = this.filterItems.indexOf(item);
      if (index > -1) {
        this.filterItems.splice(index, 1);
      }
      this.$emit('input', this.filterItems);
      this.$emit('getGPRFilterDetaildata');
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_filters';
</style>
