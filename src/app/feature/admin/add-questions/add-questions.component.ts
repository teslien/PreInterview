import { Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {
  
  quizdata:any[]=[];
  currentQuestion:number=0;
  text:any;
  selectedOption:any;
  Options:any[]=[
  {
    name:"Option 1",
    key:1,
    check:false
  },
  {
    name:"Option 2",
    key:2,
    check:false
  },
  {
    name:"Option 3",
    key:2,
    check:false
  }
];
  constructor() { }

  ngOnInit(): void {

  }
  
  addOptions(){
    const len = this.Options.length+1;
    this.Options.push({
      name:"Option "+len,
      key:len,
      check:false
    })
  }

  enteringOptions(event:any,i:number){
    this.Options[i].name=event.target.value;
  }
  

  deleteOptions(){
    this.Options.splice(this.Options.length-1,this.Options.length)
  }
  
 NextQuesion(){
  const  data= {
    "id": this.quizdata.length+1,
    "question": this.text,
    "options": this.Options,
    "correctAnswer": this.selectedOption
 }
 this.quizdata.push(data);
 console.log(this.quizdata);
 }
}
