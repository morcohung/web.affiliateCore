<template>
  <div class="links-list">
    <VCard
      :color="$vuetify.breakpoint.smAndDown ? 'transparent' : ''"
      class="rounded-lg"
      outlined
    >
      <VToolbar flat color="transparent" class="px-4">
        <VToolbarTitle class="text-xl font-weight-bold">{{
          $t(`link`)
        }}</VToolbarTitle>
        <VSpacer></VSpacer>

        <VBtn
          small
          text
          color=" blue"
          class="mr-n6 mr-sm-n5 mr-md-n3 mr-lg-0"
          :class="{ 'faint-outline': $vuetify.breakpoint.smAndDown }"
          @click.stop="showAddNew"
        >
          <span class="betfont icon-positive text-sm mr-2"></span>
          <span class="font-weight-bold">{{ $t(`add.new`) }}</span>
        </VBtn>
        <VBtn
          icon
          class="search d-none d-md-block ml-4"
          small
          @click.stop="showSearch"
        >
          <!-- issue: not working -->
          <span class="betfont icon-search"></span>
        </VBtn>
      </VToolbar>
      <VDivider></VDivider>
      <VBtn
        class="d-block d-md-none"
        icon
        color="primary"
        large
        fab
        fixed
        bottom
        right
        ><span class="betfont icon-search white--text"></span
      ></VBtn>
      <VCard v-if="addednewlink" color="#deeecc" flat class="ma-4 rounded-lg">
        <VCardText class="pa-8">
          {{ $t(`you.have.successfully.added.a.new.link`) }}
        </VCardText>
      </VCard>
      <VList color="transparent" class="pb-12">
        <template>
          <div v-for="link in links" v-bind:key="link.id">
            <VListItem>
              <VListItemTitle class="member-list-item">
                <VRow class="align-center">
                  <VCol
                    cols="6"
                    sm="7"
                    md="6"
                    class="py-4 px-7"
                    @click.stop="showFullDetails(link)"
                  >
                    <h2 class="font-weight-bold text-md">
                      {{ link.Code }}
                    </h2>
                  </VCol>

                  <VDivider vertical class="my-4 d-none d-sm-block"></VDivider>
                  <VCol
                    sm="3"
                    md="2"
                    class="d-sm-flex justify-end justify-sm-center py-4 px-7 "
                    @click.stop="showFullDetails(link)"
                  >
                    <div style="min-width:6.25rem">
                      <h3
                        class="font-weight-medium text-sm text-right"
                        :class="{
                          'text--secondary': $vuetify.breakpoint.smAndDown,
                        }"
                      >
                        {{ link.Type }}
                      </h3>
                      <h4
                        class="font-weight-medium text--secondary text-xxs text-right d-none d-sm-block"
                      >
                        {{ $t(`type`) }}
                      </h4>
                    </div>
                  </VCol>
                  <VDivider vertical class="my-4 d-none d-sm-block"></VDivider>
                  <VCol
                    cols="6"
                    sm="2"
                    md="4"
                    class="d-none d-sm-flex py-4 px-7 "
                    :class="{
                      'justify-center': $vuetify.breakpoint.mdAndUp,
                    }"
                  >
                    <VBtn
                      text
                      color="blue"
                      small
                      @click="referralLinkDetail(link)"
                      ><span class="betfont icon-link"></span>
                      <span class="ml-2 d-none d-md-block">{{
                        $t(`creatives.referral.link`)
                      }}</span>
                    </VBtn>
                    <VDivider
                      vertical
                      class="my-1 d-none d-md-block"
                    ></VDivider>
                    <VBtn text color="blue" small @click="qrCodeDetail(link)"
                      ><span class="betfont icon-qrcode"></span>
                      <span class="ml-2 d-none d-md-block">{{
                        $t(`get.QR.code`)
                      }}</span></VBtn
                    >
                  </VCol>
                </VRow>
              </VListItemTitle>
            </VListItem>
            <VDivider class="d-block"></VDivider>
          </div>
        </template>
      </VList>
    </VCard>
    <SideDrawerDetail
      :showMoreDetails="showMoreDetails"
      :headingSubTitle="headingSubTitle"
      :headingTitle="headingTitle"
      @moreDetails="moreDetails"
    >
      <!--To Do: Maybe a good idea to separate these into sub-components...?  -->
      <template
        slot="sideDrawerContent"
        v-if="sideDrawerContent == 'linkDetails'"
      >
        <VImg
          :src="linkDetail.QRUrl"
          class="my-6 mx-auto"
          max-width="9.375rem"
        ></VImg>
        <VCard class="rounded-lg ma-6" color="#f6f6f6" flat>
          <VCardText>{{ linkDetail.LinkUrl }}</VCardText>
        </VCard>
      </template>
      <template slot="sideDrawerContent" v-if="sideDrawerContent == 'addNew'">
        <ValidationObserver v-slot="v" ref="form">
          <VCardText>
            <ValidationProvider
              name="linkCode"
              rules="required"
              v-slot="{ invalid }"
            >
              <VTextField
                filled
                label="Code"
                v-model="linkCode"
                hide-details="auto"
              ></VTextField>
              <span v-if="invalid" style="color:red;">
                {{ $t(`jquery.validator.required`) }}
              </span>
            </ValidationProvider>
          </VCardText>
          <VCardActions class="d-flex justify-end">
            <VBtn
              depressed
              outlined
              class="faint-outline"
              @click.stop="moreDetails(false)"
              >Cancel</VBtn
            >
            <VBtn
              depressed
              color="primary"
              :disabled="v.invalid"
              @click.stop="callAddLink"
              >Add Link</VBtn
            >
          </VCardActions>
        </ValidationObserver>
      </template>
    </SideDrawerDetail>
    <SearchDrawer
      :isSearchVisible="isSearchVisible"
      :searchSuggestions="this.getLinkNameAsArray"
      @closeSearch="closeSearch"
      @getSearchList="showSearchDetail"
    ></SearchDrawer>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import SideDrawerDetail from '@/components/reports/SideDrawerDetail';
