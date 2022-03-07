<template>
  <VCard class="monthly-stats rounded-lg">
    <VCardText>
      <VRow class="align-start">
        <VCol cols="4" sm="3" lg="3">
          <h2 class="text--primary text-md">
            <span>{{Monthly.Months}}</span>
          </h2>
        </VCol>
        <VCol cols="8" sm="4" lg="3" class=" text-right pr-sm-8 pr-md-10">
          <h4 class="text-sm ">
            <span class="text--secondary mr-3">{{AccountBalance.Currency}}</span
            ><span class="text--primary">{{Monthly.CommissionBalance | balanceCommaFormat}}</span>
          </h4>
          <h3 class="text-xxs">{{$t(`commission.balance`)}}</h3>
        </VCol>
        <VDivider class="d-none d-sm-block my-4" vertical></VDivider>
        <VCol lg="2" class="text-left text-md-center">
          <h4 class="text-sm text--primary">{{Monthly.Actives | balanceCommaFormat}}</h4>
          <h3 class="text-xxs">{{$t(`actives`)}}</h3>
        </VCol>
        <VDivider class="d-block my-4" vertical></VDivider>
        <VCol lg="2" class="text-center">
          <h4 class="text-sm text--primary">{{Monthly.SignUps | balanceCommaFormat}}</h4>
          <h3 class="text-xxs">{{$t(`signUps`)}}</h3>
        </VCol>
        <VDivider class="d-block my-4" vertical></VDivider>
        <VCol lg="2" class="text-right text-md-center">
          <h4 class="text-sm text--primary">{{Monthly.NewDeposits | balanceCommaFormat}}</h4>
          <h3 class="text-xxs">{{$t(`deposits`)}}</h3>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
<script>
import { VRow, VCol, VDivider, VCardText, VCard } from 'vuetify/lib';
import { mapState } from 'vuex';
import balanceCommaFormat from '@/filters/balanceCommaFormat';
export default {
  filters: { balanceCommaFormat },  
  name: 'MonthlyStats',
  data: () => ({ }),
  components: {
    VRow,
    VCol,
    VDivider,
    VCardText,
    VCard
  },
  props: {
    Monthly: {
      type: Object,
      default: () => ({}),
    },
  }, 
  computed: {    
    ...mapState('Account', ['AccountBalance'])   
  }
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_monthly-stats';
</style>
