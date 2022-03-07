<template>
  <VSheet color="transparent">
    <VContainer>
      <VRow dense>
        <VCol cols="12">
          <VCard
            flat
            color="transparent"
            min-height="15rem"
            class="d-flex align-center"
          >
            <VCardText>
              <span
                class="background-icon betfont icon-warning-3angle-o"
              ></span>
              <h1 class="text-xxl mb-4 text--primary">{{$t(`location.forbidden`)}}</h1>
              <h2
                class="text-xl"
                :class="{ 'fill-width': $vuetify.breakpoint.smAndDown }"
              >
                <span
                  >{{$t(`forbidden.page`)}}</span>
              </h2>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </VSheet>
</template>
<script>
import { VContainer, VSheet, VRow, VCol, VCard } from 'vuetify/lib';
export default {
  name: 'ForbiddenPage',
  data: () => ({
    loggedIn: false,
  }),
  components: {
    VContainer,
    VSheet,
    VRow,
    VCol,
    VCard,
  },
};
</script>
<style lang="scss" scoped>
.background-icon {
  color: $red;
  opacity: 0.12;
  font-size: rem(165);
  position: absolute;
  right: 0;
  top: rem(105);
}
@include icon(('icon-warning-3angle-o'));
h2 {
  &:not(.fill-width) {
    max-width: calc(100% - #{rem(120)});
  }
}
</style>
