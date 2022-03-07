<template>
  <VCard
    class="transaction-view rounded-lg"
    :class="{ transparent: $vuetify.breakpoint.smAndDown }"
    :elevation="$vuetify.breakpoint.mdOnly && mode == `view` ? '4' : '0'"
    :outlined="$vuetify.breakpoint.smAndUp && mode == `view`"
  >
    <div
      @click.stop="$vuetify.breakpoint.mdAndDown ? editDetails() : undefined"
    >
      <VCardTitle class="pb-1 pb-lg-4" v-if="mode == `view`">
        <h2 class="text-md">{{ $t(`transaction`) }}</h2>
        <VSpacer></VSpacer>
        <VBtn
          text
          class="color-link font-weight-bold d-none d-md-none d-lg-block"
          @click.stop="editDetails()"
        >
          {{ $t(`edit`) }}
        </VBtn>
      </VCardTitle>
      <VCardSubtitle class="pt-1 d-block d-lg-none" v-if="mode == `view`">
        {{ $t(`your.transaction.preferences`) }}
      </VCardSubtitle>
      <div :class="{ 'd-none d-lg-block': mode == 'view' }">
        <VDivider></VDivider>
        <VCardText v-if="mode == 'view'">
          <VTextField
            class="is-text"
            :class="{
              'field--sidebar': mode == 'edit',
              'field--active':
                ($vuetify.breakpoint.lgAndUp && mode != 'view') ||
                (enableEdit && mode != 'view'),
            }"
            filled
            label="Transaction Method"
            :value="getTransationName(profileModel.CommRcvOpt)"
            hide-details="auto"
          ></VTextField>
        </VCardText>
        <div v-if="mode != 'view'">
          <VCardText>
            <span class="text-md">
              {{ $t(`send.us.an.email`) }}
            </span>
            <VCard class="mt-4" flat color="#fff8e1">
              <VCardText
                ><span class="text-sm">{{
                  $t(`after.transferring.the.commission`)
                }}</span>
              </VCardText>
            </VCard>
          </VCardText>
          <VRadioGroup v-model="transactionMethod">
            <VCardText>
              <VRadio
                value="comm.rcv.field.bank.transfer"
                on-icon="icon-radio-on"
                off-icon="icon-radio-off"
                :disabled="!enableEdit && $vuetify.breakpoint.mdAndDown"
              >
                <template v-slot:label>
                  <div>{{ $t(`comm.rcv.field.bank.transfer`) }}</div>
                </template>
              </VRadio>
              <VRow
                dense
                v-show="transactionMethod == `comm.rcv.field.bank.transfer`"
              >
                <div
                  v-for="(item, index) in profileModel.CommRcvList.find(
                    (x) => x.FieldName === `comm.rcv.field.bank.transfer`
                  ).Data"
                  v-bind:key="index"
                >
                  <VCol cols="12">
                    <VTextField
                      class="is-text"
                      :class="{
                        'field--sidebar': mode == 'edit',
                        'field--active':
                          ($vuetify.breakpoint.lgAndUp && mode != 'view') ||
                          (enableEdit && mode != 'view'),
                      }"
                      filled
                      :label="$t(item.FieldName)"
                      :value="item.FieldValue"
                      hide-details="auto"
                      :readonly="
                        ($vuetify.breakpoint.lgAndUp && mode != 'view') ||
                        (enableEdit && mode != 'view')
                          ? false
                          : true
                      "
                    ></VTextField>
                  </VCol>
                </div>
              </VRow>
              <div v-if="transactionMethod == `comm.rcv.field.bank.transfer`">
                <VBtn
                  text
                  color="blue"
                  v-if="
                    !enableEdit &&
                      mode != 'view' &&
                      !$vuetify.breakpoint.lgAndUp
                  "
                  @click.stop="enableEdit = true"
                >
                  Edit
                </VBtn>
              </div>
            </VCardText>
            <VDivider></VDivider>
            <VCardText>
              <VRadio
                value="comm.rcv.field.moneybookers"
                on-icon="icon-radio-on"
                off-icon="icon-radio-off"
                :disabled="!enableEdit && $vuetify.breakpoint.mdAndDown"
                v-show="mode != 'view'"
              >
                <template v-slot:label>
                  <div>
                    {{ $t(`comm.rcv.field.moneybookers`) }}
                  </div>
                </template>
              </VRadio>
              <VRow dense>
                <div
                  v-for="(item, index) in profileModel.CommRcvList.find(
                    (x) => x.FieldName === `comm.rcv.field.moneybookers`
                  ).Data"
                  v-bind:key="index"
                >
                  <VCol
                    cols="12"
                    v-show="transactionMethod == `comm.rcv.field.moneybookers`"
                  >
                    <VTextField
                      class="is-text"
                      :class="{
                        'field--sidebar': mode == 'edit',
                        'field--active':
                          ($vuetify.breakpoint.lgAndUp && mode != 'view') ||
                          (enableEdit && mode != 'view'),
                      }"
                      filled
                      :label="$t(item.FieldName)"
                      :value="item.FieldValue"
                      hide-details="auto"
                    ></VTextField>
                  </VCol>
                  <div
                    v-if="transactionMethod == `comm.rcv.field.moneybookers`"
                  >
                    <VBtn
                      text
                      color="blue"
                      v-if="
                        !enableEdit &&
                          mode != 'view' &&
                          !$vuetify.breakpoint.lgAndUp
                      "
                      @click.stop="enableEdit = true"
                    >
                    </VBtn>
                  </div>
                </div>
              </VRow>
            </VCardText>
            <VDivider></VDivider>
            <VCardText>
              <VRadio
                value="comm.rcv.field.188.account"
                on-icon="icon-radio-on"
                off-icon="icon-radio-off"
                :disabled="!enableEdit && $vuetify.breakpoint.mdAndDown"
                v-show="mode != 'view'"
              >
                <template v-slot:label>
                  <div>
                    {{ $t(`comm.rcv.field.188.account`) }}
                  </div>
                </template>
              </VRadio>
              <VRow dense>
                <div
                  v-for="(item, index) in profileModel.CommRcvList.find(
                    (x) => x.FieldName === `comm.rcv.field.188.account`
                  ).Data"
                  v-bind:key="index"
                >
                  <VCol
                    cols="12"
                    v-show="transactionMethod == `comm.rcv.field.188.account`"
                  >
                    <VTextField
                      class="is-text"
                      :class="{
                        'field--sidebar': mode == 'edit',
                        'field--active':
                          ($vuetify.breakpoint.lgAndUp && mode != 'view') ||
                          (enableEdit && mode != 'view'),
                      }"
                      filled
                      :label="$t(item.FieldName)"
                      :value="item.FieldValue"
                      hide-details="auto"
                    ></VTextField>
                  </VCol>
                </div>
              </VRow>
              <div v-if="transactionMethod == `comm.rcv.field.188.account`">
                <VBtn
                  text
                  color="blue"
                  v-if="
                    !enableEdit &&
                      mode != 'view' &&
                      !$vuetify.breakpoint.lgAndUp
                  "
                  @click.stop="enableEdit = true"
                >
                </VBtn>
              </div>
            </VCardText>
            <VDivider></VDivider>
          </VRadioGroup>
        </div>
      </div>
    </div>
    <div v-if="mode != `view`">
      <VCardActions
        class="justify-end mr-2"
        v-if="$vuetify.breakpoint.lgAndUp || enableEdit"
      >
        <VBtn outlined color="gray" class="mr-1" @click.stop="cancelAction">
          {{ $t(`cancel`) }}
        </VBtn>
      </VCardActions>
    </div>
  </VCard>
