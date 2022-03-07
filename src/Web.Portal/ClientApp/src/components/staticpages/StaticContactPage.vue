<template>
  <VContainer>
    <h1 class="text-xxxl mb-8">
      {{ title }}
    </h1>
    <VSheet color="transparent" class="mb-4">
      <div class="static-page--content">
        <p>{{ message }}</p>
      </div>
      <VCard class="rounded-lg" 
        :flat="$vuetify.breakpoint.smAndDown ? false : true"
        :color="$vuetify.breakpoint.smAndDown ? 'undefined' : 'transparent'">
        <VRow dense>
          <slot></slot>
        </VRow>
      </VCard>
    </VSheet>
  </VContainer>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'StaticContactPage',
  props: ['title', 'message']
});
</script>