<template>
  <ValidationObserver v-slot="v" ref="form">
    <VCard
      class="general-account-view"
      :elevation="$vuetify.breakpoint.mdAndDown && mode == `view` ? '4' : '0'"
      :outlined="$vuetify.breakpoint.mdAndUp && mode == `view`"
      :class="
        $vuetify.breakpoint.mdAndDown ? 'rounded-0 rounded-t-lg' : 'rounded-lg'
      "
    >
      <div
        @click.stop="$vuetify.breakpoint.mdAndDown ? editDetails() : undefined"
      >
        <VCardTitle class="pb-1 pb-lg-4" v-if="mode == `view`">
          <h2 class="text-md ">{{ $t(`generalaccount`) }}</h2>
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
          {{ $t(`name.and.preferences`) }}
        </VCardSubtitle>
      </div>
      <div :class="{ 'd-none d-lg-block': mode == 'view' }">
        <VDivider></VDivider>
        <VCardText>
          <VRow dense>
            <VCol cols="6" :class="{ 'col-lg-4': mode == 'view' }">
              <VTextField
                class="is-text"
                :class="{
                  'field--sidebar': mode == 'edit',
                }"
                filled
                :label="$t(`first.name`)"
                :value="
                  profileModel.Code == undefined
                    ? '————'
                    : profileModel.FirstName
                "
                v-model="profileModel.FirstName"
                hide-details="auto"
                readonly
              ></VTextField>
            </VCol>
            <VCol cols="6" :class="{ 'col-lg-4': mode == 'view' }">
              <VTextField
                class="is-text"
                :class="{
                  'field--sidebar': mode == 'edit',
                }"
                filled
                :label="$t(`last.name`)"
                :value="
                  profileModel.Code == undefined
                    ? '————'
                    : profileModel.LastName
                "
                v-model="profileModel.LastName"
                hide-details="auto"
                readonly
              ></VTextField>
            </VCol>
            <VCol v-if="mode == 'view'" cols="4"></VCol>
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
                :label="$t(`preferred.language`)"
                :value="getLanguageText(profileModel.Language)"
                hide-details="auto"
                readonly
                @click.stop="
                  $vuetify.breakpoint.lgAndUp || enableEdit
                    ? openSelect('lang')
                    : undefined
                "
              ></VTextField>
              <ValidationProvider
                name="language"
                rules="required"
                v-slot="{ invalid }"
              >
                <VTextField v-model="profileModel.Language" class="d-none" />
                <span v-if="invalid && mode != 'view'" style="color:red;">{{
                  $t(`jquery.validator.required`)
                }}</span>
              </ValidationProvider>
            </VCol>
            <VCol cols="6" :class="{ 'col-lg-4': mode == 'view' }">
              <VTextField
                class="is-text"
                :class="{
                  'field--sidebar': mode == 'edit',
                }"
                filled
                :label="$t(`preferred.currency`)"
                :value="
                  profileModel.Currency == undefined
                    ? '————'
                    : profileModel.Currency
                "
                v-model="profileModel.Currency"
                hide-details="auto"
                readonly
              ></VTextField>
            </VCol>
            <VCol :class="{ 'col-4': mode == 'view' }">
              <VTextField
                class="is-text"
                :class="{
                  'field--sidebar': mode == 'edit',
                }"
                filled
                :label="$t(`affiliate.code`)"
                :value="
                  profileModel.Code == undefined ? '————' : profileModel.Code
                "
                v-model="profileModel.Code"
                hide-details="auto"
                readonly
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
    </VCard>
  </ValidationObserver>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  name: 'GeneralAccount',
  data() {
    return {
      optionsPayload: [],
    };
  },
  components: {
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
    ...mapState('Common', ['Languages']),
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
    editDetails() {
      this.$emit('openEditDetails', false);
    },
    onCloseDetails() {
      this.$emit('onCloseDetails');
      // this.enableEdit = false;
    },
    getLanguageText(code) {
      let _item = this.Languages.find((item) => item.Code == code);

      if (_item === undefined) return '————';

      return _item?.Descr;
    },
    openSelect(selectType) {
      this.optionsPayload = Object.values(this.Languages).map((item) => {
        return {
          key: item.Code,
          text: item.Descr,
        };
      });
      this.$emit('openSelect', this.optionsPayload, selectType);
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
@import '../../assets/scss/04_templates/_general-account';
</style>
