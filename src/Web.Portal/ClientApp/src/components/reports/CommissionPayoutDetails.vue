<template>
  <div class="side-drawer-detail">
    <VOverlay v-if="payoutDetails">
      <div></div>
    </VOverlay>
    <VDialog
      v-model="payoutDetails"
      fullscreen
      :content-class="
        $vuetify.breakpoint.mdAndUp ? 'desktop-drawer' : 'mobile-drawer'
      "
      transition="slide-x-reverse-transition"
      @click:outside="showDetails(false)"
      persistent
      ><VSheet>
        <VAppBar height="auto" flat absolute>
          <VBtn icon class="ml-n3" @click.stop="showDetails(false)">
            <span class="betfont icon-stick-arrow-left"></span>
          </VBtn>
          <VSpacer class="font-weight-bold">
            <div :class="headingSubTitle.length > 0 ? 'text-xxs' : 'text-md'">
              {{ headingTitle }}
            </div>
            <div>{{ headingSubTitle }}</div>
          </VSpacer>
          <VBtn icon>
            <span class="betfont icon-download" @click="downloadfile()"></span>
          </VBtn>
        </VAppBar>
        <div class="v-app-bar"></div>
        <VDivider></VDivider>
        <VCard class="ma-4" flat color="#f3f3f3">
          <VCardText>
            {{ $t(commissiondetail.data.FieldName)}}
            <h3>
              <span class="text--secondary">{{commissiondetail.data.Currency}}</span>
              <span class="text--primary">
                  {{ commissiondetail.data.Amount | balanceCommaFormat }}
              </span>
            </h3>
          </VCardText>
        </VCard>
        <VList >
          <VListItem class="d-flex py-2 px-8">
            <div>
              <h4 class="text-uppercase text-md">{{commissiondetail.data.PaymentStatusString}}</h4>
              <h5 class="text-xs font-weight-medium">{{commissiondetail.data.LastUpdateDateLong | date}}</h5>
            </div>
            <VSpacer class="text-right" v-if="commissiondetail.data.FieldName ==='comm.rcv.field.bank.transfer'">
            <div v-for="item in commissiondetail.data.Detail" 
                  :key="item.key">              
              <h3 class="text-sm font-weight-medium" v-if="item.DetailFieldName === 'comm.rcv.data.field.bt.acc.name'">{{item.DetailFieldValue}}</h3>
              <h5 class="text-xs font-weight-medium" v-if="item.DetailFieldName === 'comm.rcv.data.field.bt.acc.no'">{{item.DetailFieldValue}}</h5>
            </div>              
            </VSpacer>
          </VListItem>
          <VDivider></VDivider>
          <VListItem class="d-flex py-2 px-8">
            <h5 class="text-xs font-weight-medium">{{$t(`transaction.date`)}}</h5>
            <VSpacer class="text-right"><h3> {{commissiondetail.data.LastUpdateDateLong | date}}</h3></VSpacer>
          </VListItem>
          <VDivider></VDivider>
          <VListItem class="d-flex py-2 px-8" v-if="commissiondetail.data.FieldName ==='comm.rcv.field.bank.transfer'">
            <h5 class="text-xs font-weight-medium">{{$t(`bank`)}}</h5>
            <VSpacer class="text-right text-xs py-1">
            <div v-for="item in commissiondetail.data.Detail" 
                  :key="item.key">                  
              <h3 v-if="item.DetailFieldName==='comm.rcv.data.field.bt.swift.code'">{{item.DetailFieldValue}}</h3>
              <h4 class="font-weight-medium text-xs" v-if="item.DetailFieldName === 'comm.rcv.data.field.bt.branch.name'">{{item.DetailFieldValue}}</h4>
              <h4 class="font-weight-medium text-xs" v-if="item.DetailFieldName === 'comm.rcv.data.field.bt.bank.country'">{{item.DetailFieldValue}}</h4>
            </div> 
            </VSpacer>
          </VListItem>
          <VDivider v-if="commissiondetail.data.FieldName ==='comm.rcv.field.bank.transfer'"></VDivider>
          <VListItem class="d-flex py-2 px-8" v-if="commissiondetail.data.FieldName ==='comm.rcv.field.bank.transfer'">             
            <h5 class="text-xs font-weight-medium">{{$t(`comm.rcv.data.field.bt.swift.code`)}}</h5>           
            <VSpacer class="text-right" >
            <div v-for="item in commissiondetail.data.Detail" 
                  :key="item.key">                 
              <h3 v-if="item.DetailFieldName==='comm.rcv.data.field.bt.swift.code'">{{item.DetailFieldValue}}</h3>
            </div>                           
            </VSpacer>
          </VListItem>
          <VDivider v-if="commissiondetail.data.FieldName ==='comm.rcv.field.bank.transfer'"></VDivider>
          <VListItem class="d-flex py-2 px-8"  v-if="commissiondetail.data.FieldName ==='comm.rcv.field.bank.transfer'">
            <h5 class="text-xs font-weight-medium">{{$t(`comm.rcv.data.field.bt.sort.code`)}}</h5>              
            <VSpacer class="text-right  text-xs" >
            <div v-for="item in commissiondetail.data.Detail" 
                  :key="item.key">               
              <h3 v-if="item.DetailFieldName==='comm.rcv.data.field.bt.sort.code'">{{item.DetailFieldValue}}</h3>
            </div>               
              </VSpacer>           
          </VListItem>
          <VDivider v-if="commissiondetail.data.FieldName ==='comm.rcv.field.bank.transfer'"></VDivider>
          <VListItem class="d-flex py-2 px-8" v-if="commissiondetail.data.FieldName ==='comm.rcv.field.bank.transfer'">
            <h5 class="text-xs font-weight-medium">{{$t(`comm.rcv.data.field.bt.iban`)}}</h5>        
            <VSpacer class="text-right  text-xs" >
            <div v-for="item in commissiondetail.data.Detail" 
                  :key="item.key">                    
              <h3 v-if="item.DetailFieldName==='comm.rcv.data.field.bt.iban'">{{item.DetailFieldValue}}</h3>
           </div>                 
            </VSpacer>         
          </VListItem>
          <VDivider v-if="commissiondetail.data.FieldName ==='comm.rcv.field.bank.transfer'"></VDivider>        
          <VListItem class="d-flex py-2 px-8" v-if="commissiondetail.data.FieldName ===`comm.rcv.field.moneybookers`">
            <h5 class="text-xs font-weight-medium">{{$t(`comm.rcv.data.field.moneybookers`)}}</h5>        
            <VSpacer class="text-right  text-xs" >
            <div v-for="item in commissiondetail.data.Detail" 
                  :key="item.key">                    
              <h3 v-if="item.DetailFieldName==='comm.rcv.data.field.moneybookers'">{{item.DetailFieldValue}}</h3>
           </div>                 
            </VSpacer>         
          </VListItem>
          <VDivider v-if="commissiondetail.data.FieldName ==='comm.rcv.field.moneybookers'"></VDivider>
          <VListItem class="d-flex py-2 px-8" v-if="commissiondetail.data.FieldName ==='comm.rcv.field.neteller.account'">
            <h5 class="text-xs font-weight-medium">{{$t(`comm.rcv.data.field.neteller`)}}</h5>        
            <VSpacer class="text-right  text-xs" >
            <div v-for="item in commissiondetail.data.Detail" 
                  :key="item.key">                    
              <h3 v-if="item.DetailFieldName==='comm.rcv.data.field.neteller'">{{item.DetailFieldValue}}</h3>
           </div>                 
            </VSpacer>         
          </VListItem>
          <VDivider v-if="commissiondetail.data.FieldName ==='comm.rcv.field.neteller.account'"></VDivider>     
          <VListItem class="d-flex py-2 px-8" v-if="commissiondetail.data.FieldName ==='comm.rcv.field.ecopayz.account'">
            <h5 class="text-xs font-weight-medium">{{$t(`ecoPayz Account Name`)}}</h5>        
            <VSpacer class="text-right  text-xs" >
            <div v-for="item in commissiondetail.data.Detail" 
                  :key="item.key">                    
              <h3 v-if="item.DetailFieldName==='comm.rcv.data.field.ecopayz.acc.name'">{{item.DetailFieldValue}}</h3>
           </div>                 
            </VSpacer>         
          </VListItem>
          <VDivider v-if="commissiondetail.data.FieldName ==='comm.rcv.field.ecopayz.account'"></VDivider>  
          <VListItem class="d-flex py-2 px-8" v-if="commissiondetail.data.FieldName ==='comm.rcv.field.ecopayz.account'">
            <h5 class="text-xs font-weight-medium">{{$t(`comm.rcv.data.field.ecopayz.acc.no`)}}</h5>        
            <VSpacer class="text-right  text-xs" >
            <div v-for="item in commissiondetail.data.Detail" 
                  :key="item.key">                    
              <h3 v-if="item.DetailFieldName==='comm.rcv.data.field.ecopayz.acc.no'">{{item.DetailFieldValue}}</h3>
           </div>                 
            </VSpacer>         
          </VListItem>
          <VDivider v-if="commissiondetail.data.FieldName ==='comm.rcv.field.ecopayz.account'"></VDivider>        
          <VListItem class="d-flex py-2 px-8" v-if="commissiondetail.data.FieldName ==='comm.rcv.field.188.account'">
            <h5 class="text-xs font-weight-medium">{{$t(`comm.rcv.field.188.account`)}}</h5>        
            <VSpacer class="text-right  text-xs" >
            <div v-for="item in commissiondetail.data.Detail" 
                  :key="item.key">                    
              <h3 v-if="item.DetailFieldName==='comm.rcv.data.field.188.account'">{{item.DetailFieldValue}}</h3>
           </div>                 
            </VSpacer>         
          </VListItem>
          <VDivider v-if="commissiondetail.data.FieldName ==='comm.rcv.field.188.account'"></VDivider>                                 
        </VList>
      </VSheet>
    </VDialog>
  </div>
</template>
<script>
import { mapActions,mapState } from 'vuex';
import balanceCommaFormat from '@/filters/balanceCommaFormat';
import date from '@/filters/date';
export default {
  filters: { balanceCommaFormat,date },  
  data: () => ({}),
  props: {
    payoutDetails: { required: true, default: false },
    headingTitle: { default: '' },
    headingSubTitle: { type: String, default: '' },    
    commissiondetail: {
      type: Object,
      default: () => ({}),
    },  
    detailFilter: {
      type: Object,
      default: () => ({}),
    },      
      
  },
  methods: {
    ...mapActions('Report', ['ExportCommissionPayoutDetail']),        
    showDetails() {
      this.$emit('showDetails', false);
    },
    downloadfile(){   
      this.ExportCommissionPayoutDetail(this.detailFilter);       
    }
  },
};
</script>
<style lang="scss" scoped>
@include icon(icon-stick-arrow-left);
@import '../../assets/scss/03_organisms/_side-drawer-dialog';
</style>
