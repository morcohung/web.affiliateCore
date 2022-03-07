<template>
  <div>
    <VCard
      color="primary"
      class="rounded-lg mb-4 total-commissions-balance d-flex align-center"
      :elevation="$vuetify.breakpoint.smAndDown ? '4' : '0'"
      flat
    >
      <VCardText class="white--text" dark>
        <VRow class="my-0">
          <VCol
            cols="12"
            sm="6"
            class=" py-0"
            :order="$vuetify.breakpoint.smAndDown ? 'first' : 'last'"
          >
            <h4
              class="text-md-right text--secondary white--text font-weight-medium"
              :class="$vuetify.breakpoint.smAndDown ? 'text-sm' : 'text-md '"
            >
              {{$t(`total.commissions.balance`)}}
            </h4>
          </VCol>
          <VCol cols="12" sm="6" class=" py-0">
            <h3 class="text-xl text-left">
              <span class="text--secondary white--text">{{
                monthlyDetail.Currency
              }}</span>
              {{
                monthlyDetail.TotalCommissionBalanceMonthFirst | balanceCommaFormat
              }}
            </h3>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
    <div v-show="monthlyDetail.SettlementCycle === 1">
      <!--Just hide the tabs when full month  -->
      <VTabs v-model="tab" background-color="transparent" color="#ff9200">
        <VTab>
          {{ $t(`first.half.monthly`) }}
        </VTab>
        <VTab>
          {{ $t(`second.half.monthly`) }}
        </VTab>
      </VTabs>
      <VDivider class="mb-4"></VDivider>
    </div>
    <VTabsItems v-model="tab" class="rounded-lg pb-4 reports-content" touchless>
      <VTabItem>
        <VCard
          class="rounded-lg mb-2"
          flat
          outlined
          :elevation="$vuetify.breakpoint.smAndDown ? '4' : '0'"
        >
          <VRow class="my-0 px-4">
            <VCol cols="12" sm="6" class="pb-0">
              <VCard color="#f3f3f3" flat>
                <VCardText>
                  <h4 class="text-xs">
                    {{$t(`total.commissions.earned`)}}
                  </h4>
                  <h3 class="text-left text-md">
                    <span class="text--secondary">{{ monthlyDetail.Currency }}</span>
                    <span class="text--primary">
                      {{ monthlyDetail.TotalCommissionMonthFirst | balanceCommaFormat }}
                    </span>
                  </h3>
                </VCardText>
              </VCard>
              <VList
                cols="12"
                sm="6"
                class="pb-0"
                :class="{ 'mx-n4': $vuetify.breakpoint.width < 463 }"
              >
                <VListItem>
                  <VSpacer class="text-xs text--secondary">{{$t(`members`)}}</VSpacer>
                  <div class="text-right">
                    <h3 class="text-xs">
                      {{ monthlyDetail.TotalMemberCountMonthFirst }}
                    </h3>
                    <h4 class="text--secondary text-xxs">
                      {{ $t(`actives`) }}:
                      {{ monthlyDetail.TotalActiveMemberMonthFirst }}
                    </h4>
                  </div>
                </VListItem>
                <VDivider></VDivider>
                <VListItem>
                  <VSpacer>
                    <a
                      class="d-inline-flex align-center text-xs color-blue"
                      @click.stop="toggleDeductionDetails(true,monthlyDetail.SequenceMonthFirst)"
                      v-if="(monthlyDetail.BonusMonthFirst + monthlyDetail.PlatformFeeMonthFirst + monthlyDetail.PaymentFeeMonthFirst) != 0"
                    >
                      {{$t(`deductions`)}} <span class="betfont icon-info3 ml-4"></span>
                    </a>
                    <div class="d-inline-flex align-center text-xs" v-if="(monthlyDetail.BonusMonthFirst + monthlyDetail.PlatformFeeMonthFirst + monthlyDetail.PaymentFeeMonthFirst) ===0">{{$t(`deductions`)}}</div>
                  </VSpacer>
                  <div class="text-right">
                    <h3 class="text-xs text-left ">
                      <span class="text--secondary">{{ monthlyDetail.Currency }}</span>
                      <span class="text--primary">
                        -{{ (monthlyDetail.BonusMonthFirst + monthlyDetail.PlatformFeeMonthFirst + monthlyDetail.PaymentFeeMonthFirst) | balanceCommaFormat }}
                      </span>
                    </h3>
                  </div>
                </VListItem>
                <VDivider class="d-block d-sm-none"></VDivider>
              </VList>
            </VCol>
            <VCol class="pt-0">
              <VList
                class="pt-0"
                :class="{ 'mx-n4': $vuetify.breakpoint.width < 463 }"
              >
                <VListItem>
                  <VSpacer class="text-xs text--secondary">
                    {{ $t(`adjustment`) }}</VSpacer
                  >
                  <div class="text-right">
                    <h3 class="text-xs text-left">
                      <span class="text--secondary">{{ monthlyDetail.Currency }}</span>
                      <span class="text--primary">
                        {{ monthlyDetail.AdjustmentMonthFirst | balanceCommaFormat }}
                      </span>
                    </h3>
                  </div>
                </VListItem>
                <VDivider></VDivider>
                <VListItem>
                  <VSpacer class="text-xs text--secondary">
                    {{$t(`negative.balance`)}}</VSpacer
                  >
                  <div class="text-right">
                    <h3 class="text-xs text-left">
                      <span class="text--secondary">{{
                        monthlyDetail.Currency
                      }}</span>
                      <span class="text--primary">
                        {{ monthlyDetail.NegativeCarryForwardMonthFirst | balanceCommaFormat }}
                      </span>
                    </h3>
                    <h4 class="text--secondary text-xxs">{{$t(`from.last.month`)}}</h4>
                  </div>
                </VListItem>
                <VDivider></VDivider>
                <VListItem>
                  <VSpacer class="text-xs text--secondary">
                    {{ $t(`paid.amount`) }}</VSpacer
                  >
                  <div class="text-right">
                    <h3 class="text-xs text-left">
                      <span class="text--secondary">{{ monthlyDetail.Currency }}</span>
                      <span class="text--primary">
                        {{ monthlyDetail.PaidCommissionMonthFirst | balanceCommaFormat }}
                      </span>
                    </h3>
                    <h4
                      class="text--secondary text-xxs"
                      v-if="monthlyDetail.LastPaidCommissionDateLongMonthFirst != 0"
                    >
                      {{ monthlyDetail.LastPaidCommissionDateLongMonthFirst | date }}
                    </h4>
                  </div>
                </VListItem>
              </VList>
            </VCol>
          </VRow>
        </VCard>
        <VRow dense>
          <VCol cols="12" sm="6">
            <VCard
              class="rounded-lg"
              style="height:100%"
              outlined
              :elevation="$vuetify.breakpoint.smAndDown ? '4' : '0'"
            >
              <VCardTitle class="flex-column align-start">
                <h2 class="text-sm">
                  {{$t(`All products`)}}
                  <span class="text-xxs"> ({{$t(`chess.game.not.included`)}})</span>
                </h2>
                <h3 class="text-sm text-left text-md">
                  <span class="text--secondary">{{ monthlyDetail.Currency }}</span>
                  <span class="text--primary">
                    {{ monthlyDetail.ProductCommissionMonthFirst | balanceCommaFormat }}
                  </span>
                </h3>
              </VCardTitle>
              <VList dense>
                <VListItem class="text-xs">
                  <VSpacer
                    ><h3 class="text--secondary">
                      {{ $t(`actives`) }}
                    </h3></VSpacer
                  >
                  <h4>{{ monthlyDetail.TotalActiveMemberMonthFirst }}</h4>
                </VListItem>
                <VDivider></VDivider>
                <VListItem class="text-xs">
                  <VSpacer
                    ><h3 class="text--secondary">{{ $t(`stake`) }}</h3></VSpacer
                  >
                  <h4>
                    <span class="text--secondary">{{ monthlyDetail.Currency }}</span>
                    <span class="text--primary">
                      {{ monthlyDetail.ProductTurnoverMonthFirst | balanceCommaFormat }}
                    </span>
                  </h4>
                </VListItem>
                <VDivider></VDivider>
                <VListItem class="text-xs">
                  <VSpacer
                    ><h3 class="text--secondary">
                      {{ $t(`gross.revenue`) }}
                    </h3></VSpacer
                  >
                  <h4>
                    <span class="text--secondary">{{ monthlyDetail.Currency }}</span>
                    <span class="text--primary">
                      {{ monthlyDetail.ProductGrossRevenueMonthFirst | balanceCommaFormat }}
                    </span>
                  </h4>
                </VListItem>
                <VDivider></VDivider>
                <VListItem class="text-xs">
                  <VSpacer><h3 class="text--secondary">{{$t(`netrevenue`)}}</h3></VSpacer>
                  <h4>
                    <span class="text--secondary">
                      {{ monthlyDetail.Currency }}</span>
                    <span class="text--primary">
                      {{ monthlyDetail.ProductNetRevenueMonthFirst | balanceCommaFormat }}
                    </span>
                  </h4>
                </VListItem>
                <VDivider></VDivider>
                <VListItem class="text-xs">
                  <VSpacer
                    ><h3 class="text--secondary">
                      {{ $t(`cm.revenue.share`) }}
                    </h3></VSpacer
                  >
                  <h4>{{ monthlyDetail.ProductRewardRateMonthFirst * 100 | balanceCommaFormat }}%</h4>
                </VListItem>
              </VList>
            </VCard>
          </VCol>
          <VCol cols="12" sm="6">
            <VCard
              class="rounded-lg"
              style="height:100%"
              outlined
              :elevation="$vuetify.breakpoint.smAndDown ? '4' : '0'"
            >
              <VCardTitle class="flex-column align-start">
                <h2 class="text-sm">
                  {{ $t(`chess.game.group`) }}
                </h2>
                <h3 class="text-sm text-left text-md">
                  <span class="text--secondary">
                    {{ monthlyDetail.Currency }}</span>
                  <span class="text--primary">
                    {{ monthlyDetail.ChessGameCommissionMonthFirst | balanceCommaFormat }}
                  </span>
                </h3>
              </VCardTitle>
              <VList dense>
                <VListItem class="text-xs">
                  <VSpacer
                    ><h3 class="text--secondary">
                      {{ $t(`actives`) }}
                    </h3></VSpacer
                  >
                  <h4>{{ monthlyDetail.ChessGameActiveMemberMonthFirst }}</h4>
                </VListItem>
                <VDivider></VDivider>
                <VListItem class="text-xs">
                  <VSpacer
                    ><h3 class="text--secondary">{{ $t(`stake`) }}</h3></VSpacer
                  >
                  <h4>
                    <span class="text--secondary">
                      {{ monthlyDetail.Currency }}
                    </span>
                    <span class="text--primary">
                      {{ monthlyDetail.ChessGameStakeMonthFirst | balanceCommaFormat }}
                    </span>
                  </h4>
                </VListItem>
                <VDivider></VDivider>
                <VListItem class="text-xs">
                  <VSpacer><h3 class="text--secondary">{{$t(`percentage`)}}</h3></VSpacer>
                  <h4>{{ monthlyDetail.ChessGameRewardRateMonthFirst | balanceCommaFormat }}%</h4>
                </VListItem>
              </VList>
            </VCard>
          </VCol>
        </VRow>
      </VTabItem>
      <VTabItem>
        <VCard
          class="rounded-lg mb-2"
          flat
          outlined
          :elevation="$vuetify.breakpoint.smAndDown ? '4' : '0'"
        >
          <VRow class="my-0 px-4">
            <VCol cols="12" sm="6" class="pb-0">
              <VCard color="#f3f3f3" flat>
                <VCardText>
                  <h4 class="text-xs">
                    {{$t(`total.commissions.earned`)}}
                  </h4>
                  <h3 class="text-left text-md">
                    <span class="text--secondary">{{ monthlyDetail.Currency }}</span>
                    <span class="text--primary">
                      {{ monthlyDetail.ProductCommissionMonthSecond | balanceCommaFormat }}
                    </span>
                  </h3>
                </VCardText>
              </VCard>
              <VList
                cols="12"
                sm="6"
                class="pb-0"
                :class="{ 'mx-n4': $vuetify.breakpoint.width < 463 }"
              >
                <VListItem>
                  <VSpacer class="text-xs text--secondary">Members</VSpacer>
                  <div class="text-right">
                    <h3 class="text-xs">{{ monthlyDetail.TotalMemberCountMonthSecond | balanceCommaFormat }}</h3>
                    <h4 class="text--secondary text-xxs">{{ $t(`actives`) }}: {{ monthlyDetail.TotalActiveMemberMonthSecond | balanceCommaFormat }}</h4>
                  </div>
                </VListItem>
                <VDivider></VDivider>
                <VListItem>
                  <VSpacer>
                    <a
                      class="d-inline-flex align-center text-xs color-blue"
                      @click.stop="toggleDeductionDetails(true,monthlyDetail.SequenceMonthSecond)"
                      v-if="(monthlyDetail.BonusMonthSecond + monthlyDetail.PlatformFeeMonthSecond + monthlyDetail.PaymentFeeMonthSecond) !=0"
                    >
                      {{$t(`deductions`)}} <span class="betfont icon-info3 ml-4"></span>
                    </a>
                    <div class="d-inline-flex align-center text-xs" v-if="(monthlyDetail.BonusMonthSecond + monthlyDetail.PlatformFeeMonthSecond + monthlyDetail.PaymentFeeMonthSecond) ===0">Deductions</div>
                  </VSpacer>
                  <div class="text-right">
                    <h3 class="text-xs text-left ">
                      <span class="text--secondary">{{ monthlyDetail.Currency }}</span>
                      <span class="text--primary">
                      -{{ (monthlyDetail.BonusMonthSecond + monthlyDetail.PlatformFeeMonthSecond + monthlyDetail.PaymentFeeMonthSecond) | balanceCommaFormat }}
                      </span>
                    </h3>
                  </div>
                </VListItem>
                <VDivider class="d-block d-sm-none"></VDivider>
              </VList>
            </VCol>
            <VCol class="pt-0">
              <VList
                class="pt-0"
                :class="{ 'mx-n4': $vuetify.breakpoint.width < 463 }"
              >
                <VListItem>
                  <VSpacer class="text-xs text--secondary">{{ $t(`adjustment`) }}</VSpacer>
                  <div class="text-right">
                    <h3 class="text-xs text-left">
                      <span class="text--secondary">{{ monthlyDetail.Currency }}</span>
                      <span class="text--primary">
                        {{ monthlyDetail.AdjustmentMonthSecond | balanceCommaFormat }}
                      </span>
                    </h3>
                  </div>
                </VListItem>
                <VDivider></VDivider>
                <VListItem>
                  <VSpacer class="text-xs text--secondary">
                    {{$t(`negative.balance`)}}</VSpacer
                  >
                  <div class="text-right">
                    <h3 class="text-xs text-left">
                      <span class="text--secondary">{{ monthlyDetail.Currency }}</span>
                      <span class="text--primary">
                        {{ monthlyDetail.NegativeCarryForwardMonthSecond | balanceCommaFormat }}
                      </span>
                    </h3>
                    <h4 class="text--secondary text-xxs">{{$t(`from.last.month`)}}</h4>
                  </div>
                </VListItem>
                <VDivider></VDivider>
                <VListItem>
                  <VSpacer class="text-xs text--secondary">
                    {{$t(`paid.amount`)}}</VSpacer
                  >
                  <div class="text-right">
                    <h3 class="text-xs text-left">
                      <span class="text--secondary">{{ monthlyDetail.Currency }}</span>
                      <span class="text--primary">
                        {{ monthlyDetail.PaidCommissionMonthSecond | balanceCommaFormat }}
                      </span>
                    </h3>
                    <h4
                      class="text--secondary text-xxs"
                      v-if="monthlyDetail.LastPaidCommissionDateLongMonthSecond != 0"
                    >
                      {{ monthlyDetail.LastPaidCommissionDateLongMonthSecond | date }}
                    </h4>
                  </div>
                </VListItem>
              </VList>
            </VCol>
          </VRow>
        </VCard>
        <VRow dense>
          <VCol cols="12" sm="6">
            <VCard
              class="rounded-lg"
              style="height:100%"
              outlined
              :elevation="$vuetify.breakpoint.smAndDown ? '4' : '0'"
            >
              <VCardTitle class="flex-column align-start">
                <h2 class="text-sm">
                  {{$t(`all.products`)}}
                  <span class="text-xxs">({{$t(`except.chess.game`)}})</span>
                </h2>
                <h3 class="text-sm text-left text-md">
                  <span class="text--secondary">{{ monthlyDetail.Currency }}</span>
                  <span class="text--primary">
                    {{ monthlyDetail.ProductCommissionMonthSecond | balanceCommaFormat }}
                  </span>
                </h3>
              </VCardTitle>
              <VList dense>
                <VListItem class="text-xs">
                  <VSpacer><h3 class="text--secondary">{{$t(`actives`)}}</h3></VSpacer>
                  <h4> {{ monthlyDetail.TotalActiveMemberMonthSecond }}</h4>
                </VListItem>
                <VDivider></VDivider>
                <VListItem class="text-xs">
                  <VSpacer><h3 class="text--secondary">{{$t(`stake`)}}</h3></VSpacer>
                  <h4>
                    <span class="text--secondary">{{ monthlyDetail.Currency }}</span>
                    <span class="text--primary">
                      {{ monthlyDetail.ProductTurnoverMonthSecond | balanceCommaFormat }}
                    </span>
                  </h4>
                </VListItem>
                <VDivider></VDivider>
                <VListItem class="text-xs">
                  <VSpacer
                    ><h3 class="text--secondary">{{$t(`gross.revenue`)}}</h3></VSpacer
                  >
                  <h4>
                    <span class="text--secondary">{{ monthlyDetail.Currency }}</span>
                    <span class="text--primary">
                      {{ monthlyDetail.ProductGrossRevenueMonthSecond | balanceCommaFormat }}
                    </span>
                  </h4>
                </VListItem>
                <VDivider></VDivider>
                <VListItem class="text-xs">
                  <VSpacer><h3 class="text--secondary">{{$t(`netrevenue`)}}</h3></VSpacer>
                  <h4>
                    <span class="text--secondary">{{ monthlyDetail.Currency }}</span>
                    <span class="text--primary">
                      {{ monthlyDetail.ProductNetRevenueMonthSecond | balanceCommaFormat }}
                    </span>
                  </h4>
                </VListItem>
                <VDivider></VDivider>
                <VListItem class="text-xs">
                  <VSpacer>
                    <h3 class="text--secondary">{{$t(`cm.revenue.share`)}}</h3>
                  </VSpacer>
                  <h4>{{ monthlyDetail.ProductRewardRateMonthSecond | balanceCommaFormat }}%</h4>
                </VListItem>
              </VList>
            </VCard>
          </VCol>
          <VCol cols="12" sm="6">
            <VCard
              class="rounded-lg"
              style="height:100%"
              outlined
              :elevation="$vuetify.breakpoint.smAndDown ? '4' : '0'"
            >
              <VCardTitle class="flex-column align-start">
                <h2 class="text-sm">
                  {{$t(`chess.game.group`)}}
                </h2>
                <h3 class="text-sm text-left text-md">
                  <span class="text--secondary">{{ monthlyDetail.Currency }}</span>
                  <span class="text--primary">
                      {{ monthlyDetail.ChessGameCommissionMonthSecond | balanceCommaFormat }}
                  </span>
                </h3>
              </VCardTitle>
              <VList dense>
                <VListItem class="text-xs">
                  <VSpacer><h3 class="text--secondary">{{$t(`actives`)}}</h3></VSpacer>
                  <h4>{{ monthlyDetail.ChessGameActiveMemberMonthSecond }}</h4>
                </VListItem>
                <VDivider></VDivider>
                <VListItem class="text-xs">
                  <VSpacer><h3 class="text--secondary">{{$t(`stake`)}}</h3></VSpacer>
                  <h4>
                    <span class="text--secondary">{{ monthlyDetail.Currency }}</span>
                    <span class="text--primary">
                      {{ monthlyDetail.ChessGameStakeMonthSecond | balanceCommaFormat }}
                    </span>
                  </h4>
                </VListItem>
                <VDivider></VDivider>
                <VListItem class="text-xs">
                  <VSpacer><h3 class="text--secondary">{{$t(`percentage`)}}</h3></VSpacer>
                  <h4>{{ monthlyDetail.ChessGameRewardRateMonthSecond * 100 | balanceCommaFormat }}%</h4>
                </VListItem>
              </VList>
            </VCard>
          </VCol>
        </VRow>
      </VTabItem>
    </VTabsItems>

    <MonthlyCommissionsDeductions
      :showDeductionDetails="showDeductionDetails"
      :deductionModel="deductionModel"
      headingTitle="Monthly Commissions"
      :headingSubTitle="headingSubTitle"
      :MonthlyCommissionFilter ="MonthlyCommissionFilter"
      @toggleDeductionDetails="toggleDeductionDetails(false)"
    />
  </div>
