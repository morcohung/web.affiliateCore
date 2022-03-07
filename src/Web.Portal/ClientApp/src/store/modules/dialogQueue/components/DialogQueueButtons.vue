<template>
  <div class="flex-grow-1 text-right">
    <VBtn
      text
      v-for="(item, index) in buttons"
      :class="
        item.color ? item.color : index === buttons.length - 1 ? 'primary' : ''
      "
      @click="buttonClick(index)"
      :key="index"
    >
      {{ item.text }}
    </VBtn>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { VBtn } from 'vuetify/lib';
export default {
  name: 'DialogQueueButtons',
  components: {
    VBtn,
  },
  props: {
    buttons: {
      type: Array,
    },
  },
  methods: {
    buttonClick(index) {
      const setting = this.buttons[index];
      if (setting?.action) {
        setting.action();
      }
      this.close();
    },
    ...mapActions({ close: 'DialogQueue/close' }),
  },
};
</script>
<style lang="scss" scoped>
.text-link {
  color: $blue-link;
}
</style>
