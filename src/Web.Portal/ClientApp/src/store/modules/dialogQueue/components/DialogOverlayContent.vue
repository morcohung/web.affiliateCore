<template>
  <div class="scrim-close" @click.stop="closeAction"></div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'DialogOverlayContent',
  components: {},
  props: {},
  methods: {
    ...mapActions({ close: 'DialogQueue/close' }),
    closeAction() {
      this.close();
    },
  },
};
</script>
<style lang="scss" scoped>
.scrim-close {
  height: 100%;
  width: 100%;
  background: transparent;
}
</style>
