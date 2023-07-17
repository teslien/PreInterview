import { EventEmitter,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Rx from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class TestDataService {

  UpdateNavbar = new EventEmitter<any>();
  applicantdatalog=  new Rx.BehaviorSubject<any>({});;
  

  constructor(private http: HttpClient) { }


  getTestkData() {
    return this.http.get(`https://interview-test-648c5-default-rtdb.firebaseio.com/tests/-N_JY9blQwmxNuuftBWm/-N_JYmvGVU_2898KEAPR/questionData.json`).pipe(Rx.map(responsedata=>{
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

  getApplicantData() {
    return this.http.get(`https://interview-test-648c5-default-rtdb.firebaseio.com/applicant.json`).pipe(Rx.map(responsedata=>{
      const UserArray =[];
      for(const key in responsedata){
        if(responsedata.hasOwnProperty(key)){
          UserArray.push({...responsedata[key], id: key})
        }
      }
      return UserArray;
    }));;
  }

  getSpecificApplicantdata(id: any){
   return this.http.get(`https://interview-test-648c5-default-rtdb.firebaseio.com/applicant/${id}.json`);
  }

  getSpecificAdmindata(id:any){
    return this.http.get(`https://interview-test-648c5-default-rtdb.firebaseio.com/admin/${id}.json`);
  }

  getAllTest(){
    return this.http.get(`https://interview-test-648c5-default-rtdb.firebaseio.com/tests.json`).pipe(Rx.map(responsedata=>{
      const UserArray =[];
      for(const key in responsedata){
        if(responsedata.hasOwnProperty(key)){
          UserArray.push({...responsedata[key], id: key})
        }
      }
      return UserArray;
    }));;
  }


  getApplicantSpecificQuiz(categoryId:any,testId:any){
    return this.http.get(`https://interview-test-648c5-default-rtdb.firebaseio.com/tests/${categoryId}/${testId}.json`);
  }

}
