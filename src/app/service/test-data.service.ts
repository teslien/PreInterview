import { EventEmitter,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Rx from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class TestDataService {

  UpdateNavbar = new EventEmitter<any>();
  applicantdatalog=  new Rx.Subject<any>();
  autoSubmitting=  new Rx.Subject<boolean>();
  UserData = new Rx.BehaviorSubject<any>(undefined);
  updateProfile = new Rx.BehaviorSubject<any>({});
  UpdatePic=new EventEmitter<any>();
  

  constructor(private http: HttpClient) { }

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

  postAddApplicantData(data:any,id:any){
    return this.http.post(`https://interview-test-648c5-default-rtdb.firebaseio.com/applicant/${id}.json`,data)
  }
  

  updateTestStatus(status:any,applicantid:any,adminId:any){
    return this.http.patch(`https://interview-test-648c5-default-rtdb.firebaseio.com/applicant/${adminId}/${applicantid}.json`,status)
  }

  updateFirstPic(pic:any,applicant:any,adminId:any){
    return this.http.patch(`https://interview-test-648c5-default-rtdb.firebaseio.com/applicant/${adminId}/${applicant}.json`,{
      firstPic:pic
    })
  }

  updateIP(ip:any,applicant:any,adminId:any){
    return this.http.patch(`https://interview-test-648c5-default-rtdb.firebaseio.com/applicant/${adminId}/${applicant}.json`,{
      ip:ip
    })
  }

  updateLocation(location:any,applicant:any,adminId:any){
    return this.http.patch(`https://interview-test-648c5-default-rtdb.firebaseio.com/applicant/${adminId}/${applicant}.json`,{
      trackedlocation:location
    })
  }
  
  updateCapturedImages(images:any,applicant:any,adminId:any){
    return this.http.patch(`https://interview-test-648c5-default-rtdb.firebaseio.com/applicant/${adminId}/${applicant}.json`,{
      imageCaptured:images
    })
  }

  SendAnswerSheet(data:any,applicant:any,adminId:any){
    return this.http.patch(`https://interview-test-648c5-default-rtdb.firebaseio.com/applicant/${adminId}/${applicant}.json`,{
      answerGiven:data
    })
  }

  UpdateScore(score:number,applicant:any,adminId:any){
    return this.http.patch(`https://interview-test-648c5-default-rtdb.firebaseio.com/applicant/${adminId}/${applicant}.json`,{  
    score:score
    })
  }

  UpDateAdminProfile(data:any,adminId:any){
    return this.http.put(`https://interview-test-648c5-default-rtdb.firebaseio.com/admin/${adminId}.json`,data);
  }

  deleteApplicant(adminid:any,id:any){
    return this.http.delete(`https://interview-test-648c5-default-rtdb.firebaseio.com/applicant/${adminid}/${id}.json`);
  }
}
