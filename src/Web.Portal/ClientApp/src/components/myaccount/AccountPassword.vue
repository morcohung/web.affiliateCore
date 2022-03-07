<template>
  <ValidationObserver v-slot="v" ref="form">
    <VCard
      class="account-password rounded-lg"
      :elevation="$vuetify.breakpoint.mdAndDown && mode == `view` ? '4' : '0'"
      :outlined="$vuetify.breakpoint.mdAndUp && mode == `view`"
    >
      <VCardText>
        <VRow>
          <VCol
            :cols="mode == `view` ? '12' : '12'"
            sm="6"
            class="d-flex align-center"
            v-if="mode == `view`"
          >
            <VAvatar>
              <span class="betfont icon-avatar text-xxxl"></span>
            </VAvatar>
            <div class="ml-4">
              <VCardSubtitle class="pa-0 text-sm"
                >{{ $t(`welcome`) }},</VCardSubtitle
              >
              <VCardTitle class="pa-0 color-black">
                <strong>
                  {{ AccountBalance.LastName }} {{ AccountBalance.FirstName }}
                </strong>
              </VCardTitle>
            </div>
          </VCol>
          <VDivider
            vertical
            v-if="mode == 'view'"
            class="my-4 opcaity-30"
            :class="{ 'd-none d-sm-block d-md-none': mode == `view` }"
          ></VDivider>
          <VCol>
            <VCard
              :color="mode == 'view' ? 'gray' : ''"
              :class="{
                'py-0 py-md-3 px-2 px-md-6 d-flex align-center': mode == 'view',
              }"
              height="100%"
              flat
            >
              <VRow dense>
                <VCol>
                  <ValidationProvider
                    name="CurrentPassword"
                    rules="required"
                    v-slot="{ invalid, errors }"
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
                      :label="
                        mode == 'edit' ? $t(`current.password`) : $t(`password`)
                      "
                      :type="showCurrPass ? 'text' : 'password'"
                      :append-icon="
                        showCurrPass
                          ? 'icon-show-password'
                          : 'icon-hide-password'
                      "
                      v-model="ChangePDModel.Current"
                      hide-details="auto"
                      :readonly="
                        ($vuetify.breakpoint.lgAndUp && mode != 'view') ||
                        (enableEdit && mode != 'view')
                          ? false
                          : true
                      "
                      @click:append="showCurrPass = !showCurrPass"
                    ></VTextField>
                    <span v-if="invalid && mode != 'view'" style="color:red;">{{
                      errors[0]
                    }}</span>
                  </ValidationProvider>
                </VCol>
              </VRow>
              <div v-if="mode == 'edit'">
                <VRow dense class="mt-6">
                  <VCol>
                    <ValidationProvider
                      name="newPassword"
                      :rules="{
                        required: true,  
                        passwordAlphaNum: true,                  
                        passwordMinMax: { min: 6, max: 15 }
                      }"     
                      v-slot="{ invalid, errors }"
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
                        v-model="ChangePDModel.NewPass"
                        :type="showNewPass ? 'text' : 'password'"
                        :append-icon="
                          showNewPass
                            ? 'icon-show-password'
                            : 'icon-hide-password'
                        "
                        :label="
                          mode == 'edit' ? $t(`new.password`) : $t(`password`)
                        "
                        hide-details="auto"
                        :readonly="
                          ($vuetify.breakpoint.lgAndUp && mode != 'view') ||
                          (enableEdit && mode != 'view')
                            ? false
                            : true
                        "
                        @click:append="showNewPass = !showNewPass"
                      ></VTextField>
                      <span
                        v-if="invalid && mode != 'view'"
                        style="color:red;"
                        >{{ errors[0] }}</span
                      >
                    </ValidationProvider>
                  </VCol>
                </VRow>
                <VRow class="mt-6" dense>
                  <VCol>
                    <ValidationProvider
                      name="ConfirmPassword"
                      rules="required|validatePassword"
                      v-slot="{ invalid, errors }"
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
                        :label="$t(`confirm.new.password`)"
                        :type="showConfirmPass ? 'text' : 'password'"
                        :append-icon="
                          showConfirmPass
                            ? 'icon-show-password'
                            : 'icon-hide-password'
                        "
                        v-model="ChangePDModel.ConfirmPass"
                        hide-details="auto"
                        :readonly="
                          ($vuetify.breakpoint.lgAndUp && mode != 'view') ||
                          (enableEdit && mode != 'view')
                            ? false
                            : true
                        "
                        @click:append="showConfirmPass = !showConfirmPass"
                      ></VTextField>
                      <span
                        v-if="invalid && mode != 'view'"
                        style="color:red;"
                        >{{ errors[0] }}</span
                      >
                    </ValidationProvider>
                  </VCol>
                </VRow>
              </div>
              <VSpacer></VSpacer>
              <VBtn
                text
                class="link color-link font-weight-bold"
                @click.stop="editDetails()"
                v-if="mode == 'view'"
                >{{ $t(`change.password`) }}</VBtn
              >
            </VCard>
          </VCol>
        </VRow>
      </VCardText>
      <div v-if="mode != `view`">
        <VCardActions
          class="justify-end mr-2"
          v-if="$vuetify.breakpoint.lgAndUp || enableEdit"
        >
          <VBtn outlined color="gray" class="mr-1" @click.stop="cancelAction">
            {{ $t(`cancel`) }}
          </VBtn>
          <VBtn
            depressed
            color="primary"
            :disabled="v.invalid"
            @click.stop="confirmAction"
            >{{ $t(`submit`) }}</VBtn
          >
        </VCardActions>
      </div>
    </VCard>
  </ValidationObserver>
