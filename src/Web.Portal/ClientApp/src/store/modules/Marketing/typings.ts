import { ResponseModel, PaginationModel } from "@/store/modules/Web/typings";

export const moduleName = 'Marketing';

export interface MarketingState  {
    CollateralList : CollateralListModel,
    Links: MarketingLinkModel[],
    CollateralClassificationList: CollateralClassificationListModel
    MarketingScript: MarketingScriptModel,
    Filter: FilterModel,
    Page: number
}

export interface CollateralListModel extends ResponseModel
{
    CollateralList: CollateralModel[],
    Page: PaginationModel
}

export interface CollateralModel
{
    Id: string,
    Classification: string,
    PreviewUrl: string,
    LangDescr: string,
    TypeDescr: string,
    SizeCode: string,
    Name: string,
    EffectiveDate: string
}

export interface CollateralClassificationListModel extends ResponseModel
{
    CollateralClassificationList: CollateralClassificationModel[]
}

export interface CollateralClassificationModel
{
    Id: string,
    LangId: string,
    LangDescr: string,
    Descr: string
}

export interface FilterModel
{
    LangId: string,
    ClassId: string,
    Page: number
}

export interface AddLinkModel
{
    Content: string
}

export interface MarketingLinkModel
{
    Id: string,
    Type: string,
    Code: string,
    LinkUrl: string,
    QRUrl: string
}

export interface MarketingScriptModel extends ResponseModel
{
    Id: string,
    Name: string,
    Script: string
}