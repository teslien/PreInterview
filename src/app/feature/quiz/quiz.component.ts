import { Component, OnInit } from '@angular/core';
import { TestDataService } from 'src/app/service/test-data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  dataSubscription: Subscription;

  Next="Next"
  bgColorBtn='#3266CA';
  bgColorSEBtn='#FBFBFB';
  currentQuestionIndex:number=0;
  optionChoosen:boolean=false;
  optionChoosenIndex:number=0;
  previousValue:any;
  isSelected:boolean=false;
  totalTime:number=30;
  currentRound:number=1;
  selectedValue:string;
  previousIndex:any=-1;
  previousQuestionIndex:any=-1;
  random:string="";
  city: string;

  selectedCategory:any;
  currentSelection:any="none";
  correctAnswers:number=0;

  constructor(private testDataService:TestDataService){}

  ngOnInit(): void {
    this.getTestData();
  }

  quizData = [];


  getTestData(){
    this.dataSubscription=this.testDataService.getTestkData().subscribe((res)=>{
      this.quizData=res;
      console.log(this.quizData)
    })
  }



  onNext(){

    if(this.currentQuestionIndex<9){
      this.optionChoosen=false;
      if(this.selectedCategory==this.quizData[this.currentQuestionIndex].correctAnswer.name){
        console.log("Your Answer is correct",this.correctAnswers);
       }
      this.currentQuestionIndex++;
      this.testDataService.UpdateNavbar.emit(this.currentQuestionIndex+1);

    }else if(this.currentQuestionIndex==5){
      console.log("wefrg");
    }

  }

  onBack(){

    if(this.currentQuestionIndex>=1){
      // this.previousIndex=-1;
      this.optionChoosen=true;
      this.currentQuestionIndex--;
      this.testDataService.UpdateNavbar.emit(this.currentQuestionIndex+1);
      // this.currentSelection=this.selectInpector[this.currentQuestionIndex--];
      console.log("back hurray:",this.currentQuestionIndex);
    }

  }


  checkStatus(event:any,index:any){

    if(event.target.checked == true){
    if(this.previousIndex!=-1)
    {
      this.quizData[this.currentQuestionIndex].options[this.previousIndex].check=false;
    }
     this.selectedCategory = event.target.value;
     this.quizData[this.currentQuestionIndex].options[index].check=true;
     this.previousIndex=index;
     this.previousQuestionIndex=this.currentQuestionIndex;
     console.log(this.quizData[this.currentQuestionIndex].options)

    }
  }


}
