<template>
  <div>
    <router-link class="text-decoration-none" :to="{ path: `/${this.$route.params.lang}/${this.linkAddress.replace(/^\/+|\/+$/g, '')}` }">
      <section style="height:100%">
        <VCard elevation="4" outlined height="100%" min-height="8rem">
          <VImg :src="this.backgroundImagePath" min-height="8rem" class="d-flex align-center">
            <div class="d-flex align-center pa-4">
              <VAvatar color="black">
                <span class="white--text">
                  <slot name='icon'>
                    <svg style="width:24px;height:24px;margin-top:.2em;" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z" />
                    </svg>
                  </slot>
                </span>
              </VAvatar>
              <slot>
                <div class="px-4">
                  <h1 class="black--text text-md  font-weight-bold">
                    {{ this.titlePrimary }}
                  </h1>
                  <h2 class="text--secondary text-sm mb-2"
                      style="line-height:1.2em">
                    {{ this.titleSecondary }}
                  </h2>
                </div>
              </slot>
            </div>
          </VImg>
        </VCard>
      </section>
    </router-link>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'StaticBannerItem',
  props: ['backgroundImagePath','linkAddress','titlePrimary','titleSecondary']
});
</script>