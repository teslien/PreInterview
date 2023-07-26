import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestDataService } from 'src/app/service/test-data.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {

  bgColorBtn='#3266CA';
  bgColorSEBtn='#FBFBFB';
  constructor(@Inject(DOCUMENT) private document: any,private router: Router,private testDataService:TestDataService) { }
  elem: any;
  quizData:any;

  ngOnInit(): void {
    this.elem = document.documentElement;
    this.getTestData();
  }

  
  getTestData(){
    const admin = sessionStorage.getItem("admid");
    const testId = sessionStorage.getItem("TestId");
      this.testDataService.getApplicantSpecificQuiz(admin,testId).subscribe(res=>{
        localStorage.setItem("QuizData",JSON.stringify(res));
        this.quizData=res;
        localStorage.setItem("questionData",JSON.stringify(this.quizData.questionData));
      })


  }


  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

  onStartQuiz(){
    this.openFullscreen();
    this.router.navigate(['/quiz']);
  }

}
