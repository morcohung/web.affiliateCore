import axiosInstance from '@/utils/axios-instance';

  export function getAnnouncementList() {    
      return axiosInstance.get('/Announcement/AnnouncementList', {}, false);
    }
 