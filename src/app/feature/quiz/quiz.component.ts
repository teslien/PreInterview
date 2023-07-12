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

  random:string="";
  city: string;

  selectedCategory:any;
  currentSelection:any="none";

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
      this.currentQuestionIndex++;
      this.testDataService.UpdateNavbar.emit(this.currentQuestionIndex+1);
      console.log("hurray:",this.currentSelection);
    }else if(this.currentQuestionIndex==5){
      console.log("wefrg");
    }

  }

  onBack(){

    if(this.currentQuestionIndex>=1){
      this.optionChoosen=true;
      this.currentQuestionIndex--;
      this.testDataService.UpdateNavbar.emit(this.currentQuestionIndex+1);
      // this.currentSelection=this.selectInpector[this.currentQuestionIndex--];
      console.log("back hurray:",this.currentQuestionIndex);
    }

  }


  checkStatus(event:any,index:any){

    if(event.target.checked == true){
     this.selectedCategory = event.target.value;
     this.quizData[this.currentQuestionIndex].options[index].check=true;

     if(this.selectedCategory==this.quizData[this.currentQuestionIndex].correctAnswer.name){
      console.log("currect answer bro")
     }
    }
  }


}
