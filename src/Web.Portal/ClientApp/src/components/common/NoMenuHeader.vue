<template>
  <div class="the-header">
    <VAppBar
      class="main-app-bar"
      height="auto"
      dark
      fixed
      hide-on-scroll
      scroll-target="body"
    >
      <RouterLink :to="`/en-gb/`" v-ripple>
        <span class="brand-logo mr-8" :class="`${langCode}`"> </span
      ></RouterLink>     
      <VSpacer></VSpacer>
    </VAppBar>
    <div class="main-app-bar v-app-bar v-toolbar v-sheet elevation-0"></div>
  </div>
</template>
<script>
import { VSpacer,VAppBar } from 'vuetify/lib';
import { mapGetters } from "vuex";
export default {
  name: 'NoMenuHeader',
  data() {
    return {   
    };
  },
  components: {
    VSpacer,   
    VAppBar,
  },
  computed: {
    ...mapGetters({
      langCode: 'langCode'     
    })  
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_the-header';
</style>