</template>
<script>
import { VBtn, VRow, VCol, VCard, VCardText, VCardSubtitle } from 'vuetify/lib';
import { mapState, mapActions } from 'vuex';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, alpha_num  } from 'vee-validate/dist/rules'; 
import minMax from '@/rules/minMax';
export default {
  name: 'AccountPassword',
  props: {
    mode: { default: 'view' },
    enableEdit: { default: false },
  },
  data: () => ({
    showCurrPass: false,
    showNewPass: false,
    showConfirmPass: false,
    ChangePDModel: {
      Current: '',
      NewPass: '',
      ConfirmPass: '',
    },
  }),
  components: {
    VBtn,
    VRow,
    VCol,
    VCard,
    VCardText,
    VCardSubtitle,
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    ...mapState('Account', ['AccountBalance']),
  },
  mounted() {
    extend('required', { 
      ...required,
      message: this.$t(`jquery.validator.required`)
     }); 
    extend('validatePassword', (value) => {
      if (value === this.ChangePDModel.NewPass) {
        return true;
      }
      return this.$t(`confirm.password.not.validate`);
    });
    extend('passwordMinMax', {
      ...minMax,
      message: this.$t('helpJoinUsPassword')
    });     
    extend('passwordAlphaNum', {
      ...alpha_num,
      message: this.$t('helpJoinUsPassword')
    });    
  },
  methods: {
    ...mapActions({
      openDialog: 'DialogQueue/queue',
      closeDialog: 'DialogQueue/close',
      changePassword: 'Account/changePassword',
    }),
    editDetails() {
      this.$emit('openEditDetails');
    },
    closeDetails() {
      this.$emit('onCloseDetails');
      // this.enableEdit = false;
    },
    confirmAction: function(event) {
      let payload = {
        title: this.$t(`you.want.to.submit`),
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
              this.onUpdatePassword();
              this.closeDetails();
            },
          },
        ],
      };
      this.openDialog({
        payload,
        setting: { maxWidth: '18.5rem', closeOnClickOutside: true },
      });
    },
    cancelAction: function(event) {
      let payload = {
        title: this.$t(`leave.this.page`),
        msg: this.$t(`If.you.leave.now`),
        buttons: [
          {
            text: this.$t(`stay.on.page`),
            color: 'blue--text',
            action: this.closeModal,
          },
          {
            text: this.$t(`leave`),
            color: 'blue--text',
            action: () => {
              this.closeDetails();
            },
          },
        ],
      };
      this.openDialog({
        payload,
        setting: { maxWidth: '18.5rem', closeOnClickOutside: true },
      });
    },
    onUpdatePassword() {
      this.changePassword(this.ChangePDModel);
      this.ChangePDModel.Current = '';
      this.ChangePDModel.NewPass = '';
      this.ChangePDModel.ConfirmPass = '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_account-password';
</style>
