<template>
  <VList class="pa-0">
    <template v-for="summary in summaryList">
      <VListItem class="px-8" @click.stop="confirmAction(summary)">
        <VRow class="align-center py-4">
          <VCol class="text-sm">{{ summary.CreateDate }}</VCol>
          <VCol class="d-flex justify-end">
            <div class="font-weight-bold">
              <div class="text-sm">
                <span class="text--secondary">{{ summary.Currency }}</span>
                <span class="text--primary">
                  {{ formatNumber(summary.Amount) }}
                </span>
              </div>
              <div class="text-xs text--secondary">
                {{ $t(`award.bonus.rollover`) }}: {{ summary.Rollover }}
              </div>
            </div>
          </VCol>
        </VRow>
      </VListItem>
      <VDivider></VDivider>
    </template>
  </VList>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { formatNumber } from '@/utils/numberFormat';
export default {
  data: () => ({}),
  props: {
    summaryList: {
      type: Array,
      default: () => [],
    },
    memberCode: '',
  },
  components: {},
  computed: {
    ...mapState('Common', ['Languages']),
  },
  methods: {
    ...mapActions({
      openDialog: 'DialogQueue/queue',
      closeDialog: 'DialogQueue/close',
    }),
    confirmAction(summary) {
      let payload = {
        title: this.memberCode,
        msg: `<div role="listitem" class="px-6 v-list-item v-list-item--link theme--light">\
          <div  class="row align-center py-4">\
          <div  class="text-sm col">${this.$t(`award.bonus.amount`)}</div>\
          <div  class="d-flex justify-end col">\
          <div  class="font-weight-bold">\
          <span  class="text--primary">${summary.Currency} ${this.formatNumber(
          summary.Amount
        )} </span>\
          </div>\
          </div>\
          </div>\
          </div>\
          </div>\
          <hr role="separator" aria-orientation="horizontal" class="v-divider theme--light">\
          <div role="listitem" class="px-6 v-list-item v-list-item--link theme--light">\
          <div  class="row align-center py-4">\
          <div  class="text-sm col">${this.$t(`award.bonus.rollover`)}</div>\
          <div  class="d-flex justify-end col">\
          <div  class="font-weight-bold">\
          <span  class="text--primary">${summary.Rollover}</span>\
          </div>\
          </div>\
          </div>\
          </div>\
          </div>\
          <hr role="separator" aria-orientation="horizontal" class="v-divider theme--light">\
          <div role="listitem" class="px-6 v-list-item v-list-item--link theme--light">\
          <div  class="row align-center py-4">\
          <div  class="text-sm col">Date</div>\
          <div  class="d-flex justify-end col">\
          <div  class="font-weight-bold">\
          <span  class="text--primary">${summary.CreateDate} </span>\
          </div>\
          </div>\
          </div>\
          </div>\
          </div>\
          <p class="px-6">\
          <strong>${this.$t(`award.bonus.remark`)}:</strong>\
          <span class="text--secondary">${summary.Remark}</span>\
          </p>\
          `,
        buttons: [
          {
            text: this.$t(`okayBtn`),
            color: 'text-link',
            action: this.closeModal,
          },
        ],
      };
      this.openDialog({
        payload,
        setting: {
          maxWidth: '18.5rem',
          separator: true,
          hideActionButtons: true,
          noBodyPadding: true,
        },
      });
    },
    formatNumber(number) {
      return formatNumber(number);
    },
  },
};
</script>
<style lang="scss" scoped>
.text-link {
  color: $blue-link;
}
</style>
