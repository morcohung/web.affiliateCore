import { SelectOptionItem } from '@/store/typings';
import { GetterTree } from 'vuex';
import { CommonState } from './typings';

const getters: GetterTree<CommonState, any> = {

  //ChatTool
  getChatToolOptions(state: CommonState) : SelectOptionItem[] {
    return state.ChatTools.map(
      (item) => <SelectOptionItem> {
        key: item.Code,
        text: item.Descr,
      }
    );
  },
  getChatToolTextByCode: (state: CommonState) => (code: string) : string => {
    const _item = state.ChatTools.find((item) => item.Code == code);
    if (_item === undefined) return '————';
    return _item?.Descr;
  },

  //DialCode
  getDialCodeOptions(state: CommonState) : SelectOptionItem[] {
    return state.DialCodes.map(
      (item) => <SelectOptionItem> {
        key: item.Code,
        text: item.Descr,
      }
    );
  },
  getDialCodeTextByCode: (state: CommonState) => (code: string) : string => {
    const _item = state.DialCodes.find((item) => item.Code == code);
    if (_item === undefined) return '————';
    return _item?.Descr;
  },

  //Country
  getCountryOptions(state: CommonState) : SelectOptionItem[] {
    return state.Countrys.map(
      (item) => <SelectOptionItem> {
        key: item.Code,
        text: item.LangValue,
      });
  },
  getCountryTextByCode: (state: CommonState) => (code : string) : string => {
    let _item = state.Countrys.find((item) => item.Code == code);
    if (_item === undefined) return '————';
    return _item?.LangValue;
  }
};

export default getters;