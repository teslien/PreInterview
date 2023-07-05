import { EventEmitter,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Rx from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class TestDataService {

  UpdateNavbar = new EventEmitter<any>();
  constructor(private http: HttpClient) { }


  getTestkData() {
    return this.http.get(`https://pre-interviewtest-default-rtdb.firebaseio.com/admin/-NZZhjdX1cPNJImoo7m9/applicant/-NZZiHYn3fTthPQS4meR/testData/questionData.json`).pipe(Rx.map(responsedata=>{
      const testArray =[];
      for(const key in responsedata){
        if(responsedata.hasOwnProperty(key)){
          testArray.push({...responsedata[key], id: key})
        }
      }
      return testArray;
    }));
  }
}
