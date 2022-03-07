<template>
  <div>
    <VOverlay v-if="visible && closeOnClickOutside" z-index="10">
      <DialogOverlayContent></DialogOverlayContent>
    </VOverlay>
    <VDialog
      v-model="visible"
      :content-class="contentClass"
      :hide-overlay="closeOnClickOutside ? true : hideOverlay"
      :persistent="closeOnClickOutside ? true : persistent"
      :no-click-animation="noClickAnimation"
      :max-width="maxWidth"
      :width="width"
      @click:outside="closeDialog"
    >
      <VCard class="rounded-lg">
        <DialogHeader
          :title="title"
          :subTitle="subTitle"
          :align="titleAlign"
          :action="closeAction"
        />
        <VDivider v-if="separator"></VDivider>
        <VCardText class="card-body text-md" :class="{ 'px-0': noBodyPadding }">
          <p class="color-black" v-html="msg"></p>
        </VCardText>

        <VCardActions class="footer-actions pb-4" v-show="!hideActionButtons">
          <DialogQueueButtons :buttons="buttons" />
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>
<script>
import DialogHeader from '@/store/modules/dialogQueue/components/DialogQueueHeader.vue';
import DialogQueueButtons from '@/store/modules/dialogQueue/components/DialogQueueButtons.vue';
import DialogOverlayContent from '@/store/modules/dialogQueue/components/DialogOverlayContent.vue';
import { mapState, mapActions } from 'vuex';
import { VDialog, VCard, VCardText, VCardActions } from 'vuetify/lib';
export default {
  name: 'DialogQueue',
  components: {
    VDialog,
    VCard,
    VCardText,
    VCardActions,
    DialogHeader,
    DialogQueueButtons,
    DialogOverlayContent,
  },
  computed: {
    ...mapState({
      visible: (state) => state.DialogQueue.visible,
      // UI Setting
      titleAlign: (state) => state.DialogQueue.option.setting.titleAlign,
      contentClass: (state) => state.DialogQueue.option.setting.contentClass,
      hideOverlay: (state) => state.DialogQueue.option.setting.hideOverlay,
      separator: (state) => state.DialogQueue.option.setting.separator,
      persistent: (state) => state.DialogQueue.option.setting.persistent,
      noBodyPadding: (state) => state.DialogQueue.option.setting.noBodyPadding,
      noClickAnimation: (state) =>
        state.DialogQueue.option.setting.noClickAnimation,
      hideClose: (state) => state.DialogQueue.option.setting.hideClose,
      hideActionButtons: (state) =>
        !state.DialogQueue.option.payload.buttons.length > 0,
      // !!state.DialogQueue.option.payload.buttons?.length,
      // payload for message, text and action
      title: (state) => state.DialogQueue.option.payload.title,
      subTitle: (state) => state.DialogQueue.option.payload.subTitle,
      msg: (state) => state.DialogQueue.option.payload.msg,
      buttons: (state) => state.DialogQueue.option.payload.buttons,
      closeAction: (state) => state.DialogQueue.option.payload.closeAction,
      maxWidth: (state) => state.DialogQueue.option.setting.maxWidth,
      width: (state) => state.DialogQueue.option.setting.width,
      closeOnClickOutside: (state) =>
        state.DialogQueue.option.setting.closeOnClickOutside,
    }),
  },
  methods: {
    ...mapActions({ close: 'DialogQueue/close' }),
    closeDialog() {
      this.close();
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../../../assets/scss/04_templates/_dialog-queue';
</style>
