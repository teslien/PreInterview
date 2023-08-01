import { Component, HostListener, OnInit } from '@angular/core';
import { TestDataService } from 'src/app/service/test-data.service';
import { Subscription } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {MessageService, PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  providers: [MessageService]
})
export class QuizComponent implements OnInit{

  dataSubscription: Subscription;

  Next = "Next"
  bgColorBtn = '#3266CA';
  bgColorSEBtn = '#FBFBFB';
  currentQuestionIndex: number = 0;
  optionChoosen: boolean = false;
  optionChoosenIndex: number = 0;
  previousValue: any;
  isSelected: boolean = false;
  totalTime: number = 30;
  currentRound: number = 1;
  selectedValue: string;
  previousQuestionIndex: any = -1;
  random: string = "";
  nexSub: any = "Next";


  selectedCategory: any;
  currentSelection: any = "none";
  correctAnswers: number = 0;
  allocatedTime: any;
  Mins: any;
  Score: number = 0;
  loading: boolean = false;
  shouldShuffle: boolean;


  //image
  imageCaptured: any[] = [];
  appHidden: boolean;
  cheactValue:number=0;




  constructor(private testDataService: TestDataService, private route: Router,private messageService: MessageService, private primengConfig: PrimeNGConfig) {

    // code to block inspect option
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });

    
  }

  ngOnInit(): void {
    this.quizDetails = JSON.parse(localStorage.getItem("QuizData"));
    this.quizData = JSON.parse(localStorage.getItem("questionData"));
    const takePic = JSON.parse(localStorage.getItem("takePic"));
    this.shouldShuffle = this.quizDetails.shuffle;
    console.log(takePic);
    this.randomlyCapturingImage(takePic);

    this.testDataService.autoSubmitting.subscribe(res => {
      if (res == true) {
        this.onTestSubmit();
      }
    })
    this.primengConfig.ripple = true;
  }

  quizData: any[0];
  quizDetails: any;
  showSubmit: boolean = false;



  makeAllFalse(index: number) {
    this.quizData[index].options.forEach(obj => {
      obj.check = false;
    });
  }

  onNext() {

    if (this.currentQuestionIndex <= this.quizDetails.totalQuestions && this.currentQuestionIndex > -1) {
      this.currentQuestionIndex++;
      this.testDataService.UpdateNavbar.emit(this.quizData[this.currentQuestionIndex].id);
      this.optionChoosen = false;
    }
    if (this.currentQuestionIndex == this.quizDetails.totalQuestions - 1) {
      this.showSubmit = true;
    }

  }

  onTestSubmit() {
    this.quizData.forEach(i => {
      const ans = i.options.find(item => item.check === true);
      if (i.correctAnswer.name == ans?.name) {
        this.Score++;
      } else {
        return;
      }
    })
    this.loading = true;
    const admin = sessionStorage.getItem("admid");
    const applicant = sessionStorage.getItem("ApplicantId");
    this.testDataService.SendAnswerSheet(this.quizData, applicant, admin).subscribe(res => {
      this.testDataService.UpdateScore(this.Score, applicant, admin).subscribe(res => {
        this.testDataService.updateTestStatus({ test_status: "Completed" }, applicant, admin).subscribe(res => {
          this.imageCaptured = JSON.parse(localStorage.getItem("Imagescaptured"))
          this.testDataService.updateCapturedImages(this.imageCaptured, applicant, admin).subscribe(res => {
            this.loading = false;
            this.route.navigate(['/quiz/result']);
          })
        })
      })
    });


  }

  onBack() {

    if (this.currentQuestionIndex >= 1) {
      this.optionChoosen = true;
      this.showSubmit = false;
      this.currentQuestionIndex--;
      this.testDataService.UpdateNavbar.emit(this.quizData[this.currentQuestionIndex].id);
    }
    if (this.currentQuestionIndex != this.quizDetails.qtotalQuestions - 1) {
      this.nexSub = "Next"
    }

  }


  checkStatus(event: any, index: any) {

    if (event.target.checked == true) {
      this.makeAllFalse(this.currentQuestionIndex);
      this.selectedCategory = this.quizData[this.currentQuestionIndex].options[index].name;
      this.quizData[this.currentQuestionIndex].options[index].check = true;
      localStorage.setItem("questionData", JSON.stringify(this.quizData))
      this.previousQuestionIndex = this.currentQuestionIndex;
    }
  }



  ///this is cam capture functions

  public webcamImage: WebcamImage = null;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  triggerSnapshot(): void {
    this.trigger.next();
  }
  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;

  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }


  randomlyCapturingImage(sec:any) {
    const timeLim = sec * 1000;
    let captureCount = 0;
  
    const captureImage = () => {
      this.triggerSnapshot();
      if (this.webcamImage != null) {
        this.imageCaptured.push(this.webcamImage);
        localStorage.setItem("Imagescaptured", JSON.stringify(this.imageCaptured));
      }
      
      captureCount++;
      if (captureCount < 10) {
        setTimeout(captureImage, timeLim);
      }
    };
  
    // Start the capturing process by capturing the first image immediately
    captureImage();

  }


  //code to block inspect options
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(e: KeyboardEvent) {
    console.log(e)
    if (e.key === 'F12') {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.key === "I") {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.key === "C") {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.key === "J") {
      return false;
    }
    if (e.ctrlKey && e.key == "U") {
      return false;
    }
    return true;
  }


  @HostListener('document:visibilitychange', ['$event'])
  appVisibility() {
   if (document.hidden) {
      //do whatever you want
      this.appHidden = true;
      this.messageService.add({severity:'warn', summary: `Warning ${this.cheactValue+1}`, detail: 'Switching Tabs will result Auto submitting!', sticky: true});
      this.cheactValue++;
      if(this.cheactValue==4){
        this.onTestSubmit()
      }
    } 
}
}
