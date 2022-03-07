import axiosInstance from '@/utils/axios-instance';

export async function DownLoadByGet(url: any,filePage: string,params: any) {
    axiosInstance.get(url, { params:params, responseType: "blob" })
    .then(response=>{
    if(!response){
        return
    }
    const content = response.data;
    const blob = new Blob([content], { type: 'application/vnd.ms-excel;charset=utf-8' });
    var date =
        new Date().getFullYear() +
        "" +
        (new Date().getMonth() + 1) +
        "" +
        new Date().getDate() +
        "" +
        new Date().getHours();
    const fileName = filePage + date + "." + 'xls'; 
    let url = window.URL.createObjectURL(blob); 
    let a = document.createElement("a"); 
    a.href = url; 
    a.download = fileName; 
    a.click();
    window.URL.revokeObjectURL(url);
    }).catch(error=>{
      console.log(error); 
    })
}    

export async function DownLoadByPost(url: any,filePage: string,params: any) {   
    axiosInstance.post(url, params, {responseType: "blob" })
    .then(response=>{
    if(!response){
        return
    }
    const content = response.data;
    const blob = new Blob([content], { type: 'application/vnd.ms-excel;charset=utf-8' });
    var date =
        new Date().getFullYear() +
        "" +
        (new Date().getMonth() + 1) +
        "" +
        new Date().getDate() +
        "" +
        new Date().getHours();
    const fileName = filePage + date + "." + 'xls'; 
    let url = window.URL.createObjectURL(blob); 
    let a = document.createElement("a"); 
    a.href = url; 
    a.download = fileName; 
    a.click();
    window.URL.revokeObjectURL(url);
    }).catch(error=>{
      console.log(error); 
    })
}    


const download = {
    downLoadGet: DownLoadByGet,  
    downLoadPost: DownLoadByPost 
  };

  export default download;  