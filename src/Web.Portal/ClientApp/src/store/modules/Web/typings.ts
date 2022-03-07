import { Language } from './../Common/typings';
import { interfaces } from 'mocha';

export const moduleName = 'Web';

export interface WebState  {
    SecurityQuestions : SecurityQuestion[],
    Languages: LanguageModel[],
    StaticContent: StaticContentResult,
    HtmlResource: string,
    showLoginDialog: boolean,
    showSignUpDialog: boolean
}

export interface SecurityQuestion {
    Code: string,
    Descr: string
}

export interface LanguageModel
{
    Id: string,
    Code: string,
    Descr: string
}

export interface PaginationModel
{
    Size: number,
    Total: number,
    Count: number,
    IndexStart: number,
    BarSize: number,
    Index: number
}

export interface StaticContentModel
{
    Language: string,
    ResourceName: string,
    VueElements: string[]
}

export interface StaticContentResult
{
    metaInfo: MetaInfo,
    body: string,
    scriptUrls: string[]
}

export interface MetaInfo
{
    title: string
    meta: Meta[]
}

export interface Meta
{
    name: string,
    property: string,
    content: string
}

export interface ResponseModel
{
    Status: number,
    Message: string,
    //C# type is IDictionary<string, object>
    Params: any 
}