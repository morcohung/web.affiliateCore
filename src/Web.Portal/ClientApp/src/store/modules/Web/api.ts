import axiosInstance from '@/utils/axios-instance';
import { AxiosResponse } from 'axios';
import { LanguageModel, SecurityQuestion, StaticContentModel, StaticContentResult } from './typings';

export function getSecurityQuestions() {
  return axiosInstance.get('/Api/Web/SecurityQuestions', [], false);
}

export function getLanguage(id: number) : Promise<AxiosResponse<LanguageModel[]>>
{
  return axiosInstance.get(`/Api/Web/Language/${id}`, {} ,false);
}

export function getStaticContent(content: StaticContentModel) : Promise<AxiosResponse<StaticContentResult>>
{
  const _url = '/Api/Web/StaticContent';
  const _result = axiosInstance.post(_url, content, false);
  return _result;
}

export function getHtmlResource(resourceUrl: string) : Promise<AxiosResponse<string>>
{
  return axiosInstance.get(resourceUrl, {}, false);
}