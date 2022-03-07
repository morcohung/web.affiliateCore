<template>
  <div>
    <VDialog
      v-model="visible"
      :content-class="contentClass"
      :hide-overlay="hideOverlay"
      :persistent="persistent"
      :no-click-animation="noClickAnimation"
    >
      <VCard>
        <ModalHeader :title="title" :titleAlign="titleAlign" :action="close" />
        <VCardText class="card-body text-md">
          <p v-html="msg"></p>
        </VCardText>
        <VCardActions class="footer-actions pb-4" v-show="showButton">
          <AlertButton :buttons="buttons"></AlertButton>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>
<script>
import ModalHeader from '@/store/modules/modal/components/ModalHeader.vue';
import AlertButton from '@/store/modules/modal/components/AlertButton.vue';
import { mapState } from 'vuex';
import { VDialog, VCard, VCardText, VCardActions, VBtn } from 'vuetify/lib';
export default {
  name: 'Modal',
  components: {
    ModalHeader,
    AlertButton,
    VDialog,
    VCard,
    VCardText,
    VCardActions,
    VBtn
  },
  data() {
    return {
      title: '',
      msg: '',
      buttons: [],
      close: () => {}
    };
  },
  watch: {
    payload: {
      deep: true,
      handler(newVal, oldVal) {
        this.title = newVal.title;
        this.msg = newVal.msg;
        this.close = newVal.close || this.cancel;
        if (!newVal.buttons) {
          this.buttons = [
            {
              text: newVal.buttonText || this.$t('txtBtnComOk'),
              color: 'primary',
              action: this.close
            }
          ];
        } else {
          this.buttons = newVal.buttons;
        }
      }
    }
  },
  methods: {
    cancel() {
      this.$store.commit('Modal/CLOSE_MODAL');
    }
  },
  computed: {
    ...mapState({
      payload: state => state.Modal.payload,
      titleAlign: state => state.Modal.setting.titleAlign,
      contentClass: state => state.Modal.setting.contentClass,
      hideOverlay: state => state.Modal.setting.hideOverlay,
      persistent: state => state.Modal.setting.persistent,
      noClickAnimation: state => state.Modal.setting.noClickAnimation,
      showButton: state => state.Modal.setting.showButton
    }),
    visible: {
      get() {
        return this.$store.state.Modal.visible;
      },
      set(val) {
        this.$store.state.Modal.visible = val;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
// /* Style Libraries */
// @import '../../../../../../SharedAssets/Mobile/scss/01_atoms/buttons';
// /* Component-specific styles */
// @import '../../../../../../SharedAssets/Mobile/scss/04_templates/modal-dialog-alert';
</style>
