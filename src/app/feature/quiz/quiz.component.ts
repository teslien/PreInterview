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
  city: string;

  selectedCategory:any;
  currentSelection:any="none";
  correctAnswers:number=0;
  UserIpAddress:any;



  //image
  imageCaptured:any[];


  //location 
  public lat;
  public lng;


  constructor(private testDataService:TestDataService){}

  ngOnInit(): void {
    this.getTestData();
    this.getUserIp();
    this.getLocation();
  }

  quizData = [];


  getTestData(){
    this.dataSubscription=this.testDataService.getTestkData().subscribe((res)=>{
      this.quizData=res;
      console.log(this.quizData)
    })
  }

  makeAllFalse(index:number){
    this.quizData[index].options.forEach(obj => {
      obj.check = false;
    });
  }

  onNext(){

    if(this.currentQuestionIndex<9){
      this.optionChoosen=false;
      if(this.selectedCategory==this.quizData[this.currentQuestionIndex].correctAnswer.name){
        console.log("Your Answer is correct",this.correctAnswers);
       }
      this.currentQuestionIndex++;
      this.randomlyCapturingImage(this.currentQuestionIndex);
      this.testDataService.UpdateNavbar.emit(this.currentQuestionIndex);

    }else if(this.currentQuestionIndex==5){
      console.log("wefrg");
    }

  }

  onBack(){

    if(this.currentQuestionIndex>=1){
      this.optionChoosen=true;
      this.currentQuestionIndex--;
      this.testDataService.UpdateNavbar.emit(this.currentQuestionIndex+1);
      console.log("back hurray:",this.currentQuestionIndex);
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

  getUserIp(){
    this.testDataService.getUserIP().subscribe((res)=>{
     this.UserIpAddress=res;
     this.getUserInfo(this.UserIpAddress.ip);
    })
  }

  getUserInfo(info:any){
  console.log(info);
    this.testDataService.getUserInfo(info).subscribe((res)=>{
      console.log(res);
    })
  
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


  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
          console.log(this.lat);
        }
      },
        (error) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

}
