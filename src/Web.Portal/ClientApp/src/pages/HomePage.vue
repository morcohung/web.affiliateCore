<template>
  <VSheet class="bg--gray">
    <VContainer>    
      <AfterLogin v-if="loggedIn"></AfterLogin>
      <StaticContentPage v-if="!loggedIn"></StaticContentPage>  
    </VContainer>
  </VSheet>
</template>
<script>
import {
  VContainer
} from 'vuetify/lib';
import { mapState, mapActions, mapGetters } from 'vuex';
import AfterLogin from '@/pages/HomePage/AfterLogin';
import StaticContentPage from '@/pages/menu/StaticContentPage';

export default {
  name: 'HomePage',  
  data: () => ({
    loggedIn: false  
  }),
  components: {
    VContainer,
    AfterLogin,
    StaticContentPage
  },
  created: function() {  
    Promise.all([this.checkSession()]).then(() => { 
      if(this.SessionModel.Status === 1)   
      {
        this.loggedIn = true;
      }   
      else
      {
        this.loggedIn = false;
      }    
    });     
  },
  computed: {    
    ...mapState('Auth',['SessionModel'])
  },   
  methods: {
    ...mapActions('Auth', ['checkSession'])
  }
};
</script>
<style lang="scss" scoped>
@import '../assets/scss/04_templates/_trend-charts';
@import '../assets/scss/05_pages/_homepage';
</style>
