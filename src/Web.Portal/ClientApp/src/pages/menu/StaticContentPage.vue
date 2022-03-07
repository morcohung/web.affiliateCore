<template>
  <div class="static-content-page">
    <v-runtime-template
      :template="this.StaticContent.body"
    ></v-runtime-template>
  </div>
</template>

<script>
import {
  VList,
  VListItem,
  VListItemGroup,
  VListItemTitle,
  VListItemSubtitle,
  VContainer,
  VSheet,
  VCard,
  VRow,
  VCol,
  VDivider,
  VCardText,
  VOverlay,
  VDialog,
  VBtn,
  VSpacer,
  VAppBar,
  VImg,
  VAvatar,
  VIcon
} from 'vuetify/lib';
import VueMeta from 'vue-meta';
import { StaticContentModel } from '@/store/modules/Web/typings';
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import VRuntimeTemplate from 'v-runtime-template';
import StaticListPage from '@/components/staticpages/StaticListPage';
import StaticListItem from '@/components/staticpages/StaticListItem';
import StaticListItemAdv from '@/components/staticpages/StaticListItemAdv';
import StaticContactPage from '@/components/staticpages/StaticContactPage';
import StaticContactItem from '@/components/staticpages/StaticContactItem';
import StaticHomePage from '@/components/staticpages/StaticHomePage';
import StaticBannerMain from '@/components/staticpages/StaticBannerMain';
import StaticBannerItem from '@/components/staticpages/StaticBannerItem';

export default Vue.extend({
  name: 'StaticContent',
  data() {
    return {
      language: '',
      resourceName: '',
      showMoreDetails: false
    };
  },
  metaInfo() {
    return this.StaticContent.metaInfo;
  },
  beforeMount() {
    this.loadStaticPage();
  },
  computed: {
    ...mapState('Web', ['StaticContent']),
    ...mapState('Web', ['showLoginDialog', 'showSignUpDialog'])
  },
  watch: {
    $route: 'loadStaticPage',
  },
  methods: {
    ...mapActions('Web', ['fetchStaticContent']),
    ...mapActions('Web', ['setShowLoginDialog','setShowSignUpDialog']),
    openLoginDialog(){
      this.setShowLoginDialog(true);
    },
    openSignUpDialog() {
      this.setShowSignUpDialog(true);
    },
    loadStaticPage() {
      this.language = this.$route.params.lang;
      this.resourceName = this.$route.params.viewName ?? 'Home';

      //You need to add component name to VueElements array when include new vue components
      const _content = {
        Language: this.language,
        ResourceName: this.resourceName,
        VueElements: [
          'VList',
          'VListItem',
          'VListItemGroup',
          'VListItemTitle',
          'VListItemSubtitle',
          'VContainer',
          'VSheet',
          'VCard',
          'VRow',
          'VCol',
          'VDivider',
          'VCardText',
          'VOverlay',
          'VDialog',
          'VBtn',
          'VSpacer',
          'VAppBar',
          'VImg',
          'VAvatar',
          'VIcon',

          'StaticListPage',
          'StaticListItem',
          'StaticListItemAdv',
          'StaticContactPage',
          'StaticContactItem',
          'StaticHomePage',
          'StaticBannerMain',
          'StaticBannerItem'
        ],
      };

      this.fetchStaticContent(_content);
    },
  },
  components: {
    VRuntimeTemplate,
    VList,
    VListItem,
    VListItemGroup,
    VListItemTitle,
    VListItemSubtitle,
    VContainer,
    VSheet,
    VCard,
    VRow,
    VCol,
    VDivider,
    VCardText,
    VOverlay,
    VDialog,
    VBtn,
    VSpacer,
    VAppBar,
    VImg,
    VAvatar,
    VIcon,

    StaticListPage,
    StaticListItem,
    StaticListItemAdv,
    StaticContactPage,
    StaticContactItem,
    StaticHomePage,
    StaticBannerMain,
    StaticBannerItem
  },
});
</script>
<style lang="scss">
@include icon(icon-stick-arrow-left);
.static-content-dialog {
  margin: 0;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  max-height: initial !important;
  border-radius: 0;
  &.desktop-drawer {
    max-width: rem(336);
    left: auto;

    > .v-sheet {
      height: 100%;
      overflow-y: auto;
    }
  }
  &.mobile-drawer {
    position: fixed;
    > .v-sheet {
      height: 100%;
      overflow-y: auto;
    }
  }
  .v-app-bar {
    height: rem(72);
    .v-toolbar__content {
      height: 100%;
    }
  }
}
</style>
<style lang="scss" scoped>
.static-content-page {
  &::v-deep {
    @include icon(icon-stick-arrow-left);
    @import '../../assets/scss/04_templates/_contactus';
    @import '../../assets/scss/04_templates/_before-login';
  }
}
</style>
