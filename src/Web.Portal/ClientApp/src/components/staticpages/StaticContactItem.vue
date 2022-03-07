<template>
  <VCol cols="12" sm="6">
    <VCard class="rounded-lg"
      :flat="$vuetify.breakpoint.smAndDown ? true : false"
      :color="$vuetify.breakpoint.smAndDown ? 'transparent' : 'undefined'"
    >
      <VCardText class="d-flex align-center">
        <slot>
          <div :class="iconName + ' pa-3 pr-7 betfont text-md'"></div>
          <div>
            <h4 class="text-md">
              <a class="text-decoration-none text--primary"
                v-bind:href="hrefLink">{{ hrefText }}</a
              >
            </h4>
            <h3 class="text-sm text--disabled">{{ quoteText }}</h3>
          </div>
        </slot>
      </VCardText>
    </VCard>
  </VCol>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'StaticContactItem',
  props: ['iconName', 'hrefLink', 'hrefText','quoteText']
});
</script>