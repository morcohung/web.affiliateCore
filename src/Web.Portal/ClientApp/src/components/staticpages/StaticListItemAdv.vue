<template>
  <div>
    <StaticListItem :text='this.text'>
      <template>
        <div class="pa-8">
          <h2 class="text-xxxl mb-8">
            <slot name='dialog-title'></slot>
            {{ dialogTitle }}
          </h2>
          <div>
            <p class="text-md">
              <slot></slot>
            </p>
          </div>
          <slot name='external'></slot>
        </div>
      </template>
    </StaticListItem>
  </div>
</template>

<script>
import Vue from 'vue';
import StaticListItem from '@/components/staticpages/StaticListItem'

export default Vue.extend({
  name: 'StaticListItemAdv',
  props: ['text', 'dialogTitle'],
  components: {
    StaticListItem
  }
});
</script>