<template>
  <div>
    <VList class="rounded-lg" outlined>
      <VListItemGroup>
        <template >
          <div v-for="(categoryItem, index) in categoryItems" :key="categoryItem.title">
          <VListItem
            @click.stop="
              moreDetails(true, categoryItem.title, categoryItem.longText)
            "
            >{{ categoryItem.title }}</VListItem
          >
          <VDivider v-if="index < categoryItems.length - 1"></VDivider>
          </div>
        </template>
      </VListItemGroup>
    </VList>
    <SideDrawerDetail
      :showMoreDetails="showMoreDetails"
      :headingSubTitle="headingSubTitle"
      :headingTitle="headingTitle"
      @moreDetails="moreDetails"
    >
      <template slot="sideDrawerContent">
        <div class="pa-8">
          <h2 class="text-xxxl mb-8">
            {{ title }}
          </h2>
          <p class="text-md">
            {{ longText }}
          </p>
          <SubCategoryMenu :categoryItems="subCategoryItems"></SubCategoryMenu>
        </div>
      </template>
    </SideDrawerDetail>
  </div>
</template>

<script>
import SideDrawerDetail from '@/components/reports/SideDrawerDetail';
import SubCategoryMenu from '@/components/staticpages/SubCategoryMenu';
export default {
  name: 'SubCategoryMenu',
  data: () => ({
    showMoreDetails: false,
    sideDrawerContent: '',
    headingSubTitle: '',
    headingTitle: '',
    title: '',
    longText: '',
    subCategoryItems: [
      {
        title: 'Commission rate chart',
        longText:
          '188BET will pay the Affiliate a percentage of the combined month Net Winnings for play on Sportsbook, Casino, Live Casino, Lotto, Mahjong and Virtual Sports generated as a result of a direct referral by the Affiliate. Net winning is: Sportsbook, Casino, Live Casino, Lotto, Mahjong and Virtual Sports gross profits from bets made from customers’ losses less monies paid out to customers as a result of fraud, charge-backs, taxes, banking fees, platform fees, bonuses and other incentives offered to the customer. Referral’s fees and commissions are based upon our good faith calculation, based on our statistics and tracking methods.',
      },
      {
        title: 'Sample commission calculator',
        longText:
          '188BET will pay the Affiliate a percentage of the combined month Net Winnings for play on Sportsbook, Casino, Live Casino, Lotto, Mahjong and Virtual Sports generated as a result of a direct referral by the Affiliate. Net winning is: Sportsbook, Casino, Live Casino, Lotto, Mahjong and Virtual Sports gross profits from bets made from customers’ losses less monies paid out to customers as a result of fraud, charge-backs, taxes, banking fees, platform fees, bonuses and other incentives offered to the customer. Referral’s fees and commissions are based upon our good faith calculation, based on our statistics and tracking methods.',
      },
      {
        title: 'Commission structure from sub-Affiliates',
        longText:
          '188BET will pay the Affiliate a percentage of the combined month Net Winnings for play on Sportsbook, Casino, Live Casino, Lotto, Mahjong and Virtual Sports generated as a result of a direct referral by the Affiliate. Net winning is: Sportsbook, Casino, Live Casino, Lotto, Mahjong and Virtual Sports gross profits from bets made from customers’ losses less monies paid out to customers as a result of fraud, charge-backs, taxes, banking fees, platform fees, bonuses and other incentives offered to the customer. Referral’s fees and commissions are based upon our good faith calculation, based on our statistics and tracking methods.',
      },
    ],
  }),
  props: { categoryItems: { required: true, default: [] } },
  components: { SideDrawerDetail, SubCategoryMenu },
  methods: {
    moreDetails: function(event, title, longText) {
      this.showMoreDetails = event;
      this.title = title;
      this.longText = longText;
    },
  },
};
</script>
<style lang="scss" scoped>
.v-list {
  &::v-deep {
    .v-list-item {
      min-height: rem(23);
      padding-top: rem(24);
      padding-bottom: rem(24);
    }
  }
}
</style>
