<template>
  <VContainer class="text-center">
    <VAvatar class="mt-12 mb-4" size="5rem">
      <span class="success-icon betfont icon-check-o green--text"></span>
    </VAvatar>
    <h1 class="text-xl mb-4">{{$t(`registration`)}} {{$t(`settle.result.pay.status.successful`)}}!</h1>
    <p class="mb-12">
        {{$t(`welcome.to.188bet.affiliate`)}}
    </p>
    <VBtn class="mb-12" text color="blue"
    :to="{ path: `/${this.$route.params.lang}/`,}"
      ><span class="text-md font-weight-bold">{{$t(`go.to.homepage`)}}</span></VBtn
    >
  </VContainer>
</template>

<style lang="scss" scoped>
.container {
  &::v-deep {
    @include icon('icon-check-o');
    .success-icon {
      font-size: rem(80);
    }
  }
}
</style>
