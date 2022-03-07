<template>
  <div class="side-drawer-detail">
    <VOverlay v-if="showDeductionDetails">
      <div></div>
    </VOverlay>
    <VDialog
      fullscreen
      :content-class="
        $vuetify.breakpoint.mdAndUp ? 'desktop-drawer' : 'mobile-drawer'
      "
      v-model="showDeductionDetails"
      transition="slide-x-reverse-transition"
      @click:outside="toggleDeductionDetails(false)"
      persistent
    >
      <VSheet>
        <VAppBar height="auto" flat absolute>
          <VBtn
            icon
            class="ml-n3"
            @click.stop="
              showPromotionBonus
                ? (showPromotionBonus = false)
                : toggleDeductionDetails(false)
            "
          >
            <span class="betfont icon-stick-arrow-left"></span>
          </VBtn>
          <VSpacer class="font-weight-bold">
            <div :class="headingSubTitle.length > 0 ? 'text-xxs' : 'text-md'">
              {{ headingTitle }}
            </div>
            <div>{{ headingSubTitle }}</div>
          </VSpacer>
        </VAppBar>
        <div class="v-app-bar"></div>
        <VDivider></VDivider>
        <div v-if="!showPromotionBonus">
          <VList class="mb-2">
            <VListItem class=" mx-4"
              ><h2 class="text-md">{{$t(`deductions`)}}</h2></VListItem
            >
            <VListItem class="text-xs  mx-4">
              <VSpacer><h3 class="font-weight-medium">{{$t(`payment.fee`)}}</h3></VSpacer>
              <h4>
                <span class="text--secondary">{{deductionModel.Currency}}</span>
                <span class="text--primary">
                  {{ deductionModel.PlatformFee | balanceCommaFormat }}
                </span>
              </h4>
            </VListItem>
            <VDivider></VDivider>
            <VListItem class="text-xs mx-4">
              <VSpacer>
                <h3 class="font-weight-medium">
                  <a class="color-blue" @click.stop="getPromoBonus()" v-if="deductionModel.Bonus != 0">
                    {{$t(`promotion.bonus`)}} <span class="betfont icon-info3 ml-4"></span></a>
                  <div v-if="deductionModel.Bonus === 0">{{$t(`promotion.bonus`)}}</div>
                </h3>
              </VSpacer>
              <h4>
                <span class="text--secondary">{{deductionModel.Currency}}</span>
                <span class="text--primary">
                {{deductionModel.Bonus  | balanceCommaFormat }}
                </span>
              </h4>
            </VListItem>
            <VDivider></VDivider>
            <VListItem class="text-xs mx-4">
              <VSpacer
                ><h3 class="font-weight-medium">{{$t(`payment.fee`)}}</h3></VSpacer
              >
              <h4>
                <span class="text--secondary">{{deductionModel.Currency}}</span>
                <span class="text--primary">
                  {{deductionModel.PaymentFee | balanceCommaFormat }}
                </span>
              </h4>
            </VListItem>
            <VDivider></VDivider>
          </VList>
          <VCard class="mx-4 rounded-lg" color="#232323" flat>
            <VCardText class="d-flex white--text">
              <VSpacer>{{$t(`total`)}}</VSpacer>
              <h4>
                <span class="">{{deductionModel.Currency}}</span>
                <span class="">
                 {{(deductionModel.Bonus + deductionModel.PlatformFee + deductionModel.PaymentFee) | balanceCommaFormat }}
                </span>
              </h4>
            </VCardText>
          </VCard>
        </div>
        <div v-if="showPromotionBonus">
          <VTabs color="orange" v-model="tab">
            <VTab>{{$t(`Promotions`)}} </VTab>
            <VTab>{{$t(`bonus`)}}</VTab>
          </VTabs>
          <VDivider></VDivider>
          <VTabsItems v-model="tab" class="rounded-lg pb-4 " touchless>
            <VTabItem>
              <VList class="text-sm">
                <!--Use Vuetify's VLazy for infinite items-->
                <template>
                  <div v-for="(promo, $index) in MonthlyPromoBonus.data.PromoList"
                       :key="$index">  
                  <VListItem>
                    <VSpacer>{{promo.TransactionDate | date}}</VSpacer>
                    <h3>
                      <span class="text--secondary">{{deductionModel.Currency}}</span>
                      <span class="">
                        {{promo.Amount | balanceCommaFormat}}
                      </span>
                    </h3>
                  </VListItem>
                  <VDivider></VDivider>
                  </div>
                </template>
              </VList>
            </VTabItem>
            <VTabItem>
              <VList class="text-sm">
                <template >
                  <div v-for="(bonus, $index) in MonthlyPromoBonus.data.BonusList" :key="$index">
                  <VListItem>
                    <VSpacer>{{bonus.TransactionDate | date}}</VSpacer>
                    <h3>
                      <span class="text--secondary">{{deductionModel.Currency}}</span>
                      <span class="">
                       {{bonus.Amount | balanceCommaFormat}}
                      </span>
                    </h3>
                  </VListItem>
                  <VDivider></VDivider>
                  </div>
                </template>
              </VList>
            </VTabItem>
          </VTabsItems>
        </div>        
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
  data: () => ({
    showPromotionBonus: false,
    tab: null,
    MonthlyPromoBonusFilter: {   
      DateTimeFrom: '',       
      DateTimeTo: '',   
    },    
  }),
  props: {
    showDeductionDetails: { required: true, default: false },
    headingTitle: { required: true, default: '' },
    headingSubTitle: { required: true, default: '' },
    deductionModel: {
      type: Object,
      default: () => ({}),
    },  
  },
  // created:function(){
  //   console.log(this.deductionModel);
  // },
  computed: {     
    ...mapState('Report', ['MonthlyPromoBonus'])   
  },    
  methods: {
    ...mapActions('Report', ['fetchMonthlyPromoBonus']), 
    toggleDeductionDetails(payload) {
      this.$emit('toggleDeductionDetails', payload);
    },
    getPromoBonus(){
      this.showPromotionBonus = true;
      this.MonthlyPromoBonusFilter.DateTimeFrom = this.deductionModel.StartDate;
      this.MonthlyPromoBonusFilter.DateTimeTo = this.deductionModel.EndDate;      
      this.fetchMonthlyPromoBonus(this.MonthlyPromoBonusFilter);     
    }
  },
};
</script>
<style lang="scss" scoped>
@include icon(('icon-stick-arrow-left', 'icon-info3'));
@import '../../assets/scss/03_organisms/_side-drawer-dialog';
@import '../../assets/scss/06_overlaps/_v-tabs.scss';

.color-blue {
  color: $blue-link;
}
</style>
