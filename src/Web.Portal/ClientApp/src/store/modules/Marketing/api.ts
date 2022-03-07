import axiosInstance from '@/utils/axios-instance';
import { AxiosResponse } from 'axios';
import { ResponseModel } from './../Web/typings';
import * as _marketing from './typings';

export function getCollateralList(content: _marketing.FilterModel, page: number) : Promise<AxiosResponse<_marketing.CollateralListModel>> {
  const _url = `/Api/Marketing/CollateralList?page=${page}`;
  return axiosInstance.post(_url, content, false);
}

export function getLink() : Promise<AxiosResponse<_marketing.MarketingLinkModel[]>> {
  return axiosInstance.get('/Api/Marketing/Link', {}, false);
}

export function getCollateralClassificationList(id: string) : Promise<AxiosResponse<_marketing.CollateralClassificationListModel>> {
  const _url = `/Api/Marketing/CollateralClassificationList/${id}`;
  return axiosInstance.get(_url, {}, false);
}

export function addLink(content: _marketing.AddLinkModel) : Promise<AxiosResponse<ResponseModel>> {
  return axiosInstance.post('/Api/Marketing/AddLink', content, false);
}

export function getScript(id: string) : Promise<AxiosResponse<_marketing.MarketingScriptModel>> {
  const _url = `/Api/Marketing/Script/${id}`;
  return axiosInstance.get(_url, {}, false);
}

export function addScript(marketingScriptModel: _marketing.MarketingScriptModel) : Promise<AxiosResponse<_marketing.MarketingScriptModel>> {
  return axiosInstance.post('/Api/Marketing/Script', marketingScriptModel, false);
}