import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestDataService } from 'src/app/service/test-data.service';


@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {
  
  testData:any;
  quizdata:any[]=[];
  currentQuestion:number=1;
  home:boolean=false;
  loading:boolean=false;

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
    key:3,
    check:false
  }
];
  adminId: string;
  constructor(private testService:TestDataService,private route:Router) { }

  ngOnInit(): void {
    this.adminId = sessionStorage.getItem("UserId");
    this.testData = JSON.parse(localStorage.getItem("customtest"));
    console.log(this.testData);
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
  
  NextQuestion(){
  if(this.currentQuestion<this.testData.totalQuestions){
    const  data= {
      "id": this.quizdata.length+1,
      "question": this.text,
      "options": this.Options,
      "correctAnswer": this.selectedOption
   }
   this.quizdata.push(data);
   console.log(this.quizdata);
   this.currentQuestion++;
   this.Options=[
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
      key:3,
      check:false
    }]
    this.selectedOption="";
    this.text=""

  }
  if(this.currentQuestion==this.testData.totalQuestions){
    this.home=true;
  }

 }

 PreviousQuestion(){
  if(this.currentQuestion>1)
  {
    this.currentQuestion--;
    this.Options=this.quizdata[this.currentQuestion-1].options;
    this.selectedOption=this.quizdata[this.currentQuestion-1].correctAnswer;
    this.text= this.quizdata[this.currentQuestion-1].question;
  }
 }


 uploadTest(){
  if(this.adminId){
    this.loading=true;
    if(this.currentQuestion==this.testData.totalQuestions){
      const  data= {
        "id": this.quizdata.length+1,
        "question": this.text,
        "options": this.Options,
        "correctAnswer": this.selectedOption
     }
     this.quizdata.push(data);}
    const quiz={
      "testName":this.testData.testName,
      "totalQuestions":this.testData.totalQuestions,
      "totalTimeInMins":this.testData.totalTimeInMins,
      "shuffle":this.testData.shuffle,
      "questionData": this.quizdata,
      "category":this.testData.category,
      "level":this.testData.level
    };
    this.testService.addCustomizeTest(quiz,this.adminId).subscribe(res=>{
      console.log(res);
      this.loading=false;
      this.route.navigate(['/admin/tests']);
    })
   }
  }
  
}
