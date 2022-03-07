<template>
  <div class="line-chart">
    <VContainer fluid>
      <TrendChart
        class="stats-chart"
        :datasets="dataSets"
        :grid="grid"
        :labels="labels"
        :min="0"
        :interactive="true"
        @mouse-move="onMouseMove"
        ref="anchorEl"
      >
      </TrendChart>
      <VOverlay
        v-if="isTouchCapable()"
        class="mobile-overlay"
        :class="{ in: tooltipData }"
      ></VOverlay>
      <div
        id="pop"
        role="tooltip"
        ref="tooltip"
        class="tooltip"
        :class="{
          'is-active': tooltipData,
          'is-mobile': isTouchCapable(),
        }"
      >
        <VCard class="tooltip-container" flat v-if="tooltipData">
          <div v-if="isTouchCapable()">
            <VToolbar flat color="transparent">
              <VSpacer>{{ labels.xLabels[tooltipData.index] }}</VSpacer>
              <VBtn icon @click.stop="tooltipData = false"
                ><span class="betfont icon-close"></span
              ></VBtn>
            </VToolbar>
            <VDivider></VDivider>
          </div>
          <VCardText>
            <h2 class="text-md mb-2 d-none d-md-block">
              {{ labels.xLabels[tooltipData.index] }}
            </h2>
            <VRow dense>
              <VCol class="text-sm">
                {{ dataTitle }}
              </VCol>
              <VCol cols="12">
                <div>
                  <div v-if="tooltipData.data.length === 3" style="float:left">
                    <VAvatar
                      class="mr-2"
                      :class="{
                        orange: tooltipData.data.length === 3,
                        green: tooltipData.data.length === 1,
                      }"
                      size=".75rem"
                      v-if="!isTouchCapable()"
                    ></VAvatar>
                    <div v-else="isTouchCapable()">
                      {{ this.$t(`signUps`) }}
                    </div>
                  </div>
                  <div v-if="tooltipData.data.length === 1" style="float:left">
                    <VAvatar
                      class="mr-2"
                      :class="{
                        orange: tooltipData.data.length === 3,
                        green: tooltipData.data.length === 1,
                      }"
                      size=".75rem"
                      v-if="!isTouchCapable()"
                    ></VAvatar>
                    <div v-else="isTouchCapable()">
                      {{ this.$t(`commissions.earned`) }}
                    </div>
                  </div>
                  <div style="float:right">
                    {{ tooltipData.data[0] | balanceCommaFormat }}
                  </div>
                </div>
              </VCol>
              <VCol cols="12" v-if="tooltipData.data.length === 3">
                <div>
                  <div style="float:left">
                    <VAvatar
                      class="mr-2"
                      :color="'purple'"
                      size=".75rem"
                      v-if="!isTouchCapable()"
                    ></VAvatar>
                    <div v-else="isTouchCapable()">
                      {{ this.$t(`new.deposits`) }}
                    </div>
                  </div>
                  <div style="float:right">
                    {{ tooltipData.data[1] | balanceCommaFormat }}
                  </div>
                </div>
              </VCol>
              <VCol cols="12" v-if="tooltipData.data.length === 3">
                <div>
                  <div style="float:left">
                    <VAvatar
                      class="mr-2"
                      :color="'blue'"
                      size=".75rem"
                      v-if="!isTouchCapable()"
                    ></VAvatar>
                    <div v-else="isTouchCapable()">
                      {{ this.$t(`actives`) }}
                    </div>
                  </div>
                  <div style="float:right">
                    {{ tooltipData.data[2] | balanceCommaFormat }}
                  </div>
                </div>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </div>

      <VRow dense class="legend">
        <VCol
          class="d-flex align-center justify-center"
          v-for="(legend, index) in dataSets"
          :key="index"
        >
          <VAvatar :color="legend.className" size=".75rem"></VAvatar>
          <span class="label text-xs">{{ legend.title }}</span>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>
<script>
import TrendChart from 'vue-trend-chart';
import Popper from 'popper.js';
import balanceCommaFormat from '@/filters/balanceCommaFormat';
export default {
  filters: { balanceCommaFormat },
  data: () => ({
    tooltipShow: true,
    grid: {
      verticalLines: true,
      horizontalLines: true,
    },
    tooltipData: null,
    popper: null,
    popperIsActive: false,
  }),
  props: {
    dataSets: { required: true, default: [] },
    labels: { required: true, default: [] },
    dataTitle: { required: true, default: '' },
  },
  components: {
    TrendChart,
  },
  methods: {
    initPopper() {
      const chart = document.querySelector('.stats-chart');
      const ref = chart.querySelector('.active-line');
      const tooltip = this.$refs.tooltip;
      this.popper = new Popper(ref, tooltip, {
        placement: 'right',
        modifiers: {
          offset: { offset: '0,10' },
          preventOverflow: {
            boundariesElement: chart,
          },
        },
      });
    },
    onMouseMove(params) {
      this.popperIsActive = !!params;
      this.popper.scheduleUpdate();
      this.tooltipData = params || null;
    },
    isTouchCapable() {
      return (
        'ontouchstart' in window ||
        navigator.msMaxTouchPoints ||
        window.navigator.userAgent.indexOf('Mobile') > -1
      );
    },
  },
  mounted() {
    this.initPopper();
  },
};
</script>
<style lang="scss">
@import '../../assets/scss/04_templates/_line-chart';
</style>
