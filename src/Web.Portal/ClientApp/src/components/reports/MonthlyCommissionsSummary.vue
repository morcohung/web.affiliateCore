<template>
  <div class="gpr-monthly-summary pb-2 pb-md-0">
    <VCard
      v-for="(months, $index) in MonthlyCommissionSummary.MonthlyCommissions"
      :key="$index"
      class="rounded-lg mb-4"
      :elevation="$vuetify.breakpoint.mdAndDown ? 4 : 0"
      :ripple="$vuetify.breakpoint.mdAndDown"
      @click.stop="
        $vuetify.breakpoint.mdAndDown ? switchTabs($index, months.MonthlyName) : null
      "
      outlined
    >  
      <VCardText>
        <VRow class="align-center">
          <VCol>
            <h2 class="text-md text--primary">
               {{ months.MonthlyName }}
            </h2>
          </VCol>
          <VCol class="d-flex justify-center" cols="6" sm="4" md="3">
            <div>
              <h3 class="text-sm text--primary text-right">
                <span class="text--secondary">{{MonthlyCommissionSummary.Currency}}</span>
                {{ months.TotalCommissionBalance | balanceCommaFormat }}
              </h3>
              <h4 class="text-xxs text-right">{{$t(`total.commission.balance`)}}</h4>
            </div>
          </VCol>
          <VCol
            cols="3"
            sm="4"
            md="3"
            lg="6"
            class="d-none d-sm-flex rounded-lg"
            :class="MonthlyCommissionSummary.SettlementCycle === 1 ? 'half-month' : 'full-month'"
          >
            <VRow>
              <VCol
                class="d-flex "
                :class="MonthlyCommissionSummary.SettlementCycle === 1 ? 'justify-end' : 'justify-center'"
              >
                <div>
                  <h3 class="text-sm text--primary text-right ">
                    <span class="text--secondary">{{MonthlyCommissionSummary.Currency}}</span>
                    {{ months.ProductCommission + months.ChessGameCommission | balanceCommaFormat }}
                  </h3>
                  <h4 class="text-xxs text-right ">
                    {{$t(`total.commissions.earned`)}}
                  </h4>
                </div>
              </VCol>
              <div class="py-2 d-none d-lg-block">
                <VDivider vertical></VDivider>
              </div>

              <VCol class="d-none d-lg-flex justify-center" v-if="MonthlyCommissionSummary.SettlementCycle === 0"> 
                <div>
                  <h3 class="text-sm text--primary text-right">
                    <span class="text--secondary">{{MonthlyCommissionSummary.Currency}}</span>
                  {{ months.ProductCommission | balanceCommaFormat }}
                  </h3>
                  <h4 class="text-xxs text-right">
                    {{$t(`all.products.except.chess.game`)}}
                  </h4>
                </div>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
        <VRow class="mt-4" dense v-if="MonthlyCommissionSummary.SettlementCycle === 1">
          <VCol sm="6">
            <VCard
              class="rounded-lg"
              :color="$vuetify.breakpoint.mdAndUp ? '#f1f1f1' : 'transparent'"
              flat
            >
              <VCardText class="px-0 px-sm-4">
                <h4
                  class="text-xxs text-uppercase font-weight-medium d-none d-sm-block mb-4"
                >
                  {{$t(`first.half.monthly`)}}                  
                </h4>
                <VRow>
                  <VCol class="d-none d-sm-block">
                    <h3 class="text-sm text--primary">
                      <span class="text--secondary">{{MonthlyCommissionSummary.Currency}}</span>
                        {{ months.TotalCommissionHalfMonthFirst | balanceCommaFormat }}
                    </h3>
                    <h4 class="text-xxs">{{$t(`commission.balance`)}}</h4>
                  </VCol>
                  <VDivider vertical class="d-none d-sm-block my-3"></VDivider>
                  <VCol class="d-flex justify-start justify-sm-center">
                    <div>
                      <h3 class="text-sm text--primary">
                        <span class="text--secondary">{{MonthlyCommissionSummary.Currency}}</span>
                         {{ months.ProductCommissionHalfMonthFirst + months.ChessGameCommissionHalfMonthFirst | balanceCommaFormat }}
                      </h3>
                      <h4 class="d-none d-sm-block text-xxs">
                        {{$t(`commissions.earned`)}}
                      </h4>
                      <h4 class="d-block d-sm-none text-xxs">
                        {{$t(`first.half.monthly`)}}                  
                      </h4>
                    </div>
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>
          <VDivider vertical class="d-block d-sm-none my-3"></VDivider>
          <VCol sm="6">
            <VCard
              class="rounded-lg"
              :color="$vuetify.breakpoint.mdAndUp ? '#f1f1f1' : 'transparent'"
              flat
            >
              <VCardText>
                <h4
                  class="text-xxs text-uppercase font-weight-medium d-none d-sm-block mb-4"
                >
                  {{$t(`second.half.monthly`)}}
                </h4>
                <VRow>
                  <VCol class="d-none d-sm-block">
                    <h3 class="text-sm text--primary">
                      <span class="text--secondary">{{MonthlyCommissionSummary.Currency}}</span>
                      {{ months.TotalCommissionHalfMonthSecond | balanceCommaFormat }}
                    </h3>
                    <h4 class="text-xxs">{{$t(`commission.balance`)}}</h4>
                  </VCol>
                  <VDivider vertical class="d-none d-sm-block my-3"></VDivider>
                  <VCol class="d-flex  justify-start justify-sm-center">
                    <div>
                      <h3 class="text-sm text--primary">
                        <span class="text--secondary">{{MonthlyCommissionSummary.Currency}}</span>
                        {{ months.ProductCommissionHalfMonthSecond + months.ChessGameCommissionHalfMonthSecond | balanceCommaFormat }}
                      </h3>
                      <h4 class="d-none d-sm-block text-xxs">
                        {{$t(`commissions.earned`)}}
                      </h4>
                      <h4 class="d-block d-sm-none text-xxs">
                        {{$t(`second.half.monthly`)}}
                      </h4>
                    </div>
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import balanceCommaFormat from '@/filters/balanceCommaFormat';
export default {
  filters: { balanceCommaFormat }, 
  data: () => ({
    tab: null,
    // halfMonth: true, //need to set this to change some layout styles for half-month or full-month
  }),
  props: {
    tabID: { required: true },
    MonthlyCommissionSummary: {
      type: Object,
      default: () => ({}),
    },    
  },    
  methods: {   
    switchTabs(tabId, month) {   
      this.$emit('switchTabs', tabId + 1, month);
    },    
    getMonthDate(sequence){
      var dt = new Date();
      var year = dt.getFullYear();
      var month = dt.getMonth()- sequence;
      if(month==0){
          month = 12 ;
          year = year - 1;
      }
      if(month<10){
          month = '0'+ month ;
      }      
      var responseDate = year +'-'+ month +'-01 00:00:00'; 
      return responseDate
    }
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/06_overlaps/_v-tabs.scss';
.half-month {
  background: transparent;
}
.full-month {
  background: #f1f1f1;
  margin: 14px;
}
</style>