</template>
<script>
import { VBtn, VRow, VCol, VCard, VCardText } from 'vuetify/lib';
import { mapActions } from 'vuex';
export default {
  name: 'Transaction',
  data() {
    return {
      transactionMethod: '',
      onEditDetails: false,
    };
  },
  components: {
    VBtn,
    VRow,
    VCol,
    VCard,
    VCardText,
  },
  props: {
    profileModel: {
      type: Object,
      default: () => ({}),
    },
    mode: { default: 'view' },
    enableEdit: { default: false },
  },
  created: function() {
    this.transactionMethod = this.profileModel.CommRcvOpt;
  },
  methods: {
    ...mapActions({
      openDialog: 'DialogQueue/queue',
      closeDialog: 'DialogQueue/close',
    }),
    cancelAction: function(event) {
      let payload = {
        title: this.$t(`leave.this.page`),
        msg: this.$t(`If.you.leave.now`),
        buttons: [
          {
            text: this.$t(`stay.on.page`),
            color: 'blue--text',
            action: () => {
              this.closeDialog();
            },
          },
          {
            text: this.$t(`leave`),
            color: 'blue--text',
            action: () => {
              this.onCloseDetails();
            },
          },
        ],
      };
      this.openDialog({
        payload,
        setting: { maxWidth: '18.5rem', closeOnClickOutside: true },
      });
    },
    getTransationName(transactionMethod) {
      return this.$t(transactionMethod);
    },
    editDetails() {
      this.$emit('openEditDetails');
    },
    onCloseDetails() {
      this.$emit('onCloseDetails');
      // this.enableEdit = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/transaction';
</style>
