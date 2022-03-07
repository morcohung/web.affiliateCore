<template>
  <ValidationObserver v-slot="v" ref="form">
    <VCard
      class="security-view rounded-lg"
      :class="{ white: $vuetify.breakpoint.smAndDown }"
      :elevation="$vuetify.breakpoint.mdOnly && mode == `view` ? '4' : '0'"
      :outlined="$vuetify.breakpoint.smAndUp && mode == `view`"
    >
      <div
        @click.stop="$vuetify.breakpoint.mdAndDown ? editDetails() : undefined"
      >
        <VCardTitle class="pb-1 pb-lg-4" v-if="mode == `view`">
          <h2 class="text-md">{{ $t(`security`) }}</h2>
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
          {{ $t(`make.your.account.more.secure`) }}
        </VCardSubtitle>
        <div :class="{ 'd-none d-lg-block': mode == 'view' }">
          <VDivider></VDivider>
          <VCardText>
            <VRow dense>
              <VCol cols="12" class="mb-5">
                <VTextField
                  class="is-text"
                  :class="{
                    'field--sidebar': mode == 'edit',
                    'field--active':
                      ($vuetify.breakpoint.lgAndUp && mode != 'view') ||
                      (enableEdit && mode != 'view'),
                  }"
                  :append-icon="
                    ($vuetify.breakpoint.lgAndUp && mode != 'view') ||
                    (enableEdit && mode != 'view')
                      ? 'icon-arrowhead-down'
                      : ''
                  "
                  filled
                  :label="$t(`security.question`)"
                  :value="
                    getSecurityQuestionTextByCode(profileModel.SecurityQuestion)
                  "
                  hide-details="auto"
                  readonly
                  @click.stop="
                    $vuetify.breakpoint.lgAndUp || enableEdit
                      ? openSelect('SecurityQuestion')
                      : undefined
                  "
                ></VTextField>
                <ValidationProvider
                  name="securityQuestion"
                  rules="required"
                  v-slot="{ invalid }"
                >
                  <VTextField
                    v-model="profileModel.SecurityQuestion"
                    class="d-none"
                  />
                  <span v-if="invalid && mode != 'view'" style="color:red;">{{
                    $t(`jquery.validator.required`)
                  }}</span>
                </ValidationProvider>
              </VCol>
              <VCol cols="12" class="mb-5" v-if="mode == 'edit'">
                <VTextField
                  class="is-text"
                  :class="{
                    'field--sidebar': mode == 'edit',
                    'field--active':
                      ($vuetify.breakpoint.lgAndUp && mode != 'view') ||
                      (enableEdit && mode != 'view'),
                  }"
                  filled
                  :label="$t(`security.answer`)"
                  :type="showAnswer ? 'text' : 'password'"
                  :append-icon="
                    showAnswer ? 'icon-show-password' : 'icon-hide-password'
                  "
                  v-model="profileModel.SecurityAnswer"
                  hide-details="auto"
                  :readonly="
                    ($vuetify.breakpoint.lgAndUp && mode != 'view') ||
                    (enableEdit && mode != 'view')
                      ? false
                      : true
                  "
                  @click:append="showAnswer = !showAnswer"
                ></VTextField>
              </VCol>
            </VRow>
          </VCardText>
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
          <VBtn
            depressed
            color="primary"
            :disabled="v.invalid"
            @click.stop="confirmAction"
          >
            {{ $t(`submit`) }}
          </VBtn>
        </VCardActions>
      </div>
    </VCard>
  </ValidationObserver>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  data: () => ({
    showAnswer: false,
  }),
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    ...mapState('Web', ['SecurityQuestions']),
    ...mapGetters('Web', ['getSecurityQuestionOptions', 'getSecurityQuestionTextByCode']),
  },
  props: {
    profileModel: {
      type: Object,
      default: () => ({}),
    },
    mode: { default: 'view' },
    enableEdit: { default: false },
  },
  methods: {
    ...mapActions({
      openDialog: 'DialogQueue/queue',
      closeDialog: 'DialogQueue/close',
    }),
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
              this.onUpdateProfile();
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
    openSelect(selectType) {
      this.optionsPayload = this.getSecurityQuestionOptions;
      this.$emit('openSelect', this.optionsPayload, selectType);
    },
    editDetails() {
      this.$emit('openEditDetails');
    },
    onCloseDetails() {
      this.$emit('onCloseDetails');
      //this.enableEdit = false;
    },
    closeSelect() {
      this.$emit('closeSelect');
    },
    onUpdateProfile() {
      this.$emit('onUpdateProfile');
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/security';
</style>
