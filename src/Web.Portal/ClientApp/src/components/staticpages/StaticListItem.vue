<template>
  <div>
    <VListItem @click.stop="toggleDialog = true">
      {{ text }}
    </VListItem>
    <VDialog :content-class="$vuetify.breakpoint.mdAndUp ? 'static-content-dialog desktop-drawer' : 'static-content-dialog mobile-drawer'" 
          v-model="toggleDialog" 
          transition="v-slide-x-reverse">
      <VSheet color="'transparent'">
        <VAppBar height="auto" flat absolute color="white">
          <VBtn icon class="ml-n3" @click.stop="toggleDialog = false">
            <span class="betfont icon-stick-arrow-left"></span>
          </VBtn>
        </VAppBar>
        <div class="v-app-bar"></div>
        <VDivider></VDivider>
        <slot></slot>
      </VSheet>
    </VDialog>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'StaticListItem',
  data() {
    return {
      toggleDialog: false
    };
  },
  props: ['text']
});
</script>