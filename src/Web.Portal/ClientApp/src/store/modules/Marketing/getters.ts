import { GetterTree } from 'vuex';
import * as _marketing from './typings';

const getters: GetterTree<_marketing.MarketingState, any> = {
  //Link
  getLinkNameAsArray(state: _marketing.MarketingState) : string[] {
    const _links = state.Links;
    const _array : string[] = [];
    for (let index = 0; index < _links.length; index++) {
      _array.push(_links[index].Code);
    }
    return _array;
  },
  getLinkItemByCode: (state: _marketing.MarketingState) => (code : string) : _marketing.MarketingLinkModel | undefined => {
    const _match = state.Links.find(x => x.Code == code);
    return _match;
  },

  //Banner
  getBannerNameAsArray(state: _marketing.MarketingState) : string[] {
    const _bannerNames = state.CollateralList.CollateralList;
    const _array : string[] = [];
    for (let index = 0; index < _bannerNames.length; index++) {
      _array.push(_bannerNames[index].Name);
    }
    return _array;
  },
  getBannerItemByName: (state: _marketing.MarketingState) => (name : string) : _marketing.CollateralModel | undefined => {
    const _match = state.CollateralList.CollateralList.find(x => x.Name == name);
    return _match;
  }
};

export default getters;