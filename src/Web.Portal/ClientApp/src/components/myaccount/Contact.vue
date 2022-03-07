<template>
  <ValidationObserver v-slot="v" ref="form">
    <VCard
      class="contact-view rounded-lg"
      :class="{ white: $vuetify.breakpoint.smAndDown }"
      :elevation="$vuetify.breakpoint.mdOnly && mode == `view` ? '4' : '0'"
      :outlined="$vuetify.breakpoint.smAndUp && mode == `view`"
    >
      <div
        @click.stop="$vuetify.breakpoint.mdAndDown ? editDetails() : undefined"
      >
        <VCardTitle class="pb-1 pb-lg-4" v-if="mode == `view`">
          <h2 class="text-md ">
            {{ $t(`contact`) }}
          </h2>
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
          {{ $t(`contact.number.and.email`) }}
        </VCardSubtitle>
        <div :class="{ 'd-none d-lg-block': mode == 'view' }">
          <VDivider></VDivider>
          <VCardText>
            <VRow dense>
              <VCol cols="12">
                <VTextField
                  class="is-text"
                  :class="{
                    'field--sidebar': mode == 'edit',
                  }"
                  filled
                  :label="$t(`email`)"
                  v-model="profileModel.Email"
                  hide-details="auto"
                  readonly
                ></VTextField>
              </VCol>
              <VCol
                :class="mode == 'view' ? 'col-lg-4' : 'col-4 col-md-4 col-lg-6'"
              >
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
                  :label="$t(`area.code`)"
                  :value="getDialCodeTextByCode(profileModel.DialCode)"
                  hide-details="auto"
                  readonly
                  @click.stop="
                    $vuetify.breakpoint.lgAndUp || enableEdit
                      ? openSelect('DialCode')
                      : undefined
                  "
                ></VTextField>
                <ValidationProvider
                  name="dialCode"
                  rules="required"
                  v-slot="{ invalid }"
                >
                  <VTextField v-model="profileModel.DialCode" class="d-none" />
                  <span v-if="invalid && mode != 'view'" style="color:red;">{{
                    $t(`jquery.validator.required`)
                  }}</span>
                </ValidationProvider>
              </VCol>
              <VCol
                :class="mode == 'view' ? 'col-lg-8' : 'col-8 col-md-8 col-lg-6'"
              >
                <ValidationProvider
                  name="contactnumber"
                  rules="required"
                  v-slot="{ invalid }"
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
                    :label="$t('contact.number')"
                    :value="
                      profileModel.ContactNo == undefined
                        ? '————'
                        : profileModel.ContactNo
                    "
                    v-model="profileModel.ContactNo"
                    oninput="value=value.replace(/[^\d]/g, '')"
                    hide-details="auto"
                  ></VTextField>
                  <span v-if="invalid && mode != 'view'" style="color:red;">{{
                    $t(`jquery.validator.required`)
                  }}</span>
                </ValidationProvider>
              </VCol>
              <VCol cols="12" v-if="mode == `edit`">
                <VCardSubtitle class="pt-4 d-none d-lg-block">
                  {{ $t(`other.communication.channel`) }}
                </VCardSubtitle>
              </VCol>
              <VCol cols="6" :class="{ 'col-lg-4': mode == 'view' }">
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
                  :label="$t(`channel`)"
                  :value="getChatToolTextByCode(profileModel.ChatTool)"
                  hide-details="auto"
                  readonly
                  @click.stop="
                    $vuetify.breakpoint.lgAndUp || enableEdit
                      ? openSelect('ChatTool')
                      : undefined
                  "
                ></VTextField>
              </VCol>
              <VCol cols="6" :class="{ 'col-lg-4': mode == 'view' }">
                <VTextField
                  class="is-text"
                  :class="{
                    'field--sidebar': mode == 'edit',
                    'field--active':
                      ($vuetify.breakpoint.lgAndUp && mode != 'view') ||
                      (enableEdit && mode != 'view'),
                  }"
                  filled
                  :label="$t(`chat.address`)"
                  :value="
                    profileModel.ChatAddress == undefined
                      ? '————'
                      : profileModel.ChatAddress
                  "
                  v-model="profileModel.ChatAddress"
                  hide-details="auto"
                ></VTextField>
              </VCol>
            </VRow>
          </VCardText>
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
              >{{ $t(`submit`) }}</VBtn
            >
          </VCardActions>
        </div>
      </div>
    </VCard>
  </ValidationObserver>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import { VBtn, VRow, VCol, VCard, VCardText, VDivider } from 'vuetify/lib';
export default {
  name: 'Contact',
  data: () => ({}),
  components: {
    VBtn,
    VRow,
    VCol,
    VCard,
    VCardText,
    VDivider,
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    profileModel: {
      type: Object,
      default: () => ({}),
    },
    mode: { default: 'view' },
    enableEdit: { default: false },
  },
  computed: {
    ...mapState('Common', ['ChatTools', 'DialCodes']),
    ...mapGetters('Common', [
      'getChatToolOptions',
      'getChatToolTextByCode',
      'getDialCodeOptions',
      'getDialCodeTextByCode'
    ])
  },
  mounted() {
    extend('required', { ...required });
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
            action: () => {
              this.closeDialog();
            },
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
    onUpdateProfile() {
      this.$emit('onUpdateProfile');
    },
    editDetails() {
      this.$emit('openEditDetails');
    },
    onCloseDetails() {
      this.$emit('onCloseDetails');
      // this.enableEdit = false;
    },
    openSelect(selectType) {
      if (selectType === 'ChatTool') {
        this.optionsPayload = this.getChatToolOptions;
      }
      if (selectType === 'DialCode') {
        this.optionsPayload = this.getDialCodeOptions;
      }
      this.$emit('openSelect', this.optionsPayload, selectType);
    },
    closeSelect() {
      this.$emit('closeSelect');
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_contact';
</style>
