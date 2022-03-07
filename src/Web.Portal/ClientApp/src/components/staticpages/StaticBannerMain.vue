<template>
  <section>
    <VCard elevation="4" outlined min-height="25rem">
      <VImg :src="this.backgroundImagePath"
            height="25.25rem"
            gradient="to top , rgba(0,0,0,0) 25%, rgba(0,0,0,0)"
            class="d-flex align-end">
        <slot>
          <div class="pa-4 text-center">
            <h1 class="black--text text-xxxl  font-weight-bold">
              {{ this.titlePrimary }}
            </h1>
            <h2 class="gray--text text-md mb-2">
              {{ this.titleSecondary }}
            </h2>
            <VBtn depressed color="primary mb-2" :to="{ path: `/${this.$route.params.lang}/Register` }">Sign Up</VBtn>
            <div class="text--disabled">
                Already have an account? <router-link :to="{ path: `/${this.$route.params.lang}/Login` }">Log in</router-link>
            </div>
          </div>
        </slot>
      </VImg>
    </VCard>
  </section>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'StaticBannerMain',
  props: ['backgroundImagePath','titlePrimary','titleSecondary','']
});
</script>