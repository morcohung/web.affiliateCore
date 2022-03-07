<template>
  <div>
    <TheHeader />
    <router-view />
    <TheFooter />
  </div>
</template>
<script>
import TheHeader from '@/components/common/NoMenuHeader.vue';
import TheFooter from '@/components/common/TheFooter.vue';

export default {
  name: 'HeaderFooterLayout',
  components: {
    TheFooter,
    TheHeader
  }
};
</script>