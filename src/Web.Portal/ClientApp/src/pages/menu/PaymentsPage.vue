<template>
  <div>
    <VContainer v-if="activePage == 'PaymentListing'">
      <ValidationObserver v-slot="v" ref="form">
        <VCard max-width="344" outlined class="rounded-lg mx-auto">
          <VCardText>
            <ValidationProvider name="Amount" rules="required" v-slot="{ invalid }">
              <VTextField filled :label="$t(`amount`)" v-model="amount" type="number"></VTextField>
              <span v-if="invalid" style="color:red;">
                {{ $t(`jquery.validator.required`) }}
              </span>
            </ValidationProvider>
            <h2 class="text--primary text-md mb-2">{{ $t(`transaction.details`) }}</h2>
            <p class="text-sm">{{ $t(`transaction.descr`) }}</p>
          </VCardText>
          <VExpansionPanels class="rounded-lg" flat v-model="panel">
            <VExpansionPanel
              class="mt-0 rounded-lg"
              v-for="(item, index) in PaymentInfo.CommRcvList"
              :key="index"
            >
              <VExpansionPanelHeader>
                <span>
                  <span
                    class="betfont mr-3"
                    :class="
                      index === panel
                        ? 'icon-radio-on color-orange'
                        : 'icon-radio-off'
                    "
                  ></span
                  >{{ item.Description }}
                </span>
              </VExpansionPanelHeader>
              <VExpansionPanelContent>
                <template>
                  <div v-for="(textField) in item.Data" v-bind:key="textField.FieldName">
                    <VTextField
                      class="mb-4"
                      filled
                      :name="textField.FieldName"
                      :label="textField.Description"
                      :value="textField.FieldValue"
                      readonly
                      hide-details="auto"
                    ></VTextField>
                  </div>
                </template>
              </VExpansionPanelContent>
              <VDivider></VDivider>
            </VExpansionPanel>
          </VExpansionPanels>
          <VCardText>
            <ValidationProvider name="panel" rules="required" v-slot="{ invalid }">
              <span v-if="invalid" style="color:red;">
                {{ $t(`jquery.validator.required`) }}
              </span>
              <VTextField v-model="panel" class="d-none" />
            </ValidationProvider>
          </VCardText>
          <VCardActions class="my-4">
            <VSpacer></VSpacer>
            <VBtn min-width="10.375rem" color="primary" :disabled="v.invalid" @click.stop="confirmAction">
              {{ $t(`submit`) }}
            </VBtn>
            <VSpacer></VSpacer>
          </VCardActions>
        </VCard>
      </ValidationObserver>
    </VContainer>
    <VContainer class="mt-8" v-if="activePage == 'PaymentConfirmation'">
      <div class="betfont icon-check-o text-center"></div>
      <h2 class="text-center mb-10">{{$t(`payment.submitted`)}}</h2>
      <VCard
        class="rounded-lg mx-auto faint-outline"
        max-width="28.125rem"
        outlined
      >
        <VCardText>
          <h3 class="text-center text-sm">
            {{$t(`do.you.want.to.make.another.transaction`)}}
          </h3>
        </VCardText>
        <VCardActions class="pb-6">
          <VSpacer></VSpacer
          ><VBtn depressed color="primary" large @click.stop="activePage = 'PaymentListing'">{{$t(`new.transaction`)}}</VBtn>
          <VSpacer></VSpacer>
        </VCardActions>
      </VCard>
      <div class="text-center my-12">
        <VBtn text color="blue" :to="{ path: `/${$route.params.lang}` }">{{$t(`go.to.homepage`)}}</VBtn>
      </div>
    </VContainer> 
  </div>
</template>

<script>
import Vue from 'vue';
import SelectMenu from '@/components/common/SelectMenu.vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';

export default Vue.extend({
  inject: ['reload'],
  name: 'Payment',
  data() {
    return {
      commissionMode: '',
      amount: null,
      panel: null,
      onOpenSelect: false,
      activePage: 'PaymentListing', // or PaymentConfirmation
    };
  },
  created: function() {  
    this.fetchPaymentInfo();
    Promise.all([this.checkSession()]).then(() => { 
      if(this.SessionModel.Status != 1)   
      {
        this.$router.push({ path: `/${this.langCode}/` });
        this.reload();
      }  
    });      
  },
  components: {
    SelectMenu,   
    ValidationProvider,
    ValidationObserver
  },
  computed: {
    ...mapGetters({
      langCode: 'langCode',
    }),      
    ...mapState('Payment', ['PaymentInfo']),   
    ...mapState('Auth',['SessionModel'])
  },   
  methods: {
    ...mapActions('Auth', ['checkSession']),
    ...mapActions('Payment', ['fetchPaymentInfo', 'submitPayment']),
    ...mapActions({
      openDialog: 'DialogQueue/queue',
      closeDialog: 'DialogQueue/close',
    }),
    onSubmit: function() {
      this.commissionMode = this.PaymentInfo.CommRcvList[this.panel ?? 0].FieldName;
      this.PaymentInfo.CommRcvOpt = this.commissionMode;
      this.PaymentInfo.Amount = this.amount;
      this.submitPayment(this.PaymentInfo).then((_response) => {
        if (_response.Status === 1) {
          let payload = {
            title: '',
            msg: _response.Message
          };
          this.openDialog({ 
            payload, 
            setting: {maxWidth: '18.5rem', closeOnClickOutside: true}
          });
        }else{
          this.activePage = "PaymentConfirmation";
        }
      });
    },
    confirmAction: function(event) {
      let payload = {
        title: this.$t(`you.want.to.submit`),
        msg: this.$t(`clicking.submit.will.confirm.that`),
        buttons: [
          {
            text: this.$t(`not.yet`),
            color: 'blue--text',
            action: this.closeModal,
          },
          {
            text: this.$t(`submit`),
            color: 'blue--text',
            action: () => {
              this.onSubmit();
              this.closeModal;
            },
          },
        ],
      };
      this.openDialog({
        payload,
        setting: { maxWidth: '18.5rem', closeOnClickOutside: true },
      });
    },
    onChangeActivePage(){
      this.activePage = "PaymentListing";
    },
    onCloseDetails(){
      this.$emit('onCloseDetails');
    }
  },
});
</script>
<style lang="scss" scoped>
@import '../../assets/scss/05_pages/payments';
</style>
