export const moduleName = 'Announcement';

export interface AnnouncementState {
    Announcement:AnnouncementModel;    
}

export interface AnnouncementModel {  
    AnnouncementList:[{
        Id:string,
        Ord:number,
        Text:string,
        EffectiveDate:string,
        Language:string,
        Type:string 
    }]
}