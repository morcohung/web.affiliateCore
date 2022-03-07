<template>
  <div>
    <TheHeader :fullTableView="fullTableView" />
    <router-view />
    <TheFooter />
  </div>
</template>
<script>
import TheHeader from '@/components/common/TheHeader.vue';
import TheFooter from '@/components/common/TheFooter.vue';

export default {
  name: 'HeaderFooterLayout',
  data: () => ({
    fullTableView: false,
  }),
  components: {
    TheFooter,
    TheHeader,
  },
};
</script>
