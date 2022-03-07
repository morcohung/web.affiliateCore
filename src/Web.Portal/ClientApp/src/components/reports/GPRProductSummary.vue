<template>
  <VCard
    class="grp-product-summary rounded-lg"
    :elevation="$vuetify.breakpoint.mdAndDown ? 4 : 0"
    @click.stop="goToDetail(product, yearMonth, settlementType, parentProduct)"
    outlined
  >
    <VCardText>
      <VRow class="align-center">
        <VCol>
          <h2 class="text-md text--primary">
            {{ product.DisplayName }}
          </h2>
        </VCol>
        <VCol sm="6" class="d-flex flex-column align-end  pl-4 pr-sm-6">
          <h3 class="text-sm text--primary">
            <span class="text--secondary">{{ product.Currency }}</span>
            {{ formatNumber(product.GrossRevenue) }}
          </h3>
          <h4 class="text-xxs">{{ $t(`total.gross.revenue`) }}</h4>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
<script>
import { formatNumber } from '@/utils/numberFormat';
export default {
  data: () => ({}),
  props: {
    yearMonth: { required: true },
    settlementType: { required: true },
    parentProduct: {
      type: Object,
      default: () => ({}),
    },
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {},
  methods: {
    goToDetail(product, yearMonth, settlementType, parentProduct) {
      this.$emit(
        'goToDetail',
        product,
        yearMonth,
        settlementType,
        parentProduct
      );
    },
    formatNumber(number) {
      return formatNumber(number);
    },
  },
};
</script>
