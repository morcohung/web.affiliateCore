<template>
  <VList class="pa-0">
    <template v-for="history in TransactionHistoryModel.HistoryList">
      <VListItem class="px-8">
        <VRow class="align-center py-4">
          <VCol class="text-sm">{{ history.TransactionDate }}</VCol>
          <VCol class="d-flex justify-end">
            <div class="font-weight-bold">
              <div class="text-sm">
                <span class="text--secondary">{{ history.Currency }}</span>
                <span class="text--primary">
                  {{ formatNumber(history.Amount) }}
                </span>
              </div>
              <div class="text-xs text--secondary">
                {{ history.PaymentProvider }}
              </div>
            </div>
          </VCol>
        </VRow>
      </VListItem>
      <VDivider></VDivider>
    </template>
  </VList>
</template>
<script>
import { formatNumber } from '@/utils/numberFormat';

export default {
  data: () => ({}),
  props: {
    TransactionHistoryModel: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    formatNumber(number) {
      return formatNumber(number);
    },
  },
};
</script>
