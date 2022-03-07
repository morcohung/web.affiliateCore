import { Module } from 'vuex';
import { MarketingState } from './typings';
import { RootState } from '@/store/typings';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state: MarketingState = {
  CollateralList: {
    Status: 0,
    Message: '',
    Params: null,
    CollateralList: [
      {
        Id: '',
        Classification: '',
        PreviewUrl: '',
        LangDescr: '',
        TypeDescr: '',
        SizeCode: '',
        Name: '',
        EffectiveDate: ''
      }
    ],
    Page: {
      Size: 0,
      Total: 0,
      Count: 0,
      IndexStart: 0,
      BarSize: 0,
      Index: 0
    }
  },
  Links: [{
    Id: '',
    Type: '',
    Code: '',
    LinkUrl: '',
    QRUrl: ''
  }],
  CollateralClassificationList: {
    Status: 0,
    Message: '',
    Params: null,
    CollateralClassificationList: [
      {
        Id: '',
        LangId:  '',
        LangDescr: '',
        Descr: ''
      }
    ]
  },
  MarketingScript: {
    Status: 0,
    Message: '',
    Params: null,
    Id: '',
    Name: '',
    Script: ''
  },
  Filter: {
    LangId: '',
    ClassId: '',
    Page: 0
  },
  Page: 0
};

const Marketing: Module<MarketingState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

export default Marketing;