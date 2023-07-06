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
  selectInpector:any[]=[0,0,0,0];
  previousValue:any;
  isSelected:boolean=false;
  totalTime:number=30;
  currentRound:number=1;
  selectedValue:string;

  city: string;

  selectedCategory: any = null;

  categories: any[] = [{name: 'abc', key: 'A'}, {name: 'Marketing', key: 'B'}, {name: 'Production', key: 'C'}, {name: 'Research', key: 'D'}];

  constructor(private testDataService:TestDataService){}

  ngOnInit(): void {
    this.getTestData();
  }

  quizData = [];


  getTestData(){
    this.dataSubscription=this.testDataService.getTestkData().subscribe((res)=>{
      this.quizData=res;
      console.log(this.quizData);
    })
  }


  onAnswerSelected(id:number,selectedValue:string,currentIndex:number){
  this.optionChoosen=!this.optionChoosen;
  if(this.optionChoosen && !this.isSelected)
  {
   this.quizData[currentIndex].input = selectedValue;
   const objectToUpdate = this.quizData[currentIndex].options.find(obj => obj.id === id);
   if(objectToUpdate)
   {
    objectToUpdate.inputIndex=id;
    console.log(objectToUpdate);
    this.isSelected=true;
   }

  }else if(!this.optionChoosen && this.isSelected){
    this.quizData[currentIndex].input = '';
    const objectToUpdate = this.quizData[currentIndex].options.find(obj => obj.id === id);
    if(objectToUpdate)
    {
     objectToUpdate.inputIndex=-1;
     this.isSelected=false;
    }

  }
}

  onNext(){

    if(this.quizData[this.currentQuestionIndex].correctAnswer==this.selectedCategory.name){
      console.log("hurray");
    }

    if(this.currentQuestionIndex<9){
      this.optionChoosen=false;
      this.currentQuestionIndex++;
      this.testDataService.UpdateNavbar.emit(this.currentQuestionIndex+1);
    }
    console.log(this.selectedCategory);
  }

  onBack(){
    if(this.currentQuestionIndex>=1){
      this.optionChoosen=true;
      this.currentQuestionIndex--;
      this.testDataService.UpdateNavbar.emit(this.currentQuestionIndex+1);
    }
  }

}
