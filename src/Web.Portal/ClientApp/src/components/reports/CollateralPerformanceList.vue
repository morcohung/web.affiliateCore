<template>
  <div>
    <VCard outlined class="rounded-lg">
      <SearchDrawer
        :isSearchVisible="isSearchVisible"
        @closeSearch="closeSearch"
        @showSearch="showSearch"
        @setSearchFilter="setSearchFilter"
        @getSearchList="getSearchList"
        :searchSuggestions="searchItemList"
      >
        <template slot="default">
          <VList class="mb-12">
            <div
              v-for="item in AffiliatePromotingModel.PromotingList"
              :key="item.CreativeId"
            >
              <VListItem class="px-0" @click.stop="showDetails(item)">
                <VContainer
                  class="d-flex flex-grow-1 align-start align-sm-center"
                >
                  <VImg
                    :src="item.PreviewUrl"
                    max-width="2.5rem"
                    min-width="2.5rem"
                    class=" ml-2 mr-4"
                  ></VImg>
                  <VRow class="align-center" dense>
                    <VCol cols="12" sm="3" md="4" class="d-flex">
                      <div class="font-weight-bold font-sm">
                        {{ item.CreativeId }}
                      </div>
                    </VCol>
                    <VCol
                      cols="4"
                      md="2"
                      class="d-none d-md-flex justify-center"
                    >
                      <div>
                        <h3
                          class="text-sm text--primary text-left text-sm-right  "
                        >
                          {{ item.BannerSize }}
                        </h3>
                        <h4 class="text-xxs  text-left text-sm-right">
                          {{ $t(`size`) }}
                        </h4>
                      </div>
                    </VCol>
                    <VDivider class="d-none d-md-block" vertical></VDivider>
                    <VCol class="d-flex justify-center" cols="4" sm="3" md="2">
                      <div>
                        <h3
                          class="text-sm text--primary text-left text-sm-right"
                        >
                          {{ item.ClickCount }}
                        </h3>
                        <h4 class="text-xxs  text-left text-sm-right">
                          {{ $t(`clicks`) }}
                        </h4>
                      </div>
                    </VCol>
                    <VDivider class="d-none d-sm-block" vertical></VDivider>
                    <VCol class="d-flex justify-center" cols="4" sm="3" md="2">
                      <div>
                        <h3
                          class="text-sm text--primary text-left text-sm-right"
                        >
                          {{ item.NewSignUp }}
                        </h3>
                        <h4 class="text-xxs  text-left text-sm-right">
                          {{ $t(`signUps`) }}
                        </h4>
                      </div>
                    </VCol>
                    <VDivider class="d-none d-sm-block" vertical></VDivider>
                    <VCol class="d-flex justify-center" cols="4" sm="3" md="2">
                      <div>
                        <h3
                          class="text-sm text--primary  text-left text-sm-right "
                        >
                          {{ item.NewSignUpDeposit }}
                        </h3>
                        <h4 class="text-xxs  text-left text-sm-right ">
                          {{ $t(`deposits`) }}
                        </h4>
                      </div>
                    </VCol>
                  </VRow>
                </VContainer>
              </VListItem>
              <VDivider></VDivider>
            </div>
          </VList>
        </template>
      </SearchDrawer>
    </VCard>
  </div>
</template>

<script>
import SearchDrawer from '@/components/search/SearchDrawer.vue';
export default {
  data: () => ({
    filtered: false,
  }),
  props: {
    isSearchVisible: { default: false },
    AffiliatePromotingModel: { type: Object, default: () => {} },
    searchItemList: { type: Array, default: () => [] },
  },
  components: {
    SearchDrawer,
  },
  methods: {
    showDetails(item) {
      this.$emit('showDetails', item, true);
    },
    showSearch() {
      this.$emit('showSearch');
    },
    closeSearch() {
      this.$emit('closeSearch');
    },
    getSearchList(input) {
      this.$emit('getSearchList', input);
    },
    setSearchFilter(selectedItem) {
      this.$emit('setSearchFilter', selectedItem);
    },
  },
};
</script>
<style lang="scss" scoped>
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