import SearchDrawer from '@/components/search/SearchDrawer.vue';
export default {
  data: () => ({
    linkCode: '',
    showMoreDetails: false,
    addednewlink: false,
    linkDetail: {},
    sideDrawerContent: '',
    headingSubTitle: '',
    headingTitle: '',
    isSearchVisible: false,
    searchSuggestions: []
  }),
  props: { links: { required: true } },
  components: {
    SideDrawerDetail,
    ValidationProvider,
    ValidationObserver,
    SearchDrawer,
  },
  computed: {
    ...mapGetters('Marketing', ['getLinkNameAsArray','getLinkItemByCode'])
  },
  methods: {
    ...mapActions({
      openDialog: 'DialogQueue/queue',
      closeDialog: 'DialogQueue/close',
    }),
    qrCodeDetail: function(link) {
      let payload = {
        title: link.Code,
        subTitle: link.Type,
        msg:
          '<div class="mt-8 mx-auto" style="background:url(' +
          link.QRUrl +
          '); height:9.375rem; width:9.375rem; overflow:hidden;" >\
          ',
      };
      this.openDialog({
        payload,
        setting: {
          maxWidth: '18.5rem',
          separator: true,
          hideActionButtons: true,
          closeOnClickOutside: true,
        },
      });
    },
    referralLinkDetail: function(link) {
      let payload = {
        title: link.Code,
        subTitle: link.Type,
        msg:
          '<div class="v-card rounded--lg v-card--flat v-sheet theme--light mt-8" style="background-color: rgb(246, 246, 246); border-color: rgb(246, 246, 246);"><div class="v-card__text text--primary">' +
          link.LinkUrl +
          '</div></div> ',
      };
      this.openDialog({
        payload,
        setting: {
          maxWidth: '18.5rem',
          separator: true,
          hideActionButtons: true,
          closeOnClickOutside: true,
        },
      });
    },
    showFullDetails: function(linkDetail) {
      this.linkDetail = linkDetail;
      this.headingTitle = linkDetail.Type;
      this.headingSubTitle = linkDetail.Code;
      this.sideDrawerContent = 'linkDetails';
      this.moreDetails(true);
    },
    showAddNew: function() {
      this.sideDrawerContent = 'addNew';
      this.headingTitle = '';
      this.headingSubTitle = 'Add New Link';
      this.moreDetails(true);
    },
    moreDetails: function(event) {
      this.showMoreDetails = event;
      if (this.showMoreDetails === true) {
        this.addednewlink = false;
      }
    },
    callAddLink: function() {
      this.$emit('add-link', this.linkCode);
      this.linkCode = '';
      this.addednewlink = true;
      this.moreDetails(false);
    },
    showSearch: function() {
      this.isSearchVisible = true;
    },
    closeSearch: function() {
      this.isSearchVisible = false;
    },
    showSearchDetail: function(code){
      this.isSearchVisible = false;
      const _match = this.getLinkItemByCode(code);
      this.showFullDetails(_match);
    }
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_links-list';
</style>
