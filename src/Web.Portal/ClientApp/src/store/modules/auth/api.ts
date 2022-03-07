import { httpGet, httpPost } from '@/utils/axios-instance';

export function login(username: string, password: string, blackbox: string) {
  const data = {
    Username: username,
    Password: password,
    iovationBlackbox: blackbox,
  };
  return httpPost(`/Api/Web/login`, data, false);
}

export function IsSessionExpired() {
  return httpGet(`/Authentication/IsSessionExpired`, {}, false);
}

export function logout() {
  return httpPost(`/Authentication/logout`);
}

export function RedirectTo188MemberSite(isMobileBrowser: boolean) {
  const params = { isMobileBrowser };
  const payload = { params };
  return httpGet(`/Common/RedirectTo188MemberSite`, payload, false);
}
