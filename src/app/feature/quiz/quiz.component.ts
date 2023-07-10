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

  selectedCategory:any="none";
  selectInpector:any[]=["none","none","none","none","none","none"];
  currentSelection:any="none";

  constructor(private testDataService:TestDataService){}

  ngOnInit(): void {
    this.getTestData();
    const arrayString = localStorage.getItem('selected');
    this.selectInpector = JSON.parse(arrayString);
  }

  quizData = [];


  getTestData(){
    this.dataSubscription=this.testDataService.getTestkData().subscribe((res)=>{
      this.quizData=res;
      console.log(this.quizData)
    })
  }


//   onAnswerSelected(id:number,selectedValue:string,currentIndex:number){
//   this.optionChoosen=!this.optionChoosen;
//   if(this.optionChoosen && !this.isSelected)
//   {
//    this.quizData[currentIndex].input = selectedValue;
//    const objectToUpdate = this.quizData[currentIndex].options.find(obj => obj.id === id);
//    if(objectToUpdate)
//    {
//     objectToUpdate.inputIndex=id;
//     this.isSelected=true;
//    }

//   }else if(!this.optionChoosen && this.isSelected){
//     this.quizData[currentIndex].input = '';
//     const objectToUpdate = this.quizData[currentIndex].options.find(obj => obj.id === id);
//     if(objectToUpdate)
//     {
//      objectToUpdate.inputIndex=-1;
//      this.isSelected=false;
//     }

//   }
// }


  onNext(){

    if(this.currentQuestionIndex<5){
      this.optionChoosen=false;
      this.currentQuestionIndex++;
      this.testDataService.UpdateNavbar.emit(this.currentQuestionIndex+1);
      this.currentSelection=this.selectInpector[this.currentQuestionIndex++];
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
      this.currentSelection=this.selectInpector[this.currentQuestionIndex--];
      console.log("back hurray:",this.currentQuestionIndex);
    }

  }


  checkStatus(event:any){

    if(event.target.checked == true){
     this.selectedCategory = event.target.value;
     this.selectInpector[this.currentQuestionIndex]=this.selectedCategory;
     const arrayString = JSON.stringify(this.selectInpector);
     localStorage.setItem("selected",arrayString);

     if(this.selectedCategory==this.quizData[this.currentQuestionIndex].correctAnswer.name){
      console.log("currect answer bro")
     }
    }
  }

  isOptionChecked(option: string): boolean {
    return this.selectInpector.includes(option);
  }

}
