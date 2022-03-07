<template>
  <div class="pie-chart">
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      height="22"
      width="22"
      viewBox="0 0 22 22"
    >
      <circle r="10.5" cx="10.5" cy="10.5" fill="#666666" />
      <circle r="10" cx="10" cy="10" fill="#666666" />

      <circle
        id="value-1"
        r="5"
        cx="9.5"
        cy="10.5"
        fill="transparent"
        stroke="#ff9200"
        stroke-width="10"
        :stroke-dasharray="calculatePercentage(pieSlice, 100)"
        transform="rotate(-90) translate(-20)"
      />
      <!--calc in JS like this: stroke-dasharray="calc(XX * 31.4 / 100) 31.4", where XX is 0 to 100 -->
    </svg>
  </div>
</template>
<script>
export default {
  data: () => ({
    strokeDashArray: [],
  }),
  props: {
    pieSlice: { required: true, default: 25 },
  },
  methods: {
    calculatePercentage(pieSlice, pieTotal) {
      this.strokeDashArray = [((pieSlice / pieTotal) * 100 * 31.4) / 100, 31.4];
      return this.strokeDashArray;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_pie-chart';
</style>