</template>
<script>
import MonthlyCommissionsDeductions from '@/components/reports/MonthlyCommissionsDeductions';
import balanceCommaFormat from '@/filters/balanceCommaFormat';
import date from '@/filters/date';
export default {
  filters: { balanceCommaFormat, date },
  data: () => ({
    showDeductionDetails: false,
    tab: null,
    deductionModel:{
        Currency: '',      
        StartDate: '',
        EndDate:'',
        PlatformFee: 0,
        PaymentFee: 0,
        Bonus: 0       
    } 
  }),
  props: {
    monthlyDetail: {
      type: Object,
      default: () => ({}),
    },
    headingSubTitle: { 
      required: true, 
      default: '' 
    },
    MonthlyCommissionFilter: {
      type: Object,
      default: () => ({}),
    },
  },
  created:function(){
        this.deductionModel.Currency = this.monthlyDetail.Currency;
        this.deductionModel.StartDate = this.monthlyDetail.StartDateMonthFirst;
        this.deductionModel.EndDate = this.monthlyDetail.EndDateMonthFirst;
        this.deductionModel.PlatformFee = this.monthlyDetail.PlatformFeeMonthFirst;
        this.deductionModel.PaymentFee = this.monthlyDetail.PaymentFeeMonthFirst;
        this.deductionModel.Bonus = this.monthlyDetail.BonusMonthFirst;
  },  
  components: { MonthlyCommissionsDeductions },
  methods: {
    toggleDeductionDetails(payload,sequence) {
      switch (sequence)
      {
        case 1:
          this.deductionModel.Currency = this.monthlyDetail.Currency;
          this.deductionModel.StartDate = this.monthlyDetail.StartDateMonthFirst;
          this.deductionModel.EndDate = this.monthlyDetail.EndDateMonthFirst;
          this.deductionModel.PlatformFee = this.monthlyDetail.PlatformFeeMonthFirst;
          this.deductionModel.PaymentFee = this.monthlyDetail.PaymentFeeMonthFirst;
          this.deductionModel.Bonus = this.monthlyDetail.BonusMonthFirst;
          break;
        case 2:
          this.deductionModel.Currency = this.monthlyDetail.Currency;
          this.deductionModel.StartDate = this.monthlyDetail.StartDateMonthSecond;
          this.deductionModel.EndDate = this.monthlyDetail.EndDateMonthSecond;
          this.deductionModel.PlatformFee = this.monthlyDetail.PlatformFeeMonthSecond;
          this.deductionModel.PaymentFee = this.monthlyDetail.PaymentFeeMonthSecond;
          this.deductionModel.Bonus = this.monthlyDetail.BonusMonthSecond;        
          break;
      }
      this.showDeductionDetails = payload;
    },
  },
};
</script>
<style lang="scss" scoped>
@include icon(('icon-info3'));
.v-list {
  &::v-deep {
    .color-blue {
      color: $blue-link;
    }
  }
}
</style>
<style lang="scss" scoped>
@import '../../assets/scss/06_overlaps/_v-tabs.scss';
@import '../../assets/scss/04_templates/_monthly-commissions-detail';
</style>
