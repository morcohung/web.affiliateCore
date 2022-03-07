<template>
  <div>
    <SubPageHeader
      @goBack="goBack"     
      :headingTitle="headingTitle"
      :headingSubTitle="headingSubTitle"
      :features="features"      
    ></SubPageHeader>
    <VSpacer class="mb-4"></VSpacer>
    <component
      :is="$vuetify.breakpoint.mdAndUp ? 'VCard' : 'div'"
      class="rounded-lg"
    >
      <div v-for="item in CommissionPayout.data.CommissionPayouts" 
           :key="item.key">
        <VCard
          class="rounded-lg"
          :class="{ 'mb-2': $vuetify.breakpoint.smAndDown }"
          flat
          :outlined="$vuetify.breakpoint.smAndDown"
          @click.stop="showDetails(true,item.Id,item.CommssnRecvngId)"
          :elevation="$vuetify.breakpoint.smAndDown ? '4' : '0'"
        >
          <VCardText>
            <VRow class="align-center">
              <VCol
                order="3"
                order-sm="1"
                cols="6"
                sm="3"
                lg="4"
                :class="{ 'pt-0': $vuetify.breakpoint.smAndDown }"
              >
                <h3 class="text-sm">
                  <span class="text--secondary">{{item.Currency}}</span>
                  <span class="text--primary">
                    {{ item.Amount | balanceCommaFormat }}
                  </span>
                </h3>
              </VCol>
              <VCol
                order="3"
                order-sm="1"
                lg="2"
                class="d-none d-lg-flex justify-center"
              >
                <div>
                  <h3
                    class="text-sm text-sm-right text-left text--primary font-weight-medium"
                    :class="
                      $vuetify.breakpoint.smAndDown ? 'text-xs' : 'text-sm'
                    "
                  >
                    {{item.FieldValue}}
                  </h3>
                  <h4 class="text-right text-xxs d-none d-sm-block">{{$t(`bank`)}}</h4>
                </div>
              </VCol>
              <VDivider
                vertical
                class="d-none d-lg-block order-2 my-3"
              ></VDivider>
              <VCol
                order="1"
                order-sm="2"
                cols="6"
                sm="3"
                lg="2"
                class="d-flex justify-md-center"
                :class="{ 'pb-0': $vuetify.breakpoint.smAndDown }"
              >
                <div>
                  <h3
                    class="text-sm text-sm-right text-left text--primary font-weight-medium"
                    :class="
                      $vuetify.breakpoint.smAndDown ? 'text-xs' : 'text-sm'
                    "
                  >
                    {{ $t(item.FieldName)}}
                  </h3>
                  <h4 class="text-right text-xxs d-none d-sm-block">{{$t(`method`)}}</h4>
                </div>
              </VCol>
              <VDivider
                vertical
                class="d-none d-sm-block order-3 my-3"
              ></VDivider>
              <VCol
                order="2"
                order-sm="3"
                cols="6"
                sm="3"
                lg="2"
                class="text-right d-flex justify-center"
                :class="{ 'pb-0': $vuetify.breakpoint.smAndDown }"
              >
                <div>
                  <h3
                    class="text-right  text--primary  font-weight-medium"
                    :class="
                      $vuetify.breakpoint.smAndDown ? 'text-xs' : 'text-sm'
                    "
                  >
                    {{item.LastUpdateDateLong | date}}
                  </h3>
                  <h4 class="text-right text-xxs d-none d-sm-block">
                    {{$t(`update.date`)}}
                  </h4>
                </div>
              </VCol>
              <VDivider
                vertical
                class="d-none d-sm-block order-4 my-3"
              ></VDivider>
              <VCol
                order="4"
                order-sm="4"
                cols="6"
                sm="3"
                lg="2"
                class="text-right d-flex justify-center"
                :class="{ 'pt-0': $vuetify.breakpoint.smAndDown }"
              >
                <div>
                  <h3
                    class="text-sm text-right  text-uppercase"
                    :class="{ 'color-red': item.PaymentStatusString === `Rejected` , 'text--primary': item.PaymentStatusString != `Rejected` }"
                  >
                    {{item.PaymentStatusString}}
                  </h3>
                  <h4 class="text-right text-xxs d-none d-sm-block">
                    {{$t(`status`)}}
                  </h4>
                </div>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
        <VDivider class="d-none d-sm-block"></VDivider>
      </div>
    </component>
    <CommissionPayoutDetails
      :payoutDetails="payoutDetails"
      :commissiondetail="commissiondetail"
      :detailFilter="detailFilter"
      @showDetails="showDetails"
    />
  </div>
</template>
<script>
import SubPageHeader from '@/components/headers/SubPageHeader';
import CommissionPayoutDetails from '@/components/reports/CommissionPayoutDetails';
import { mapActions,mapState } from 'vuex';
import balanceCommaFormat from '@/filters/balanceCommaFormat';
import date from '@/filters/date';
export default {
  filters: { balanceCommaFormat,date },  
  data: () => ({
    headingTitle: 'Commission Payout',
    headingSubTitle: '',
    features: ['haveDownload'],
    payoutDetails: false,
    detailFilter: {
      AffiliateId: '',
      CommssnRcvId: '',      
      CommissionPayoutId: ''     
    },
    commissiondetail:{
        code: 0,
        message: '',
        data: {    
            Detail:[{
                DetailFieldName: '',
                DetailFieldValue: ''          
            }],        
            Id: '',
            CommssnRecvngId: '',
            TransactionDate: '',
            VerifyStatus: 0,
            PaymentStatus: 0,
            Currency: '',
            Amount: 0,
            FieldName: ''
        }        
    },
  
  }),  
  components: { SubPageHeader, CommissionPayoutDetails },
  created:function(){
    this.headingTitle = this.$t(`commission.payout`);
    this.fetchCommissionPayout();    
  },
  computed: { 
    ...mapState('Report', ['CommissionPayout','CommissionPayoutDetail'])
  },   
  methods: {
    ...mapActions('Report', ['fetchCommissionPayout','fetchCommissionPayoutDetail']),
    goBack() {
      this.$emit('goBack');
    },
    showDetails(payload,id,commssnRcvId) {
      if( payload === true)
      {
        this.detailFilter.CommssnRcvId = commssnRcvId;
        this.detailFilter.CommissionPayoutId = id   
        Promise.all([this.fetchCommissionPayoutDetail(this.detailFilter)]).then(() => {
          Object.keys(this.CommissionPayoutDetail).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(this.commissiondetail, key)) {
              this.commissiondetail[key] = this.CommissionPayoutDetail[key];
            }
          });            
        }); 
      }
      this.payoutDetails = payload;   
    },
  },
};
</script>
<style lang="scss" scoped>
.color-red {
  color: $soft-red;
}
</style>
