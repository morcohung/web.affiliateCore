<template>
  <div>
    <VContainer>
      <h1 class="text-xxxl mb-8">Contact Us</h1>
      <VSheet color="transparent" class="mb-4">
        <div class="static-page--content">
          <p>
            {{$t(`contactUs.msg`)}}
          </p>
        </div>
        <VCard
          class="rounded-lg"
          :flat="$vuetify.breakpoint.smAndDown ? false : true"
          :color="$vuetify.breakpoint.smAndDown ? 'undefined' : 'transparent'"
        >
          <VRow dense>
            <VCol cols="12" sm="6">
              <VCard
                class="rounded-lg"
                :flat="$vuetify.breakpoint.smAndDown ? true : false"
                :color="
                  $vuetify.breakpoint.smAndDown ? 'transparent' : 'undefined'
                "
              >
                <VCardText class="d-flex align-center">
                  <div class="pa-3 pr-7 betfont icon-phone text-md"></div>
                  <div>
                    <h4 class="text-md">
                      <a
                        class="text-decoration-none text--primary"
                        href="tel:+852 5808 3608"
                        >+852 5808 3608</a
                      >
                    </h4>
                    <h3 class="text-sm text--disabled">{{$t(`asia`)}}</h3>
                  </div>
                </VCardText>
              </VCard>
            </VCol>
            <VDivider class="col mx-1 d-block d-sm-none"></VDivider>
            <VCol cols="12" sm="6">
              <VCard
                class="rounded-lg"
                :flat="$vuetify.breakpoint.smAndDown ? true : false"
                :color="
                  $vuetify.breakpoint.smAndDown ? 'transparent' : 'undefined'
                "
              >
                <VCardText class="d-flex align-center">
                  <div class="pa-3 pr-7 betfont icon-phone text-md"></div>
                  <div>
                    <h4 class="text-md">
                      <a
                        class="text-decoration-none text--primary"
                        href="tel:+44 20 3318 0702"
                        >+44 20 3318 0702</a
                      >
                    </h4>
                    <h3 class="text-sm text--disabled">{{$t(`asia`)}}</h3>
                  </div>
                </VCardText>
              </VCard>
            </VCol>
            <VDivider class="col mx-1 d-block d-sm-none"></VDivider>
            <VCol cols="12" sm="6">
              <VCard
                class="rounded-lg"
                :flat="$vuetify.breakpoint.smAndDown ? true : false"
                :color="
                  $vuetify.breakpoint.smAndDown ? 'transparent' : 'undefined'
                "
              >
                <VCardText class="d-flex align-center">
                  <div class="pa-3 pr-7 betfont icon-inbox text-md"></div>
                  <div>
                    <h4 class="text-md">
                      <a
                        class="text-decoration-none text--primary"
                        href="mailto:affiliates@188service.com"
                        >affiliates@188service.com</a
                      >
                    </h4>
                    <h3 class="text-sm text--disabled">{{$t(`email`)}}</h3>
                  </div>
                </VCardText>
              </VCard>
            </VCol>
            <VDivider class="col mx-1 d-block d-sm-none"></VDivider>
            <VCol cols="12" sm="6">
              <VCard
                class="rounded-lg"
                :flat="$vuetify.breakpoint.smAndDown ? true : false"
                :color="
                  $vuetify.breakpoint.smAndDown ? 'transparent' : 'undefined'
                "
              >
                <VCardText class="d-flex align-center">
                  <div class="pa-3 pr-7 betfont icon-skype text-md"></div>
                  <div>
                    <h4 class="text-md">
                      <a
                        class="text-decoration-none text--primary"
                        href="skype:affiliates_188?chat"
                        >affiliates_188</a
                      >
                    </h4>
                    <h3 class="text-sm text--disabled">{{$t(`chat.tool.skype`)}}</h3>
                  </div>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </VCard>
      </VSheet>
    </VContainer>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import SubCategoryMenu from '@/components/staticpages/SubCategoryMenu';

export default Vue.extend({
  name: 'StaticContentTest',
  data() {
    return {
      language: '',
      resourceName: '',
      categoryItems: [
        {
          title: 'Why do Players Choose 188BET?',
          longText:
            '188BET will pay the Affiliate a percentage of the combined month Net Winnings for play on Sportsbook, Casino, Live Casino, Lotto, Mahjong and Virtual Sports generated as a result of a direct referral by the Affiliate. Net winning is: Sportsbook, Casino, Live Casino, Lotto, Mahjong and Virtual Sports gross profits from bets made from customers’ losses less monies paid out to customers as a result of fraud, charge-backs, taxes, banking fees, platform fees, bonuses and other incentives offered to the customer. Referral’s fees and commissions are based upon our good faith calculation, based on our statistics and tracking methods.',
        },
        {
          title: 'Why do Affiliates Choose 188BET?',
          longText:
            '188BET will pay the Affiliate a percentage of the combined month Net Winnings for play on Sportsbook, Casino, Live Casino, Lotto, Mahjong and Virtual Sports generated as a result of a direct referral by the Affiliate. Net winning is: Sportsbook, Casino, Live Casino, Lotto, Mahjong and Virtual Sports gross profits from bets made from customers’ losses less monies paid out to customers as a result of fraud, charge-backs, taxes, banking fees, platform fees, bonuses and other incentives offered to the customer. Referral’s fees and commissions are based upon our good faith calculation, based on our statistics and tracking methods.',
        },
        {
          title: 'What can I earn?',
          longText:
            '188BET will pay the Affiliate a percentage of the combined month Net Winnings for play on Sportsbook, Casino, Live Casino, Lotto, Mahjong and Virtual Sports generated as a result of a direct referral by the Affiliate. Net winning is: Sportsbook, Casino, Live Casino, Lotto, Mahjong and Virtual Sports gross profits from bets made from customers’ losses less monies paid out to customers as a result of fraud, charge-backs, taxes, banking fees, platform fees, bonuses and other incentives offered to the customer. Referral’s fees and commissions are based upon our good faith calculation, based on our statistics and tracking methods.',
        },
      ],
      StaticContentModel:{
        Language: '',
        ResourceName: '',        
      }
    };
  },
  components: {
    SubCategoryMenu,
  },
  metaInfo() {
    return this.StaticContent.metaInfo;
  },
  computed: {
    ...mapState('Web', ['StaticContent']),
  },
  //need confirm best practice
  watch: {
    $route: 'getStaticContent',
  },
  created() {
    this.getStaticContent();
  },
  methods: {
    ...mapActions('Web', ['fetchStaticContent']),
    getStaticContent() {
      this.language = this.$route.params.lang;
      this.resourceName = this.$route.params.viewName ?? 'Home';

      this.StaticContentModel.Language = language;
      this.StaticContentModel.ResourceName = resourceName;

      this.fetchStaticContent(_content);
    },
  },
});
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_contactus';
</style>
