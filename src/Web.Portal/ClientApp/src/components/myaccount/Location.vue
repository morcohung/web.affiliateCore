<template>
  <ValidationObserver v-slot="v" ref="form">
    <VCard
      class="location-view rounded-lg"
      :class="{ white: $vuetify.breakpoint.smAndDown }"
      :elevation="$vuetify.breakpoint.mdOnly && mode == `view` ? '4' : '0'"
      :outlined="$vuetify.breakpoint.smAndUp && mode == `view`"
    >
      <div
        @click.stop="$vuetify.breakpoint.mdAndDown ? editDetails() : undefined"
      >
        <VCardTitle class="pb-1 pb-lg-4" v-if="mode == `view`">
          <h2 class="text-md ">{{ $t(`location`) }}</h2>
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
          {{ $t(`your.address.and.country`) }}
        </VCardSubtitle>
        <div :class="{ 'd-none d-lg-block': mode == 'view' }">
          <VDivider></VDivider>
          <VCardText>
            <VRow dense>
              <VCol cols="12">
                <ValidationProvider
                  name="address"
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
                    :label="$t(`address`)"
                    v-model="profileModel.Address"
                    hide-details="auto"
                  ></VTextField>
                  <span v-if="invalid && mode != 'view'" style="color:red;">{{
                    $t(`jquery.validator.required`)
                  }}</span>
                </ValidationProvider>
              </VCol>
              <VCol cols="6" :class="{ 'col-lg-4': mode == 'view' }">
                <ValidationProvider
                  name="city"
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
                    :label="$t(`city.province`)"
                    v-model="profileModel.City"
                    hide-details="auto"
                  >
                  </VTextField>
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
                  :label="$t(`country`)"
                  :value="getCountryTextByCode(profileModel.Country)"
                  hide-details="auto"
                  readonly
                  @click.stop="
                    $vuetify.breakpoint.lgAndUp || enableEdit
                      ? openSelect('Country')
                      : undefined
                  "
                ></VTextField>
                <ValidationProvider
                  name="country"
                  rules="required"
                  v-slot="{ invalid }"
                >
                  <VTextField v-model="profileModel.Country" class="d-none" />
                  <span v-if="invalid && mode != 'view'" style="color:red;">{{
                    $t(`jquery.validator.required`)
                  }}</span>
                </ValidationProvider>
              </VCol>
              <VCol cols="6" :class="{ 'col-lg-4': mode == 'view' }">
                <ValidationProvider
                  name="postal"
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
                    :label="$t(`postal.code.zip`)"
                    v-model="profileModel.Postal"
                    oninput="value=value.replace(/[^\d]/g, '')"
                    hide-details="auto"
                  ></VTextField>
                  <span v-if="invalid && mode != 'view'" style="color:red;">{{
                    $t(`jquery.validator.required`)
                  }}</span>
                </ValidationProvider>
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
import { mapGetters, mapState, mapActions } from 'vuex';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import { VBtn, VRow, VCol, VCard, VCardText } from 'vuetify/lib';
export default {
  name: 'Location',
  components: {
    VBtn,
    VRow,
    VCol,
    VCard,
    VCardText,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      onEditDetails: false,
    };
  },
  mounted() {
    extend('required', { ...required });
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
    ...mapState('Common', ['Countrys']),
    ...mapGetters('Common', ['getCountryOptions', 'getCountryTextByCode'])
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
    editDetails() {
      this.$emit('openEditDetails');
    },
    onCloseDetails() {
      this.$emit('onCloseDetails', false);
      // this.enableEdit = false;
    },
    openSelect(selectType) {
      this.optionsPayload = this.getCountryOptions;
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
@import '../../assets/scss/04_templates/_location';
</style>
