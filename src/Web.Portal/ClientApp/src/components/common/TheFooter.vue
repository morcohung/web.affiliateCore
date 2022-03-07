<template>
  <div
    class="the-footer"
    :class="{ 'allow-scroll': !hasScrolled }"
    v-scroll="onScroll"
  >
    <transition name="fade">
      <VSheet dark color="dark" v-if="hasScrolled">
        <VContainer fluid class="px-6">
          <VRow>
            <VCol cols="12" md="6" class="useful-links">
              <VListItem>
                <h4 class="my-0 text-sm text-uppercase">{{$t(`other.useful.links`)}}</h4>
              </VListItem>
              <VRow class="text-sm">
                <VCol cols="6">
                  <VListItem>
                    <RouterLink
                      class="color-gray"
                      :to="{ path: `/${$route.params.lang}/aboutus` }"
                      >{{ $t(`about.us`) }}</RouterLink
                    >
                  </VListItem>
                  <VListItem>
                    <RouterLink
                      class="color-gray"
                      :to="{
                        path: `/${$route.params.lang}/termsandconditions`,
                      }"
                      >{{ $t(`term.and.condition`) }}</RouterLink
                    >
                  </VListItem>             
                </VCol>
                <VCol cols="6">               
                  <VListItem>
                    <RouterLink
                      class="color-gray"
                      :to="{ path: `/${$route.params.lang}/contactus` }"
                      >{{$t(`contact.us`)}}</RouterLink
                    >
                  </VListItem>
                  <VListItem>
                    <RouterLink
                      class="color-gray"
                      :to="{ path: `/${$route.params.lang}/faq` }"
                      >{{ $t(`faq`) }}</RouterLink
                    >
                  </VListItem>                  
                </VCol>
              </VRow>
            </VCol>
            <VCol class="contact-points">
              <VListItem>
                <h4 class="my-0 text-sm text-uppercase">{{$t(`contact.us`)}}</h4>
              </VListItem>
              <VRow class="text-sm">
                <VCol class="flex-shrink-0 pb-0">
                  <VListItem>
                    <VAvatar class="ml-n4">
                      <span class="betfont icon-phone"></span>
                    </VAvatar>
                    <span class="color-gray no-wrap">{{$t(`asia`)}}: +852 5808 3608</span>
                  </VListItem>
                  <VListItem>
                    <VAvatar class="ml-n4">
                      <span class="betfont icon-phone"></span>
                    </VAvatar>
                    <span class="color-gray no-wrap"
                      >{{$t(`europe`)}}: +44 20 3318 0702</span
                    >
                  </VListItem>
                </VCol>
                <VCol>
                  <VListItem>
                    <VAvatar class="ml-n4">
                      <span class="betfont icon-inbox"></span>
                    </VAvatar>
                    <span class="color-gray">affiliate@188service.com</span>
                  </VListItem>
                  <VListItem>
                    <VAvatar class="ml-n4">
                      <span class="betfont icon-skype"></span>
                    </VAvatar>
                    <span class="color-gray">affiliates_188</span>
                  </VListItem>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
          <VDivider class="my-4"></VDivider>
          <VRow>
            <VCol cols="12" md="6">
              <VListItem class="justify-center justify-md-start">
                <h4 class="my-0 text-sm text-uppercase text-sm-center">
                  {{ $t(`formulanew`) }}
                </h4>
              </VListItem>
              <VListItem class="justify-center justify-md-start">                
                  <a
                    target="_blank"
                    class="logo F1"
                    href="https://www.formula1.com/"
                  ><div class="footer-logos sponsors F1"></div></a>                
              </VListItem>
            </VCol>
            <VCol cols="12" md="6">
              <VListItem class="justify-center justify-md-start">
                <h4 class="my-0 text-sm text-uppercase text-sm-center">
                  {{ $t(`werder1`) }}
                </h4>
              </VListItem>
              <VListItem class="justify-center justify-md-start">                
                  <a
                    target="_blank"
                    class="logo F1"
                    href="https://bwfthomasubercups.bwfbadminton.com/"
                  ><div class="footer-logos sponsors werder"></div></a>               
              </VListItem>
            </VCol>
          </VRow>
          <VDivider class="my-4"></VDivider>
          <VRow class="mb-12">
            <VCol>
              <VListItem class="text-sm">
                <span class="copyright-text color-gray">
                  {{ $t(`footer1`) }}
                  <br />
                  {{ $t(`footer2`) }}
                  <br />
                  {{ $t(`footer3`) }}
                </span>
              </VListItem>
            </VCol>
          </VRow>
        </VContainer>
      </VSheet>
    </transition>
  </div>
</template>
<script>
import { VRow, VCol } from 'vuetify/lib';
export default {
  name: 'TheFooter',
  data: () => ({ hasScrolled: false }),
  components: {
    VRow,
    VCol,
  },
  methods: {
    onScroll() {
      this.hasScrolled = true;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_the-footer';
</style>
