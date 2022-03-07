<template>
  <div>
    <VCardTitle class="dialog-default text-md pa-2">
      <div class="flex-grow-1">
        <div class="inner-text d-flex align-center justify-content-between">
          <div
            class="dialog-title flex-grow-1 pl-4 font-weight-bold text-xl"
            :class="'text-' + align"
          >
            <div v-if="subTitle.length > 0" class="text--secondary text-xs">
              {{ subTitle }}
            </div>
            <div>{{ title }}</div>
          </div>
          <VBtn icon v-show="!hideClose" @click="closeAction">
            <span class="betfont icon-close"></span>
          </VBtn>
        </div>
      </div>
    </VCardTitle>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { VCardTitle, VBtn } from 'vuetify/lib';
export default {
  name: 'DialogQueueHeader',
  components: {
    VCardTitle,
    VBtn,
  },
  props: {
    title: {
      type: String,
    },
    subTitle: {
      type: String,
    },
    align: {
      type: String,
      default: 'left',
    },
    hideClose: {
      type: Boolean,
      default: false,
    },
    contentClass: {
      type: String,
      default: '',
    },
    action: {
      type: Function,
    },
  },
  methods: {
    ...mapActions({ close: 'DialogQueue/close' }),
    closeAction() {
      this.close();
      if (this.action) {
        this.action();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog-default {
  &::v-deep {
    @include icon(('icon-close'));
    .dialog-title {
      line-height: 1.2em;
      word-break: normal;
    }
  }
}
</style>
