<template>
  <div class="the-header" :class="{ 'full-table-view': fullTableView }">
    <VAppBar
      class="main-app-bar"
      height="auto"
      dark
      fixed
      hide-on-scroll
      scroll-target="body"
    >
      <!-- <RouterLink :to="langCode" v-ripple> -->
      <RouterLink
        class="brand-logo mr-8"
        :class="`${langCode}`"
        :to="{ path: `/${$route.params.lang}/` }"
      ></RouterLink>
      <!-- </RouterLink> -->
      <slot name="default">
        <template v-if="!fullTableView">
          <TheMainMenu v-if="isLogin && !fullTableView"></TheMainMenu>
          <VSpacer></VSpacer>
          <VBtn icon @click.stop="showBurgerMenu(true)">
            <span class="betfont icon-hamburger-menu"></span>
          </VBtn>
        </template>
        <template v-if="fullTableView">
          <div>
            <div class="text-xs mb-1">{{ mainHeaderTitle }}</div>
          </div>
          <VSpacer></VSpacer>

          <VBtn icon small class="mr-2">
            <span class="betfont icon-search"></span>
          </VBtn>
          <VBtn icon small class="mr-1">
            <span class="betfont icon-download"></span>
          </VBtn>
        </template>
      </slot>
    </VAppBar>
    <div class="main-app-bar v-app-bar v-toolbar v-sheet elevation-0"></div>
    <TheBurgerMenu
      v-if="!fullTableView"
      @closeBurgerMenu="showBurgerMenu(false)"
      :isBurgerMenuVisible="isBurgerMenuVisible"
    />
  </div>
</template>
<script>
import TheBurgerMenu from './TheBurgerMenu';
import TheMainMenu from '../menu/TheMainMenu';
import { VBtn } from 'vuetify/lib';
import { mapGetters, mapState, mapActions } from 'vuex';
export default {
  name: 'Header',
  data() {
    return {   
      mainHeaderTitle: '',
      isActive: true,
      drawer: null,
      dialog: false,
      isBurgerMenuVisible: false,
      isLogin: false,
    };
  },
  props: { fullTableView: { default: false } },
  components: {
    TheBurgerMenu,
    TheMainMenu,
    VBtn,
  },
  created: function() {
    Promise.all([this.checkSession()]).then(() => {
      if (this.SessionModel.Status === 1) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  },
  computed: {
    ...mapGetters({
      langCode: 'langCode',
    }),
    ...mapState('Auth', ['SessionModel']),
  },
  methods: {
    ...mapActions('Auth', ['checkSession']),
    showBurgerMenu(state) {
      this.isBurgerMenuVisible = state;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_the-header';
</style>
