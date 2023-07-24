import { EventEmitter,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Rx from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class TestDataService {

  UpdateNavbar = new EventEmitter<any>();
  applicantdatalog=  new Rx.Subject<any>();
  updateReportCard = new Rx.Subject<any>();
  

  constructor(private http: HttpClient) { }


  getTestkData() {
    return this.http.get(`https://interview-test-648c5-default-rtdb.firebaseio.com/tests/-N_JA8C0VE4f9S3dhXut/-Na7J8Hoz-BsqGJQI8cD/questionData.json`).pipe(Rx.map(responsedata=>{
      const testArray =[];
      for(const key in responsedata){
        if(responsedata.hasOwnProperty(key)){
          testArray.push({...responsedata[key], id: key})
        }
      }
      return testArray;
    }));
  }


  getUserIP(){
    return this.http.get('https://jsonip.com/');
  }
  getUserInfo(ip:any){
    return this.http.get(`https://ipapi.co/${ip}/json/`);
  }



  getAdminData() {
    return this.http.get(`https://interview-test-648c5-default-rtdb.firebaseio.com/admin.json`).pipe(Rx.map(responsedata=>{
      const UserArray =[];
      for(const key in responsedata){
        if(responsedata.hasOwnProperty(key)){
          UserArray.push({...responsedata[key], id: key})
        }
      }
      return UserArray;
    }));;
  }

  getApplicantData(adminId:any) {
    return this.http.get(`https://interview-test-648c5-default-rtdb.firebaseio.com/applicant/${adminId}.json`).pipe(Rx.map(responsedata=>{
      const UserArray =[];
      for(const key in responsedata){
        if(responsedata.hasOwnProperty(key)){
          UserArray.push({...responsedata[key], id: key})
        }
      }
      return UserArray;
    }));;
  }

  getSpecificApplicantdata(id: any,adminid:any){
   return this.http.get(`https://interview-test-648c5-default-rtdb.firebaseio.com/applicant/${adminid}/${id}.json`);
  }

  getSpecificAdmindata(id:any){
    return this.http.get(`https://interview-test-648c5-default-rtdb.firebaseio.com/admin/${id}.json`);
  }

  getAllTest(adminid:any){
    return this.http.get(`https://interview-test-648c5-default-rtdb.firebaseio.com/tests/${adminid}.json`).pipe(Rx.map(responsedata=>{
      const UserArray =[];
      for(const key in responsedata){
        if(responsedata.hasOwnProperty(key)){
          UserArray.push({...responsedata[key], id: key})
        }
      }
      return UserArray;
    }));;
  }


  getApplicantSpecificQuiz(adminId:any,testId:any){
    return this.http.get(`https://interview-test-648c5-default-rtdb.firebaseio.com/tests/${adminId}/${testId}.json`);
  }

  sendMyPicToCheatMonitor(id:any,obj:any){
    return this.http.post(`https://interview-test-648c5-default-rtdb.firebaseio.com/applicant/-N_JdG27QYI-GXJrT8Qo.json`,obj);
  }

  
  UserInfo:any;
  SendUserInfo(info:any){
    this.UserInfo= info;
  }
  GetUserInfo(){
    return this.UserInfo;
  }

  addCustomizeTest(quiz:any,adminid:any){
    return this.http.post(`https://interview-test-648c5-default-rtdb.firebaseio.com/tests/${adminid}.json`,quiz);
  }

  

  
}
