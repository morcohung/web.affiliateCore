<template>
  <div id="app" @mousemove="moveEvent" @click="moveEvent">
    <VApp>
      <DialogQueue />
      <router-view v-if="isReloadAlive" />
    </VApp>
  </div>
</template>
<script>
/*eslint no-undef: "off"*/
if (process.env.NODE_ENV === 'production') {
  __webpack_public_path__ =
    window.gv.cdnurl + __webpack_public_path__;
} else {
  __webpack_public_path__ = 'http://localhost:8080' + __webpack_public_path__;
}


import DialogQueue from '@/store/modules/dialogQueue/components/DialogQueue.vue';
import {mapGetters, mapState, mapActions} from "vuex";
export default {
  components: { DialogQueue },
  provide() {
    return {
        reload: this.reload             
    }
  },  
  data: () => ({
    loggedIn: false,
    isReloadAlive : true,
    timmer: 0 , 
    isExcute:false
  }),  
  created: function() {
    this.checkSession();  
  },
  computed: {
    ...mapState('Auth',['SessionModel'])
  },
  methods: {
    ...mapActions('Auth', ['checkSession','logout']),        
    reload() {
        this.isReloadAlive = false;      
        this.$nextTick(function(){
        this.isReloadAlive = true;   
        })
      },
    moveEvent(){     
      this.timmer = 0;
      this.isExcute = false;   
      if( this.SessionModel.Status === 1)   
      {
        clearTimeout(this.timmer);
        this.init();
      }  
      // }
    },
    init(){  
      this.timmer=setTimeout(()=>{   
       if (this.isExcute === false)       
       {   
        this.isExcute = true;
        this.logout(); 
        this.reload();
       }  
      
      },60*60*1000);  
    },


  }
};
</script>
//
<style lang="scss">
$cdn-path: './assets/';
@import './assets/scss/02_molecules/typography';
@import './assets/scss/04_templates/common-layout';
</style>
<style lang="scss" scoped>
// @import "./assets/scss/04_templates/_test";
</style>
