import { Route, RouteConfig, NavigationGuardNext } from 'vue-router';
import store from '@/store/store';
import { supportLanguages } from '@/constants/language.constant';
import { importPage, importLayout } from '@/utils/dynamic-import';

export const routes: Array<RouteConfig> = [
  {
    path: '',
    name: 'root',
    redirect: to => {
      return `/${store.state.gv.lan}`;
    },
  },
  {
    path: `/:lang(${supportLanguages.join('|')})`,
    component: () => importLayout('HeaderFooterLayout.vue'),
    children: [
      {
        path: '',
        name: 'default',
        component: () => importPage('HomePage.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => importPage('RegistrationPage.vue'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => importPage('LoginPage.vue'),
      },      
      {
        path: 'successpage',
        name: 'SuccessPage',
        component: () => importPage('SuccessPage.vue'),
      },      
      //myAccount
      {
        path: 'myAccount',
        name: `myAccount`,
        component: () => importPage(`menu/ProfilePage.vue`),
      },
      {
        path: 'creatives',
        name: `Creatives`,
        component: () => importPage(`menu/CreativesPage.vue`),
      },
      {
        path: 'reports',
        name: `Reports`,
        component: () => importPage(`menu/ReportsPage.vue`),
      },
      {
        path: 'payments',
        name: `Payments`,
        component: () => importPage(`menu/PaymentsPage.vue`),
      },
      {
        path: 'announcement',
        name: `Announcement`,
        component: () => importPage(`menu/AnnouncementPage.vue`),
      },
      {
        path: 'success',
        name: 'Success',
        component: () => importPage('SuccessPage.vue'),
      } 
    ],
  },
  {
    path: `/:lang(${supportLanguages.join('|')})`,
    component: () => importLayout('NoMenuHeaderLayout.vue'),
    children: [
      {
        path: 'forbidden',
        name: 'forbidden',
        component: () => importPage('ForbiddenPage.vue'),
      },
    ],
  },
  {
    path: `/:lang(${supportLanguages.join('|')})`,
    component: () => importLayout('FooterOnlyLayout.vue'),     
    children: [
      {
        path: 'full-view',
        name: 'fullView',
        component: () => importPage('FullTableView.vue'),
      },
    ],
  },
  {
    path: `/:lang(${supportLanguages.join('|')})`,
    component: () => importLayout('FooterOnlyLayout.vue'),     
    children: [
      {
        path: 'referrals-full-view',
        name: 'referralsFullView',
        component: () => importPage('ReferralsFullTableView.vue'),
      },
    ],
  },
  {
    path: `/:lang(${supportLanguages.join('|')})`,
    component: () => importLayout('HeaderFooterLayout.vue'),
    children: [
      {    
        //static page edit by WebTeam
        path: ':viewName',
        name: 'StaticContent',
        component: () => importPage('menu/StaticContentPage.vue'),
      },    
    ],
  },  
];

function anonymousOnly(to: Route, from: Route, next: NavigationGuardNext) {
  if (store.getters.isLogin === false) {
    next();
  } else {
    next(false);
  }
}

function authorizedOnly(to: Route, from: Route, next: NavigationGuardNext) {
  if (store.getters.isLogin === true) {
    next();
  } else {
    next({ path: `/${store.state.gv.lan}/user/login` });
  }
}
