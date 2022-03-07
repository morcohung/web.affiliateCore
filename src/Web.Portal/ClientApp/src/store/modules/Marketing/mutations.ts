import { MutationTree } from 'vuex';
import { MarketingState } from './typings';
import * as _mutation from './mutation-types';

const mutations: MutationTree<MarketingState> = {
  [_mutation.SET_COLLATERAL_LIST]:(state: MarketingState, collateralList) => {
    state.CollateralList = collateralList;
  },

  [_mutation.SET_LINK_LIST]:(state: MarketingState, links) => {
    state.Links = links;
  },

  [_mutation.SET_COLLATERAL_CLASSIFICATION_LIST]:(state: MarketingState, collateralClassificationList) => {
    state.CollateralClassificationList = collateralClassificationList;
  },

  [_mutation.SET_SCRIPT]:(state: MarketingState, marketingScript) => {
    state.MarketingScript = marketingScript;
  }
};
export default mutations;