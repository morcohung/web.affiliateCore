<template>
  <div>
    <VCard flat>
      <VCardText class="pb-0">
        <VCard class="faint-outline" outlined>
          <VCardText>
            <h2 class="text-sm">
              <span class="text--secondary">{{
                awardBonusModel.balance.MemberCurrency
              }}</span>
              <span class="text--primary">
                {{
                  formatNumber(
                    awardBonusModel.balance.RemainingBalanceMemCurrency
                  )
                }}
              </span>
            </h2>
            <h3 class="text-xs">{{ $t(`award.bonus.balance`) }}</h3>
          </VCardText>
        </VCard>
      </VCardText>
      <VCardText>
        <VForm ref="form">
          <VTextField
            filled
            hide-details="auto"
            class="mb-4"
            :label="$t(`award.bonus.amount`)"
            v-model="submissionModel.Amount"
            required
            :rules="rules.amount"
          ></VTextField>
          <VTextField
            filled
            hide-details="auto"
            class="mb-4"
            :label="$t(`award.bonus.rollover`)"
            v-model="submissionModel.Rollover"
            required
            :rules="rules.rollover"
          ></VTextField>
          <VTextarea
            filled
            hide-details="auto"
            counter="150"
            :label="$t(`award.bonus.remark`)"
            v-model="submissionModel.Remark"
          ></VTextarea>
        </VForm>
      </VCardText>
      <VCardActions class="px-4 d-flex justify-end">
        <VBtn
          outlined
          small
          class="mr-2 faint-outline "
          @click.stop="confirmAction"
          >{{ $t(`cancel`) }}</VBtn
        >
        <VBtn
          small
          color="primary"
          depressed
          @click.stop="confirmAction"
          :disabled="!isFormValid()"
          >{{ $t(`submit`) }}</VBtn
        >
      </VCardActions>
    </VCard>
    <VDialog v-model="awardBonusModel.loading" persistent width="300" lazy>
      <VCard color="primary" dark>
        <VCardText>
          Please wait
          <VProgressLinear
            indeterminate
            color="white"
            class="mb-0"
          ></VProgressLinear>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { formatNumber } from '@/utils/numberFormat';
export default {
  data() {
    return {
      submissionModel: {
        Amount: null,
        Rollover: null,
        Remark: '',
      },
      rules: {
        amount: [(val) => (!isNaN(val) && val > 0) || 'Please enter an amount'],
        rollover: [
          (val) =>
            (!isNaN(val) && val > 0 && val <= 35) ||
            this.$t(`error.award.bonus.rollover`),
        ],
      },
    };
  },
  props: {
    awardBonusModel: {
      type: Object,
      default: () => {},
    },
  },
  components: {},
  computed: {
    ...mapState('Common', ['Languages']),
  },
  methods: {
    ...mapActions({
      openDialog: 'DialogQueue/queue',
      closeDialog: 'DialogQueue/close',
    }),
    confirmAction: function(event) {
      if (this.isFormValid()) {
        let payload = {
          title: `Award ${
            this.awardBonusModel.balance.MemberCurrency
          } ${this.formatNumber(this.submissionModel.Amount)}?`,
          msg: this.$t(`clicking.submit.will.confirm.that`),
          buttons: [
            {
              text: this.$t(`not.yet`),
              color: 'text-link',
              action: this.closeModal,
            },
            {
              text: this.$t(`submit`),
              color: 'text-link',
              action: () => {
                this.submitAwardBonus();
              },
            },
          ],
        };
        this.openDialog({
          payload,
          setting: { maxWidth: '18.5rem', persistent: true },
        });
      }
    },
    submitAwardBonus() {
      if (this.isFormValid()) {
        this.submissionModel.MemberCode = this.awardBonusModel.balance.MemberCode;
        this.$emit('submitAwardBonus', this.submissionModel);
      }
    },
    isFormValid() {
      if (this.$refs.form) {
        return this.$refs.form.validate();
      } else {
        return false;
      }
    },
    formatNumber(number) {
      return formatNumber(number);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_referrals-award-bonus';
</style>
