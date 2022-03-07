<template>
  <div>
    <VRow dense>
      <VCol cols="12" lg="6">
        <slot>
          <section>
            <VCard elevation="4" outlined min-height="25rem">
              <VImg src="https://doc.188contents.com/contents/aff/Images/Affiliates/TVScreen/888x400-sample-image.jpg"
                      height="25.25rem"
                      gradient="to top , rgba(0,0,0,0) 25%, rgba(0,0,0,0)"
                      class="d-flex align-end">
                  <div class="pa-4 text-center">
                      <h1 class="black--text text-xxxl  font-weight-bold">
                          OFFICIAL APAC SPONSOR OF FORMULA 1®
                      </h1>
                      <h2 class="gray--text text-md mb-2">
                          Sign up, promote us and start earning.
                      </h2>
                      <VBtn depressed color="primary mb-2" :to="{ path: `/${this.$route.params.lang}/Register` }">Sign Up</VBtn>
                      <div class="text--disabled">
                          Already have an account? <router-link :to="{ path: `/${this.$route.params.lang}/Login` }">Log in</router-link>
                      </div>
                  </div>
              </VImg>
            </VCard>
          </section>
        </slot>
      </VCol>
      <VCol cols="12" lg="6">
        <VRow dense>
          <VCol cols="12" sm="4" lg="12">
            <slot name='banner-1'></slot>
          </VCol>
          <VCol cols="12" sm="4" lg="12">
            <slot name='banner-2'></slot>
          </VCol>
          <VCol cols="12" sm="4" lg="12">
            <slot name='banner-3'></slot>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'StaticHomePage'
});
</script>