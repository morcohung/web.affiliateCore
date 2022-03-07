import Vue from 'vue'
import App from './App.vue'
import router from './router/router';
import store from '@/store/store';
import { sync } from 'vuex-router-sync';
import vuetify from './plugins/vuetify';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'vuetify/dist/vuetify.min.css'
import VueTour from 'vue-tour';
import i18n, { loadLanguageAsync  } from './i18n/i18n';
import VueMeta from 'vue-meta';
import '@/utils/dateFormat';
import VueAnalytics from 'vue-analytics'

Vue.use(VueAwesomeSwiper);
Vue.use(VueTour);
Vue.use(VueMeta);
Vue.use(VueAnalytics, {
  id: window.gv.googletagid,
  router,
  autoTracking: {
    pageviewOnLoad: false
  }
})

sync(store, router);

Vue.config.productionTip = false;
Vue.config.devtools = true;

const languageCode = location.pathname.split('/')[1];
if (languageCode) {
  loadLanguageAsync(languageCode);
}
store.dispatch('initApp');

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
