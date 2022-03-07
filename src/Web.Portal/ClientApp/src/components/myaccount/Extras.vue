<template>
  <VCard
    class="extras-view rounded-lg"
    :class="{ white: $vuetify.breakpoint.smAndDown }"
    :elevation="$vuetify.breakpoint.mdOnly && mode == `view` ? '4' : '0'"
    :outlined="$vuetify.breakpoint.smAndUp && mode == `view`"
  >
    <div
      @click.stop="$vuetify.breakpoint.mdAndDown ? editDetails() : undefined"
    >
      <VCardTitle class="pb-1 pb-lg-4" v-if="mode == `view`">
        <h2 class="text-md">{{ $t(`extras`) }}</h2>
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
        {{ $t(`optional.info.about.you`) }}
      </VCardSubtitle>
      <div :class="{ 'd-none d-lg-block': mode == 'view' }">
        <VDivider></VDivider>
        <VCardText>
          <VRow dense>
            <VCol
              v-for="profileItem in profileModel.ProfileList"
              :key="profileItem.FieldName"
              :cols="mode == 'edit' ? 12 : 6"
              class="mb-5"
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
                :label="$t(profileItem.FieldName)"
                :value="profileItem.FieldValue"
                v-model="profileItem.FieldValue"
                hide-details="auto"
                :readonly="
                  ($vuetify.breakpoint.lgAndUp && mode != 'view') ||
                  (enableEdit && mode != 'view')
                    ? false
                    : true
                "
              ></VTextField>
            </VCol>
          </VRow>
        </VCardText>
      </div>
    </div>
    <div v-if="mode != `view`">
      <!-- Side Edit Page -->
      <VCardActions
        class="justify-end mr-2"
        v-if="$vuetify.breakpoint.lgAndUp || enableEdit"
      >
        <VBtn outlined color="gray" class="mr-1" @click.stop="cancelAction">
          {{ $t(`cancel`) }}
        </VBtn>
        <VBtn depressed color="primary" @click.stop="confirmAction">
          {{ $t(`submit`) }}
        </VBtn>
      </VCardActions>
    </div>
  </VCard>
</template>
<script>
import { VBtn, VRow, VCol, VCard, VCardText, VCardSubtitle } from 'vuetify/lib';
import { mapActions } from 'vuex';
export default {
  name: 'Extras', 
  data() {
    return {
      onEditDetails: false,
    };
  },
  props: {
    profileModel: {
      type: Object,
      default: () => ({}),
    },
    mode: { default: 'view' },
    enableEdit: { default: false },
  },
  components: {
    VBtn,
    VRow,
    VCol,
    VCard,
    VCardText,
    VCardSubtitle,
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
    editDetails() {
      this.$emit('openEditDetails');
    },
    onCloseDetails() {
      this.$emit('onCloseDetails');
      this.enableEdit = false;
    },
    onUpdateProfile() {
      this.$emit('onUpdateProfile');
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/extras';
</style>
