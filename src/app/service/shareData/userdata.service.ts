import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  quizData:any[]=[];
  constructor(){}

  passTestData(data:any){
    this.quizData.push(data);
  }
  getTestData(){
    return this.quizData;
  }

}
