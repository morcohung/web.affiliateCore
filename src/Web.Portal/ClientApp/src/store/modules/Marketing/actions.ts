import { ResponseModel } from '@/store/modules/Web/typings';
import { ActionTree } from 'vuex';
import { RootState } from '@/store/typings';
import { MarketingState, FilterModel, MarketingScriptModel, AddLinkModel } from './typings';
import { 
  SET_COLLATERAL_LIST
  , SET_LINK_LIST
  , SET_COLLATERAL_CLASSIFICATION_LIST 
  , SET_SCRIPT
} from './mutation-types';
import { 
  getCollateralClassificationList
  , getCollateralList
  , getLink
  , getScript
  , addLink
  , addScript
} from './api';

const actions: ActionTree<MarketingState, RootState> = {
  async fetchCollateralList({ commit }, content: FilterModel) {
    const _result = await getCollateralList(content, content.Page);
    commit(SET_COLLATERAL_LIST, _result.data);
  },

  async fetchLink({ commit }) {
    const _result = await getLink();
    commit(SET_LINK_LIST, _result.data);
  },

  async fetchCollateralClassificationList({ commit }, id: string){
    const _result = await getCollateralClassificationList(id);
    commit(SET_COLLATERAL_CLASSIFICATION_LIST, _result.data);
  },

  async fetchScript({ commit }, id: string){
    const _result = await getScript(id);
    commit(SET_SCRIPT, _result.data);
  },

  async addLink({ commit }, content: AddLinkModel) : Promise<ResponseModel> {
    const _result = await addLink(content);
    if(_result.status === 200)
    {
      const _linkResult = await getLink();
      commit(SET_LINK_LIST, _linkResult.data);
    }
    return _result.data;
  },

  async addScript({ commit }, marketScriptModel: MarketingScriptModel)
    : Promise<MarketingScriptModel> {
    const _result = await addScript(marketScriptModel);
    return _result.data;
  }
};
 
export default actions;
