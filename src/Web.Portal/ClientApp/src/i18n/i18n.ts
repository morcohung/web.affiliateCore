import Vue from 'vue';
import VueI18n from 'vue-i18n';
// import VueI18nFilter from 'vue-i18n-filter';
import { setDefaultHeader } from '@/utils/axios-instance';

Vue.use(VueI18n);
// Vue.use(VueI18nFilter);

const loadedLanguages: string[] = [];

export const i18n: VueI18n = new VueI18n();

function setI18nLanguage(lang: string) {
  i18n.locale = lang;
  setDefaultHeader('Accept-Language', lang);
  return lang;
}

export function loadLanguageAsync(lang: string) {  
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  // todo: find the way to prevent include development code to bundle JS file
  return import(
    `../../../resource/i18n/${lang}`
  ).then(messages => {   
    i18n.setLocaleMessage(lang, messages.default);  
    loadedLanguages.push(lang);
    return setI18nLanguage(lang);
  });
}

export default i18n;
