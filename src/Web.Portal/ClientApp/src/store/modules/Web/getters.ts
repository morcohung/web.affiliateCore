import { SelectOptionItem } from '@/store/typings';
import { GetterTree } from 'vuex';
import { SecurityQuestion, WebState } from './typings';

const getters: GetterTree<WebState, any> = {
  //Security Question
  getSecurityQuestionOptions(state: WebState) : SelectOptionItem[] {
    return state.SecurityQuestions.map(
      (item) => <SelectOptionItem> {
        key: item.Code,
        text: item.Descr,
      }
    );
  },
  getSecurityQuestionTextByCode: (state) => (code: string) : string => {
    let _item = state.SecurityQuestions.find((item) => item.Code == code);
    if (_item === undefined) return '————';
    return _item?.Descr;
  }
 
};

export default getters;