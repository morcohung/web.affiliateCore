<template>
  <div class="countdown flex-grow-1 text-center">
    <VBtn class="px-0 mr-1 countdown-button" disabled color="primary" @click="close">
      <VProgressLinear color="primary" value="50" rounded v-if="isDisabled">
        <template v-slot="">
          {{ buttonTextYes }}
        </template>
      </VProgressLinear>
      <span class="px-4" v-if="!isDisabled">{{ buttonTextYes }}</span>
    </VBtn>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import { VBtn } from 'vuetify/lib';
export default {
  name: 'CountdownButton',
  data() {
    return {
      isDisabled: true
    };
  },
  components: {
    VBtn
  },
  props: {
    buttonTextYes: {
      type: String,
      default: 'OK'
    }
  },
  methods: {
    ...mapMutations({ close: 'Dialog/CLOSE_DIALOG' })
  }
};
</script>
<style lang="scss" scoped>
// @import '../../../../../../SharedAssets/Mobile/scss/04_templates/_countdown-button';
</style>
