<template>
  <VContainer>
    <h1 class="text-xxxl mb-8">{{ title }}</h1>
    <VSheet color="transparent" class="mb-4">
      <slot>
        <div class="static-page--content">
          <p>{{ message }}</p>
        </div>
      </slot>
      <VList class="rounded-lg" outlined>
          <VListItemGroup>
            <slot name='list-items'></slot>
          </VListItemGroup>
      </VList>
    </VSheet>
  </VContainer>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'StaticListPage',
  props: ['title','message']
});
</script>