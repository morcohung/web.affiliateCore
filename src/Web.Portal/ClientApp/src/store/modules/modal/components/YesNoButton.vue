<template>
  <div class="flex-grow-1 text-center">
    <VBtn class="btn btn-regular mr-1" text @click="close">
      <slot>{{ buttonTextNo }}</slot>
    </VBtn>
    <VBtn class="btn btn-regular ml-1" color="primary" @click="close">
      <slot>{{ buttonTextYes }}</slot>
    </VBtn>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import { VBtn } from 'vuetify/lib';
export default {
  name: 'Modal',
  components: {
    VBtn
  },
  props: {
    buttonTextYes: {
      type: String,
      default: 'Submit'
    },
    buttonTextNo: {
      type: String,
      default: 'Cancel'
    }
  },
  methods: {
    ...mapMutations({ close: 'Modal/CLOSE_MODAL' })
  }
};
</script>