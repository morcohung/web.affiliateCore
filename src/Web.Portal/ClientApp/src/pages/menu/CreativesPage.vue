<template>
  <div class="bg--gray">
    <VContainer class="pb-0">
      <VTabs color="#ff9200" v-model="tab">
        <VTab>{{$t(`creatives.tab.links`)}}</VTab>
        <VTab>{{$t(`creatives.tab.banners`)}}</VTab>
      </VTabs>
    </VContainer>
    <VDivider></VDivider>
    <VContainer :class="$vuetify.breakpoint.smAndDown ? 'px-0' : 'px-2'">
      <VTabsItems v-model="tab">
        <VTabItem class="pa-1">
          <LinksList :links="this.Links" @add-link="onClickAddLink($event)" />
        </VTabItem>
        <VTabItem class="pa-1">
          <BannersList :collateralList="this.CollateralList"/>
        </VTabItem>
      </VTabsItems>
    </VContainer>
  </div>
</template>

<script>
import LinksList from '@/components/creatives/LinksList.vue';
import BannersList from '@/components/creatives/BannersList.vue';
import Vue from 'vue';
import { mapGetters, mapState, mapActions } from 'vuex';

export default Vue.extend({
  inject: ['reload'],
  name: 'Creative',
  data() {
    return {
      linkCode: '',
      scriptName: '',
      scriptId: '',
      marketLinkScript: '',
      tab: null,
      filter:{
        LangId: '', 
        ClassId: '', 
        Page: 1        
      }
    };
  },
  components: { LinksList, BannersList },
  created: function() {
    const _support = 1;
    const _defaultLanguageNumber = '0';
    
    this.fetchLanguages(_support);
    this.fetchCollateralClassificationList(_defaultLanguageNumber);
    this.fetchLink();
    this.fetchCollateralList(this.filter);
    Promise.all([this.checkSession()]).then(() => { 
      if(this.SessionModel.Status != 1)   
      {
        this.$router.push({ path: `/${this.langCode}/` });
        this.reload();
      }  
    });      
  },
  computed: {
    ...mapGetters({
      langCode: 'langCode',
    }),        
    ...mapState('Web', ['Languages']),
    ...mapState('Marketing', [
      'CollateralClassificationList',
      'Links',
      'CollateralList'
    ]), 
    ...mapState('Auth',['SessionModel'])
  },   
  methods: {
    ...mapActions('Auth', ['checkSession']),
    ...mapActions('Web', ['fetchLanguages']),
    ...mapActions('Marketing', [
      'fetchCollateralClassificationList',
      'fetchLink',
      'fetchCollateralList',
      'addLink'
    ]),
    onClickAddLink(linkCode) {
      const _addLink = { Content: linkCode };
      this.addLink(_addLink).then((result) => {
      });
    }
  },
});
</script>
<style lang="scss" scoped>
@import '../../assets/scss/05_pages/_creatives';
</style>
