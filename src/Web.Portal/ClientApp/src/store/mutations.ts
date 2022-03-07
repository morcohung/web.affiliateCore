import { MutationTree } from 'vuex';
import * as mutationTypes from './mutation-type';
import { RootState } from './typings';
import MobileDetect from 'mobile-detect';

const mutations: MutationTree<RootState> = {
    [mutationTypes.SET_CURRENT_LAN](state) {
     
      const language = location.pathname.split('/')[1];    
      const matchLan = state.gv.lans.filter(function (lan) {
        return lan.value === language;
      });
      const defLan = matchLan.length > 0 ? matchLan[0] : getBrowserLan();
      state.gv.language = defLan;
      state.gv.lan = defLan.value;

      function getBrowserLan() {
        const browserLan = navigator.language.substr(0, 2).toLowerCase();
        const defLan = state.gv.lans.filter(lan => lan.value.includes(browserLan));
        return defLan.length !== 0 ? defLan[0] : state.gv.lans[0];
      }
    },
    [mutationTypes.CHANGE_CURRENT_LAN](state, langCode) {     
      const language = langCode;      
      const matchLan = state.gv.lans.filter(function (lan) {
        return lan.value === language;
      });
      const defLan = matchLan.length > 0 ? matchLan[0] : getBrowserLan();
      state.gv.language = defLan;
      state.gv.lan = defLan.value;

      function getBrowserLan() {
        const browserLan = navigator.language.substr(0, 2).toLowerCase();
        const defLan = state.gv.lans.filter(lan => lan.value.includes(browserLan));
        return defLan.length !== 0 ? defLan[0] : state.gv.lans[0];
      }
    },    
    [mutationTypes.INIT_DEVICE_OS]: (state: RootState) => {
        // * use light weight solution,
        // * the only thing we need to know is device OS by useragent
        const md = new MobileDetect(window.navigator.userAgent);
        let deviceOS = '';    
        switch (md.os()) {
          case 'iOS':
            deviceOS = 'iOS';
            break;
          case 'AndroidOS':
            deviceOS = 'Android';
            break;
          default:
            deviceOS = 'HTML5';
            break;
        }
    
        state.uv.sessionD.deviceOS = deviceOS;
      },
};

export default mutations;