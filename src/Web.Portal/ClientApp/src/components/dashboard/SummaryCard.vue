<template>
  <VCard class="summary rounded-lg" color="gray" flat>
    <VCardText>
      <VRow dense class="align-center">
        <VCol lg="2" xl="4">
          <h2 class="text--primary text-md">{{$t(`summary`)}}</h2>
          <h3 class="text-xxs">{{$t(`three.months`)}}</h3>
        </VCol>
        <VCol lg="3" class="text-right text-lg-center">
          <h3 class="text-sm">
            <span class="text--secondary mr-1">{{AccountBalance.Currency}}</span
            ><span class="text--primary">{{SummaryCard.TotalCommissionBalance | formatNumber}}</span>
          </h3>
          <h2 class="text-xxs">{{$t(`total.commission.balance`)}}</h2>
        </VCol>
        <VCol class="d-none d-lg-flex">
          <VRow dense>
            <VDivider class="d-none d-lg-block" vertical></VDivider>
            <VCol lg="4" class="d-none d-lg-block text-center">
              <h3 class="text--primary text-sm">{{SummaryCard.TotalActives}}</h3>
              <h2 class="text-xxs">{{$t(`total.actives`)}}</h2></VCol
            >
            <VDivider class="d-none d-lg-block" vertical></VDivider>
            <VCol lg="4" class="d-none d-lg-block text-center">
              <h3 class="text--primary  text-sm">{{SummaryCard.TotalNewDeposits}}</h3>
              <h2 class="text-xxs">{{$t(`total.new.deposits`)}}</h2></VCol
            >
            <VDivider class="d-none d-lg-block" vertical></VDivider>
            <VCol lg="4" class="d-none d-lg-block text-center">
              <h3 class="text--primary  text-sm">{{SummaryCard.TotalSignUps}}</h3>
              <h2 class="text-xxs">{{$t(`total.sign.ups`)}}</h2></VCol
            >
          </VRow>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
<script>
import { mapState } from 'vuex';
import {
  VCardText,
  VCard,
  VRow,
  VDivider,
  VCol
} from 'vuetify/lib';
import { formatNumber } from '@/utils/numberFormat';
export default {
  name: 'SummaryCard',
  filters: { formatNumber },    
  data: () => ({}),  
  components: {
  VCardText,
  VCard,
  VRow,
  VDivider,
  VCol
  },
  props: {
    SummaryCard: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {    
    ...mapState('Account', ['AccountBalance'])   
  } 
}  
</script>
<style lang="scss" scoped>
.summary {
  * {
    line-height: 1.2em;
  }
  &.gray {
    background-color: #f7f7f7;
  }
}
</style>
