import Vue from 'vue';
import { loadLanguageAsync } from '../i18n/i18n';
import VueRouter, { NavigationGuardNext, Route } from 'vue-router';
import { supportLanguages } from '@/constants/language.constant';
import { routes } from '@/router/router.config';
import store from '@/store/store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  routes
});

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
  // store.commit('LoadingMask/SHOW_LOADING_MASK');
  // store.commit('SET_FROM_ROUTE', from);
  const targetLang = to.params.lang;
  const lang = supportLanguages.includes(targetLang) ? targetLang : supportLanguages[0];
  loadLanguageAsync(lang)
    .then(() => {
      next();
    })
    .catch(error => {
      // console.log('error:', error);
      next();
    });
});

router.afterEach((to: Route, from: Route) => {
  // store.dispatch('LoadingMask/hideLoadingMask');
  // store.commit('Menu/CLOSE_BURGER_MENU');
});

export default router;
