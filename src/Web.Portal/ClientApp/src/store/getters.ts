import { Language } from './typings';
import { RootState } from '@/store/typings';
import { GetterTree } from 'vuex';

const getters: GetterTree<RootState, any> = {
    Languages:state=>state.gv.lans,
    langCode: state => state.gv.lan,
    GoogleTagId:state => state.gv.googletagid,
    cdnurl:state => state.gv.cdnurl
};
export default getters;