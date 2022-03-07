<template>
  <div>
    <VList class="pa-0" v-if="Product.ChildProductList.length > 0">
      <VListItem class=" px-7 font-weight-black" :selectable="true">
        {{ Product.DisplayName }}
      </VListItem>
      <VDivider></VDivider>
      <template v-for="(product, index) in Product.ChildProductList">
        <VListItem
          class=" px-7"
          :selectable="true"
          @click.stop="showProductDetail(product.ProductCode)"
        >
          {{ product.DisplayName }}

          <VSpacer class="text-right">
            <h3 class="text-md">
              <span class="text--secondary">{{ product.Currency }}</span>
              <span class="text--primary">
                {{ formatNumber(product.GrossRevenue) }}
              </span>
            </h3>
            <h4 class="text-xs text--disabled">
              {{ $t(`stake`) }}: <span>{{ product.Currency }}</span>
              <span>
                {{ formatNumber(product.Stake) }}
              </span>
            </h4>
          </VSpacer>
        </VListItem>
        <VDivider></VDivider>
      </template>
    </VList>

    <VList class="pa-0" v-if="Product.ChildProductList.length == 0">
      <VListItem>
        <VSpacer>
          <div :class="info.parentProductName ? 'text-xxs' : 'text-md'">
            {{ info.parentProductName }}
          </div>
          <div>{{ Product.DisplayName }}</div>
        </VSpacer>
      </VListItem>
      <VDivider></VDivider>
      <VItemGroup>
        <template>
          <div
            v-for="(item, index) in GPRMemberDetailModel.MemberDetailList"
            :key="index"
          >
            <VListItem>
              <VRow class="align-center">
                <VCol cols="5">
                  <div class="font-weight-bold text--primary">
                    {{ item.TransactionDate }}
                  </div>
                </VCol>
                <VCol cols="7">
                  <div class="text-md text-right">
                    <span class="text--secondary mr-2">{{
                      item.Currency
                    }}</span>
                    <span class="text--primary">{{
                      formatNumber(item.GrossRevenue)
                    }}</span>
                  </div>
                  <div class="text-xxs text-right">
                    {{ $t(`stake`) }}: {{ item.Currency }}
                    {{ formatNumber(item.Stake) }}
                  </div>
                </VCol>
              </VRow>
            </VListItem>
            <VDivider class="my-2"></VDivider>
          </div>
        </template>
      </VItemGroup>
    </VList>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import { formatNumber } from '@/utils/numberFormat';

export default {
  data: () => ({
    GPRMemberDetailModel: {
      MemberDetailList: [],
    },
  }),
  props: {
    info: {
      type: Object,
      default: () => {},
    },
    Product: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    Product: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (this.Product.ChildProductList.length == 0) {
          this.getGPRMemberDetail();
        }
      },
    },
  },
  computed: {
    ...mapState('Report', ['GPRMemberDetail']),
  },
  methods: {
    ...mapActions('Report', ['fetchGPRMemberDetail']),
    getGPRMemberDetail() {
      const filter = {
        YearMonth: this.info.yearMonth,
        SettlementType: this.info.settlementType,
        ProductCode: this.Product.ProductCode,
        MemberCode: this.info.memberCode,
      };
      Promise.all([this.fetchGPRMemberDetail(filter)]).then(() => {
        if (this.GPRMemberDetail.data != null) {
          this.GPRMemberDetailModel = this.GPRMemberDetail.data;
        }
      });
    },
    showProductDetail(productCode) {
      this.$emit('gotoGPRChildDetail', productCode);
    },
    formatNumber(number) {
      return formatNumber(number);
    },
  },
};
</script>
