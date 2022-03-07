<template>
  <div>
    <router-view />
    <TheFooter />
  </div>
</template>
<script>
import TheFooter from '@/components/common/TheFooter.vue';

export default {
  name: 'HeaderFooterLayout',
  data: () => ({}),
  components: {
    TheFooter,
  },
};
</script>
