<template>
  <nav class="main-menu nav d-flex flex-wrap">
    <div>
      <VBtn
        v-for="visibleMenuItem in visibleMenuItems"
        :key="visibleMenuItem.key"
        class="menu-link"
        :class="{ active: visibleMenuItem.isActive }"
        href
        text
        min-width="none"
        :to="{ path: `/${$route.params.lang}/${visibleMenuItem.link}` }"
      >
        {{ $t(visibleMenuItem.title) }}
      </VBtn>
    </div>
    <div class="ml-4">
      <VMenu v-if="hiddenMenuItems.length > 0" offset-y left>
        <template v-slot:activator="{ on, attrs }">
          <VBtn height="2.2rem" width="2.2rem" icon v-bind="attrs" v-on="on">
            <span class="betfont icon-caretdown"></span>
          </VBtn>
        </template>
        <VCard class="more-menu-items">
          <VList dark>
            <div
              v-for="hiddenMenuItem in hiddenMenuItems"
              :key="hiddenMenuItem.key"
            >
              <VListItem class="px-0">
                <VListItemTitle>
                  <VBtn
                    class="menu-sub-link"
                    text
                    tile
                    :to="{
                      path: `/${this.$route.params.lang}/${hiddenMenuItems.link}`,
                    }"
                  >
                    {{ $t(hiddenMenuItem.title) }}
                  </VBtn>
                </VListItemTitle>
              </VListItem>
              <VDivider></VDivider>
            </div>
          </VList>
        </VCard>
      </VMenu>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from 'vuex';
//To do: Please improve this hacky code
export default {
  name: 'Header',
  data() {
    return {
      mainMenu: [
        { title: 'my.account', link: `myAccount`, isActive: false },
        { title: 'creative', link: `creatives`, isActive: false },
        { title: 'report', link: `reports`, isActive: false },
        { title: 'payment', link: `payments`, isActive: false },
      ],
      hiddenMenuItems: [],
      completeMenuItems: [],
      visibleMenuItems: [],
    };
  },
  computed: {
    ...mapGetters({
      langCode: 'langCode',
    }),
  },
  methods: {
    resetProducts(event) {
      this.completeMenuItems = this.mainMenu;
      this.visibleMenuItems = this.completeMenuItems.slice(
        0,
        this.completeMenuItems.length
      );
      this.hiddenMenuItems = [];
    },

    getWindowHeight(event) {
      this.$forceUpdate();
      this.$nextTick(function() {
        this.windowHeight = this.$el.clientHeight;
        if (this.windowHeight > 50) {
          this.splitProducts();
        }
      });
    },

    splitProducts() {
      this.visibleMenuItems.length = this.visibleMenuItems.length - 1;
      this.hiddenMenuItems = this.completeMenuItems.slice(
        this.visibleMenuItems.length,
        this.completeMenuItems.length
      );
      this.$forceUpdate();
      this.$nextTick(function() {
        this.getWindowHeight();
      });
    },
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.resetProducts);
      // window.addEventListener("resize", this.getWindowWidth);
      window.addEventListener('resize', this.getWindowHeight);
      //Init
      this.resetProducts();
      // this.getWindowWidth();
      this.getWindowHeight();
    });
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_the-main-menu';
</style>
