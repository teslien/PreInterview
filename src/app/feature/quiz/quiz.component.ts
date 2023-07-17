import { Component, OnInit } from '@angular/core';
import { TestDataService } from 'src/app/service/test-data.service';
import { Subscription } from 'rxjs';
import {WebcamImage} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';

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
  previousQuestionIndex:any=-1;
  random:string="";
  nexSub:any="Next";


  selectedCategory:any;
  currentSelection:any="none";
  correctAnswers:number=0;
 




  //image
  imageCaptured:any[];




  constructor(private testDataService:TestDataService){}

  ngOnInit(): void {
    this.getTestData();
  }

  quizData:any[];
  quizDetails:any;


  getTestData(){
      this.testDataService.getApplicantSpecificQuiz('-N_JY9blQwmxNuuftBWm','-N_JYmvGVU_2898KEAPR').subscribe(r=>{
        this.quizDetails=r;
        this.quizData=this.quizDetails.questionData;
      })


  }

  makeAllFalse(index:number){
    this.quizData[index].options.forEach(obj => {
      obj.check = false;
    });
  }

  onNext(){

    if(this.currentQuestionIndex<9 && this.currentQuestionIndex>-1){
      this.currentQuestionIndex++;
      this.testDataService.UpdateNavbar.emit(this.currentQuestionIndex);
      this.optionChoosen=false;
      if(this.selectedCategory==this.quizData[this.currentQuestionIndex].correctAnswer.name){
        console.log("Your Answer is correct",this.correctAnswers);
       }
      this.randomlyCapturingImage(this.currentQuestionIndex);

    }
    if(this.currentQuestionIndex==9){
      this.nexSub="Submit Task";
    }

  }

  onBack(){

    if(this.currentQuestionIndex>=1){
      this.optionChoosen=true;
      this.currentQuestionIndex--;
      this.testDataService.UpdateNavbar.emit(this.currentQuestionIndex+1);
      console.log("back hurray:",this.currentQuestionIndex);
    }
    if(this.currentQuestionIndex!=9){
      this.nexSub="Next"
    }

  }


  checkStatus(event:any,index:any){

    if(event.target.checked == true){
    this.makeAllFalse(this.currentQuestionIndex);
     this.selectedCategory = event.target.value;
     this.quizData[this.currentQuestionIndex].options[index].check=true;
     this.previousQuestionIndex=this.currentQuestionIndex;
     console.log(this.quizData[this.currentQuestionIndex].options)
    }
  }



  ///this is cam capture functions

  public webcamImage: WebcamImage=null;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  triggerSnapshot(): void {
   this.trigger.next();
  }
  handleImage(webcamImage: WebcamImage): void {
   console.info('received webcam image', webcamImage);
   this.webcamImage = webcamImage;
  //  if(this.webcamImage!=null)
  //  {
  //   this.imageCaptured.push(this.webcamImage);
  //  }
  }
 
  public get triggerObservable(): Observable<void> {
   return this.trigger.asObservable();
  }


  randomlyCapturingImage(index:number){
  const factors=[];
   for (let i = 1; i <= 5; i++) {
    if (20 % i === 0) {
      factors.push(i);
    }

  }
  console.log(factors);
  if (factors.includes(index)) {
    // this.triggerSnapshot();
    console.log("Your photo is captured");
  }
  }




}
