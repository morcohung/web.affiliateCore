<template>
  <div class="search-drawer">
    <!-- <VCard flat color="transparent">
      <VCardText class="pt-0">
        <template v-if="filtered">
          <VTextField
            readonly
            prepend-inner-icon="icon-stick-arrow-left text-md"
            append-icon="icon-search"
            hide-details="true"
            @click="showSearch"
            value="Title-"
          ></VTextField>
          <div class="mt-3 ">
            <div>
              <h3 class="text-xs">{{ $t(`search.results.from.referrals`) }}</h3>
              <p class="text-xxs mb-0">214 {{ $t(`results`) }}</p>
            </div>
          </div>
        </template>
      </VCardText>
    </VCard> -->
    <slot name="default"></slot>
    <VOverlay v-if="isSearchVisible"></VOverlay>
    <VDialog
      v-model="isSearchVisible"
      fullscreen
      @click:outside="closeSearch"
      :content-class="
        $vuetify.breakpoint.mdAndUp ? 'desktop-drawer' : 'mobile-drawer'
      "
      transition="slide-x-reverse-transition"
      persistent
    >
      <VSheet>
        <VAppBar height="auto" flat absolute color="transparent">
          <VSpacer class="font-weight-bold">
            <VAutocomplete
              v-model="searchTerms"
              :hide-details="true"
              :single-line="true"
              prepend-inner-icon="icon-stick-arrow-left text-md"
              :items="searchSuggestions"
              :clearable="true"
              clear-icon="
                icon-close-o text-md
              "
              label="Search"
              :menu-props="{
                contentClass: 'search-drawer-autocomplete',
                attach: '.search-drawer',
              }"
              @click:prepend-inner="closeSearch"
              @input="filterAndClose"
              @update:search-input="search"
            >
              <template v-slot:item="data">
                <template>
                  <span class="betfont icon-search text--disabled mr-4" />

                  <VListItemContent>
                    <VListItemTitle v-html="data.item"></VListItemTitle>
                  </VListItemContent>
                </template>
              </template>
            </VAutocomplete>
          </VSpacer>
        </VAppBar>
        <div class="v-app-bar"></div>
      </VSheet>
    </VDialog>
  </div>
</template>
<script>
export default {
  name: 'Search',
  data() {
    return {
      //searchSuggestions: ['foo', 'bar', 'fizz', 'buzz'],
      searchTerms: null,
      filtered: false,
    };
  },
  props: {
    isSearchVisible: { default: false },
    searchSuggestions: { type: Array, default: () => [] },
  },
  methods: {
    showSearch() {
      this.$emit('showSearch');
    },
    closeSearch() {
      this.$emit('closeSearch');
    },
    filterAndClose(selectedItem) {
      this.filtered = true;
      this.closeSearch();
      this.$emit('setSearchFilter', selectedItem);
    },
    search(val) {
      if (val != null && val.length > 0) {
        console.log(val);
        this.$emit('getSearchList', val);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_search-drawer';
</style>
<style lang="scss">
.search-drawer-autocomplete {
  @include icon('icon-search');
  box-shadow: none !important;
  .v-list {
    box-shadow: none !important;

    > .v-list-item {
      border-bottom: 1px solid rgba($black, 0.08);
      padding-left: 0;
      padding-right: 0;
    }
  }
}
</style>
