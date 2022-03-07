<template>
  <div class="summary-report-monthly pb-2 pb-md-0">
    <VCard
      class="rounded-lg"
      :color="$vuetify.breakpoint.lgAndUp ? 'white' : 'transparent'"
      :outlined="$vuetify.breakpoint.mdAndUp"
    >
      <VCard
        class="collateral-performance mb-2 mb-md-0"
        :class="
          $vuetify.breakpoint.lgAndUp
            ? 'rounded-t-lg rounded-b-0'
            : 'rounded-lg'
        "
        flat
        :outlined="$vuetify.breakpoint.mdAndDown"
        :elevation="$vuetify.breakpoint.mdAndDown ? 4 : 0"
        :ripple="$vuetify.breakpoint.mdAndDown"
        @click.stop="
          $vuetify.breakpoint.mdAndDown
            ? goToLink('collateral-performance')
            : null
        "
      >
        <VCardText>
          <VRow class="align-center">
            <VCol cols="12" sm="6" class="pb-0 pb-sm-4">
              <h2 class="text-md text--primary">
                {{$t(`collateral.performance`)}}
              </h2>
            </VCol>
            <VCol
              sm="2"
              class="d-flex flex-column align-start align-sm-end pl-4 pr-sm-6"
            >
              <h3 class="text-sm text--primary">
                {{ summaryModel.data.CollateralPerformance.Clicks | balanceCommaFormat }}
              </h3>
              <h4 class="text-xxs">{{ $t(`clicks`) }}</h4>
            </VCol>
            <VDivider vertical class="my-3"></VDivider>
            <VCol
              sm="2"
              class="d-flex flex-column align-start align-sm-end pl-4 pr-sm-6"
            >
              <h3 class="text-sm text--primary">
                {{ summaryModel.data.CollateralPerformance.SignUps | balanceCommaFormat }}
              </h3>
              <h4 class="text-xxs">{{ $t(`signUps`) }}</h4>
            </VCol>
            <VDivider vertical class="my-3"></VDivider>
            <VCol
              sm="2"
              class="d-flex flex-column align-start align-sm-end pl-4 pr-sm-6"
            >
              <h3 class="text-sm text--primary">
                {{ summaryModel.data.CollateralPerformance.Deposits | balanceCommaFormat }}
              </h3>
              <h4 class="text-xxs">{{ $t(`deposits`) }}</h4>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
      <VDivider class="d-none d-md-block"></VDivider>
      <VCard
        class="mb-2 mb-md-0"
        :class="$vuetify.breakpoint.lgAndUp ? 'rounded-0' : 'rounded-lg'"
        flat
        :outlined="$vuetify.breakpoint.mdAndDown"
        :elevation="$vuetify.breakpoint.mdAndDown ? 4 : 0"
        :ripple="$vuetify.breakpoint.mdAndDown"
        @click.stop="
          $vuetify.breakpoint.mdAndDown ? goToLink('referrals') : null
        "
      >
        <VCardText>
          <VRow class="align-center">
            <VCol cols="12" sm="6" class="pb-0 pb-sm-4">
              <h2 class="text-md text--primary">
                {{$t(`referrals`)}}
              </h2>
            </VCol>
            <VCol
              class="d-flex flex-column align-start align-sm-end pl-4 pr-sm-6"
            >
              <h3 class="text-sm text--primary">
                {{ summaryModel.data.Refferrals.Completed | balanceCommaFormat }}
              </h3>
              <h4 class="text-xxs">{{ $t(`fo.member.status.completed`) }}</h4>
            </VCol>
            <VDivider vertical class="my-3"></VDivider>
            <VCol
              class="d-flex flex-column align-start align-sm-end pl-4 pr-sm-6"
            >
              <h3 class="text-sm text--primary">
                {{ summaryModel.data.Refferrals.Interest | balanceCommaFormat }}
              </h3>
              <h4 class="text-xxs">{{ $t(`fo.member.status.interest`) }}</h4>
            </VCol>
            <VDivider vertical class="my-3"></VDivider>
            <VCol
              class="d-flex flex-column align-start align-sm-end pl-4 pr-sm-6"
            >
              <h3 class="text-sm text--primary">
                {{ summaryModel.data.Refferrals.Deposits | balanceCommaFormat }}
              </h3>
              <h4 class="text-xxs">{{ $t(`deposits`) }}</h4>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
      <VDivider class="d-none d-md-block"></VDivider>
      <VCard
        class="mb-2 mb-md-0"
        :class="$vuetify.breakpoint.lgAndUp ? 'rounded-0' : 'rounded-lg'"
        flat
        :outlined="$vuetify.breakpoint.mdAndDown"
        :elevation="$vuetify.breakpoint.mdAndDown ? 4 : 0"
        :ripple="$vuetify.breakpoint.mdAndDown"
        @click.stop="$vuetify.breakpoint.mdAndDown ? goToLink('GPR') : null"
      >
        <VCardText v-if="summaryModel.data.WinlossProduct.length != 0">
          <VRow
            class="align-center"
            v-for="(item, index) in summaryModel.data.WinlossProduct"
            v-bind:key="index"
          >
            <VCol cols="12" sm="4" class="pb-0 pb-sm-4">
              <h2 class="text-md text--primary">
                {{$t(`gross.product.revenue`)}}
              </h2>
            </VCol>
            <VCol
              cols="6"
              sm="4"
              class="d-flex flex-column align-start align-sm-end pl-4 pr-sm-6"
            >
              <h3 class="text-sm">
                <span class="text--secondary mr-2">{{
                  summaryModel.data.Currency
                }}</span>
                <span class="text--primary">{{ item.TotalGrossRevenue | balanceCommaFormat }}</span>
              </h3>
              <h4 class="text-xxs">{{ $t(`total.gross.revenue`) }}</h4>
            </VCol>
            <VDivider vertical class="my-3"></VDivider>
            <VCol
              cols="6"
              sm="4"
              class="d-flex flex-column align-start align-sm-end pl-4 pr-sm-6"
            >
              <h3 class="text-sm">
                <span class="text--secondary mr-2">{{
                  summaryModel.data.Currency
                }}</span>
                <span class="text--primary">{{ item.TotalNetRevenue | balanceCommaFormat }}</span>
              </h3>
              <h4 class="text-xxs">{{$t(`total.net.revenue`)}}</h4>
            </VCol>
          </VRow>
        </VCardText>
        <VCardText v-if="summaryModel.data.WinlossProduct.length === 0">
          <VRow class="align-center">
            <VCol cols="12" sm="4" class="pb-0 pb-sm-4">
              <h2 class="text-md text--primary">
                {{$t(`gross.product.revenue`)}}
              </h2>
            </VCol>
            <VCol
              cols="6"
              sm="4"
              class="d-flex flex-column align-start align-sm-end pl-4 pr-sm-6"
            >
              <h3 class="text-sm">
                <span class="text--secondary mr-2">{{
                  summaryModel.data.Currency
                }}</span>
                <span class="text--primary">0.00</span>
              </h3>
              <h4 class="text-xxs">{{ $t(`total.gross.revenue`) }}</h4>
            </VCol>
            <VDivider vertical class="my-3"></VDivider>
            <VCol
              cols="6"
              sm="4"
              class="d-flex flex-column align-start align-sm-end pl-4 pr-sm-6"
            >
              <h3 class="text-sm">
                <span class="text--secondary mr-2">{{
                  summaryModel.data.Currency
                }}</span>
                <span class="text--primary">0.00</span>
              </h3>
              <h4 class="text-xxs">{{$t(`total.net.revenue`)}}</h4>
            </VCol>
          </VRow>
        </VCardText>        
      </VCard>
      <VDivider class="d-none d-md-block"></VDivider>
      <VCard
        class="mb-2 mb-md-0"
        :class="$vuetify.breakpoint.lgAndUp ? 'rounded-0' : 'rounded-lg'"
        flat
        :outlined="$vuetify.breakpoint.mdAndDown"
        :elevation="$vuetify.breakpoint.mdAndDown ? 4 : 0"
        :ripple="$vuetify.breakpoint.mdAndDown"
        @click.stop="
          $vuetify.breakpoint.mdAndDown ? goToLink('monthly-commissions') : null
        "
      >
        <VCardText v-if="summaryModel.data.MonthlyCommissions.length != 0">
          <VRow
            class="align-center"
            v-for="(item, index) in summaryModel.data.MonthlyCommissions"
            v-bind:key="index"
          >            
            <VCol cols="12" sm="4" class="pb-0 pb-sm-4">
              <h2 class="text-md text--primary">
                {{$t(`monthly.commissions`)}}
              </h2>
            </VCol>
            <VCol
              cols="6"
              sm="4"
              class="d-flex flex-column align-start align-sm-end pl-4 pr-sm-6"
            >
              <h3 class="text-sm">
                <span class="text--secondary mr-2">{{
                  summaryModel.data.Currency
                }}</span>
                <span class="text--primary">{{ item.CommissionBalance | balanceCommaFormat }}</span>
              </h3>
              <h4 class="text-xxs">{{ $t(`total.commission.balance`) }}</h4>
            </VCol>
            <VDivider vertical class="my-3"></VDivider>
            <VCol
              cols="6"
              sm="4"
              class="d-flex flex-column align-start align-sm-end pl-4 pr-sm-6"
            >
              <h3 class="text-sm">
                <span class="text--secondary mr-2">{{
                  summaryModel.data.Currency
                }}</span>
                <span class="text--primary">{{
                  item.TotalCommissionEarned | balanceCommaFormat
                }}</span>
              </h3>
              <h4 class="text-xxs">{{ $t(`total.commission.earned`) }}</h4>
            </VCol>
          </VRow>
        </VCardText>
        <VCardText v-if="summaryModel.data.MonthlyCommissions.length === 0">
          <VRow
            class="align-center"      
          >            
            <VCol cols="12" sm="4" class="pb-0 pb-sm-4">
              <h2 class="text-md text--primary">
                {{$t(`monthly.commissions`)}}
              </h2>
            </VCol>
            <VCol
              cols="6"
              sm="4"
              class="d-flex flex-column align-start align-sm-end pl-4 pr-sm-6"
            >
              <h3 class="text-sm">
                <span class="text--secondary mr-2">{{
                  summaryModel.data.Currency
                }}</span>
                <span class="text--primary">0.00</span>
              </h3>
              <h4 class="text-xxs">{{ $t(`total.commission.balance`) }}</h4>
            </VCol>
            <VDivider vertical class="my-3"></VDivider>
            <VCol
              cols="6"
              sm="4"
              class="d-flex flex-column align-start align-sm-end pl-4 pr-sm-6"
            >
              <h3 class="text-sm">
                <span class="text--secondary mr-2">{{
                  summaryModel.data.Currency
                }}</span>
                <span class="text--primary">0.00</span>
              </h3>
              <h4 class="text-xxs">{{ $t(`total.commission.earned`) }}</h4>
            </VCol>
          </VRow>
        </VCardText>        
      </VCard>
      <VDivider class="d-none d-md-block"></VDivider>
      <VCard
        :class="
          $vuetify.breakpoint.lgAndUp
            ? 'rounded-t-0 rounded-b-lg'
            : 'rounded-lg'
        "
        flat
        :outlined="$vuetify.breakpoint.mdAndDown"
        :elevation="$vuetify.breakpoint.mdAndDown ? 4 : 0"
        :ripple="$vuetify.breakpoint.mdAndDown"
        @click.stop="
          $vuetify.breakpoint.mdAndDown ? goToLink('commission-payout') : null
        "
      >
        <VCardText>
          <VRow class="align-center">
            <VCol cols="12" sm="6" class="pb-0 pb-sm-4">
              <h2 class="text-md text--primary">
                {{$t(`commission.payout`)}}
              </h2>
            </VCol>
            <VCol
              class="d-flex flex-column align-start align-sm-end pl-4 pr-sm-6"
            >
              <h3 class="text-sm">
                <span class="text--secondary mr-2">{{
                  summaryModel.data.Currency
                }}</span>
                <span class="text--primary">{{
                  checkPayoutAmount(summaryModel.data.CommissionPayout) | balanceCommaFormat
                }}</span>               
              </h3>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCard>   
  </div>
</template>
<style lang="scss" scoped></style>
<script>
import balanceCommaFormat from '@/filters/balanceCommaFormat';
export default {
  filters: { balanceCommaFormat },  
  data: () => ({ }),
  props: {
    summaryModel: {
      type: Object,
      default: () => ({}),      
    },
  },
  methods: {
    goToLink(link) {      
      this.$emit('goToLink', link);
    },
    checkPayoutAmount(commissionPayout){
      if(commissionPayout != null){ 
          return commissionPayout.Amount;
      }else{
          return 0;
      }      
    }
  } 
};
</script>
