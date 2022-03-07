<template>
  <!-- 
    issue: 
      Name value for Banner name not image file name (confirmed)
      EffectiveDate only, not Date Added.
  -->
  <div>
    <VCard class="rounded-lg" outlined>
      <VToolbar flat class="px-4">
        <VToolbarTitle class="text-xl">{{
          $t(`creatives.tab.banners`)
        }}</VToolbarTitle>
        <VSpacer></VSpacer>
        <VBtn
          icon
          class="search d-none d-lg-block"
          small
          @click.stop="showSearch"
        >
          <span class="betfont icon-search "></span>
        </VBtn>
      </VToolbar>
      <VDivider></VDivider>
      <VBtn
        color="primary"
        class="mx-1 d-block d-lg-none"
        fab
        fixed
        bottom
        right
      >
        <span class="betfont icon-search white--text"></span>
      </VBtn>
      <VList color="transparent" class="pb-12">
        <template>
          <div
            v-for="item in this.collateralList.CollateralList"
            v-bind:key="item.Id"
          >
            <VListItem @click.stop="showBannerDetail(true, item)">
              <VListItemTitle class="member-list-item">
                <VRow class="align-center">
                  <VCol cols="6" sm="6" md="3" class="py-4 px-7">
                    <VImg
                      :src="item.PreviewUrl"
                      max-width="2.5rem"
                      min-width="2.5rem"
                      class=" ml-2 mr-4"
                    ></VImg>
                  </VCol>

                  <VCol
                    cols="2"
                    sm="2"
                    md="3"
                    class="d-none d-md-flex justify-sm-center py-4 px-2 "
                  >
                    <div style="min-width:6.25rem">
                      <h3 class="font-weight-medium text-sm text-right">
                        {{ item.Name }}
                      </h3>
                      <h4
                        class="font-weight-medium text--secondary text-xxs text-right"
                      >
                        {{ $t(`name`) }}
                      </h4>
                    </div>
                  </VCol>
                  <VDivider vertical class="my-4 d-none d-md-block"></VDivider>
                  <VCol
                    cols="2"
                    sm="2"
                    md="2"
                    class="d-none d-sm-flex justify-center py-4 px-2 "
                  >
                    <div>
                      <h3 class="font-weight-medium text-sm text-right">
                        {{ item.Classification }}
                      </h3>
                      <h4
                        class="font-weight-medium text--secondary text-xxs text-right"
                      >
                        {{ $t(`classification`) }}
                      </h4>
                    </div>
                  </VCol>
                  <VDivider vertical class="my-4 d-none d-sm-block"></VDivider>
                  <VCol
                    cols="2"
                    sm="2"
                    md="2"
                    class="d-none d-sm-flex justify-sm-center py-4 px-2 "
                  >
                    <div>
                      <h3 class="font-weight-medium text-sm text-right">
                        {{ item.EffectiveDate }}
                      </h3>
                      <h4
                        class="font-weight-medium text--secondary text-xxs text-right"
                      >
                        {{ $t(`date.add`) }}
                      </h4>
                    </div>
                  </VCol>
                  <VDivider vertical class="my-4 d-none d-sm-block"></VDivider>
                  <VCol
                    cols="6"
                    sm="2"
                    class="d-sm-flex justify-end justify-sm-center py-4 px-7 "
                  >
                    <div>
                      <h3
                        class="font-weight-medium text-sm text-right"
                        :class="{
                          'text--secondary': $vuetify.breakpoint.smAndDown,
                        }"
                      >
                        {{ item.SizeCode }}
                      </h3>
                      <h4
                        class="font-weight-medium text--secondary text-xxs text-right d-none d-sm-block"
                      >
                        {{ $t(`size`) }}
                      </h4>
                    </div>
                  </VCol>
                </VRow>
              </VListItemTitle>
            </VListItem>
            <VDivider class="d-block"></VDivider>
          </div>
        </template>
      </VList>
    </VCard>
    <BannerDetail
      :isBannerDetailVisible="isBannerDetailVisible"
      :collateral="this.collateral"
      @showBannerDetail="showBannerDetail"
    ></BannerDetail>
    <SearchDrawer
      :isSearchVisible="isSearchVisible"
      :searchSuggestions="this.getBannerNameAsArray"
      @closeSearch="closeSearch"
      @getSearchList="showSearchDetail"
    ></SearchDrawer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import BannerDetail from '@/components/creatives/BannerDetail.vue';
import SearchDrawer from '@/components/search/SearchDrawer.vue';
export default {
  data: () => ({
    isBannerDetailVisible: false,
    isSearchVisible: false,
    collateral: {
      PreviewUrl: '',
      Classification: '',
      TypeDescr: '',
      SizeCode: '',
      LangDescr: '',
      EffectiveDate: '',
      searchSuggestions: []
    },
  }),
  props: {
    collateralList: {},
  },
  components: { BannerDetail, SearchDrawer },
  computed: {
    ...mapGetters('Marketing', ['getBannerNameAsArray','getBannerItemByName'])
  },
  methods: {
    showBannerDetail(isVisible, collateral) {
      this.isBannerDetailVisible = isVisible;
      this.collateral = collateral;
    },

    //Search functions
    showSearch: function() {
      this.isSearchVisible = true;
    },
    closeSearch: function() {
      this.isSearchVisible = false;
      this.showBannerDetail(false, null);
    },
    showSearchDetail: function(name){
      const _match = this.getBannerItemByName(name);
      this.showBannerDetail(true, _match);
    }
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_banners-list';
</style>
