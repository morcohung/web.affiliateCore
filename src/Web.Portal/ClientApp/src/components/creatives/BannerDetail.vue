<template>
  <VDialog
    fullscreen
    v-model="isBannerDetailVisible"
    content-class="banner-detail"
  >
    <VCard class="rounded-0 main-content" color="#e5e5e5">
      <div class="d-flex flex-column flex-md-row fill-height">
        <VSpacer>
          <VBtn icon class="close" @click.stop="showBannerDetail">
            <span class="betfont icon-stick-arrow-left"></span>
          </VBtn>
          <div>
            <PinchZoom
              backgroundColor="rgba(255,255,255,0)"
              disableZoomControl="never"
              overflow="visible"
            >
              <img :src="collateral.PreviewUrl" />
            </PinchZoom>
          </div>
        </VSpacer>
        <div
          class="banner-info py-4 py-md-0"
          :class="{
            mobile: $vuetify.breakpoint.smAndDown,
            tablet: $vuetify.breakpoint.mdOnly,
            desktop: $vuetify.breakpoint.lgAndUp,
          }"
        >
          <div class="d-none d-md-block">
            <VAppBar height="auto" flat absolute color="transparent">
              <VSpacer class="font-weight-bold">
                <h2 class="text-xl">{{$t(`info`)}}</h2>
              </VSpacer>
            </VAppBar>
            <div class="v-app-bar"></div>
            <VDivider></VDivider>
          </div>
          <div
            class="d-block d-sm-flex d-md-block flex-sm-row-reverse banner-info-content"
          >
            <template>
              <VCard
                flat
                :outlined="$vuetify.breakpoint.mdOnly"
                class="rounded-lg "
                :class="{ 'ma-4 spacer': $vuetify.breakpoint.mdOnly }"
              >
                <VList>
                  <VListItem class="px-8">
                    <h3 class="text-xs text--secondary font-weight-medium">
                      {{$t(`size`)}}
                    </h3>
                    <VSpacer></VSpacer>
                    <h4
                      class="text-right text-sm text-primary font-weight-medium"
                    >
                      {{ collateral.SizeCode }}
                    </h4>
                  </VListItem>
                  <VDivider></VDivider>
                  <VListItem class="px-8">
                    <h3 class="text-xs text--secondary font-weight-medium">
                      {{$t(`language`)}}
                    </h3>
                    <VSpacer></VSpacer>
                    <h4
                      class="text-right text-sm text-primary font-weight-medium"
                    >
                      {{ collateral.LangDescr }}
                    </h4>
                  </VListItem>
                  <VDivider></VDivider>
                  <VListItem class="px-8">
                    <h3 class="text-xs text--secondary font-weight-medium">
                      {{$t(`classification`)}}
                    </h3>
                    <VSpacer></VSpacer>
                    <h4
                      class="text-right text-sm text-primary font-weight-medium"
                    >
                      {{ collateral.Classification }}
                    </h4>
                  </VListItem>
                  <VDivider></VDivider>
                  <VListItem class="px-8">
                    <h3 class="text-xs text--secondary font-weight-medium">
                      {{$t(`date.add`)}}
                    </h3>
                    <VSpacer></VSpacer>
                    <h4
                      class="text-right text-sm text-primary font-weight-medium"
                    >
                     {{ collateral.EffectiveDate }}
                    </h4>
                  </VListItem>
                  <VDivider></VDivider>
                </VList>
              </VCard>
            </template>
            <div :class="{ spacer: $vuetify.breakpoint.mdOnly }">
              <template>
                <ValidationObserver v-slot="v" ref="form">
                  <VCardText class="px-8 pb-0">
                    <ValidationProvider
                      name="bannerName"
                      rules="required"
                      v-slot="{ invalid }"
                    >
                      <VTextField
                        :filled="!showBannerScript"
                        label="Name"
                        v-model="bannerName"
                        hide-details="auto"
                        :class="{ 'pre-filled': bannerName }"
                      ></VTextField>
                      <span v-if="invalid" style="color:red;">
                        {{ $t(`jquery.validator.required`) }}
                      </span>
                    </ValidationProvider>
                  </VCardText>
                  <VCardActions>
                    <VSpacer></VSpacer>
                    <VBtn
                      class="mt-2"
                      color="primary"
                      min-width="10.375rem"
                      depressed
                      :disabled="
                        v.invalid === true || showBannerScript === true
                      "
                      @click.stop="onGenerateCode()"
                    >
                      {{$t(`generate.code`)}}
                    </VBtn>
                    <VSpacer></VSpacer>
                  </VCardActions>
                </ValidationObserver>
              </template>
              <template v-if="showBannerScript">
                <VCard color="#f1f1f1" class="rounded-lg ma-8" flat>
                  <VCardText>{{ this.MarketingScript.Script }}</VCardText>
                </VCard>
                <VCardActions>
                  <VSpacer></VSpacer>
                  <VBtn color="primary" min-width="10.375rem" depressed @click.stop="copyToClipboard">
                    {{$t(`copy`)}}
                  </VBtn>
                  <VSpacer></VSpacer>
                </VCardActions>
              </template>
            </div>
          </div>
        </div>
      </div>
    </VCard>
  </VDialog>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { VNavigationDrawer } from 'vuetify/lib';
import PinchZoom from 'vue-pinch-zoom';
export default {
  data: () => ({
    bannerName: undefined,
    showBannerScript: false,
  }),
  props: {
    isBannerDetailVisible: { required: true, default: false },
    collateral: {
      Id: '',
      PreviewUrl: '',
      Classification: '',
      TypeDescr: '',
      SizeCode: '',
      LangDescr: '',
      EffectiveDate: '',
    },
  },
  components: {
    VNavigationDrawer,
    PinchZoom,
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    ...mapState('Marketing', ['MarketingScript']),
  },
  methods: {
    ...mapActions('Marketing', ['fetchScript', 'addScript']),
    showBannerDetail() {
      this.$emit('showBannerDetail', false, this.collateral);
    },
    onGenerateCode() {
      const _addScript = {
        Id: this.collateral.Id,
        Name: this.bannerName,
      };
      this.addScript(_addScript).then((result) => {
        if (result.Status === 0) {
          this.showBannerScript = true;
          this.fetchScript(result.Id);
        }
      });
    },
	copyToClipboard() {
      navigator.clipboard.writeText(this.MarketingScript.Script);
    }
  },
};
</script>
<style lang="scss">
@import '../../assets/scss/04_templates/_banner-detail';
</style>
