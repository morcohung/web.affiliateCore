import axiosInstance from '@/utils/axios-instance';

export function getLanguage() {
  return axiosInstance.get('/Common/Language', {}, false);
}

export function getCountry(langCode) {
  const params = { langCode };
  const payload = { params };
  return axiosInstance.get(
    '/Common/GetLocalizationCountryList',
    payload,
    false
  );
}

export function getChatTools(langCode: string) {
  const params = { langCode };
  const payload = { params };
  return axiosInstance.get('/Common/ChatTools', payload, false);
}

export function getDialCode() {
  return axiosInstance.get('/Common/DialCode', {}, false);
}

export function setCurrentLang(langCode) {
  const data = {
    langCode: langCode,
  };

  return axiosInstance.post('/Api/Web/SetCurrentLang', data, false);
}

export function getCurrencys(CountryCode) {
  const data = {
    CountryCode: CountryCode,
  };
  return axiosInstance.get('/Api/Web/Currency', data, false);
}

export function getAllCountries() {
  return axiosInstance.post('/Api/Web/GetAllCountries', {}, false);
}
export function getAllCurrencies() {
  return axiosInstance.post('/Api/Web/GetAllCurrencies', {}, false);
}
export function getLast3Months() {
  return axiosInstance.post('/Api/Web/GetLast3Months', {}, false);
}
