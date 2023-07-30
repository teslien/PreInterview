import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TestDataService } from 'src/app/service/test-data.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  minutesInput: number;
  secondsInput: number;
  timerValue: number;
  isTimerRunning: boolean = false;

  constructor(private textDataService:TestDataService) {}

  ngOnInit(): void {
    const storedTimer = localStorage.getItem('timer_value');
    this.timerValue = storedTimer ? parseInt(storedTimer, 10) : 0;
    this.minutesInput = Math.floor(this.timerValue / 60);
    this.secondsInput = this.timerValue % 60;
    this.startTimer();
  }

  startTimer(): void {
    this.timerValue = this.minutesInput * 60 + this.secondsInput;
    localStorage.setItem('timer_value', this.timerValue.toString());
    this.isTimerRunning = true;
    this.countdown();
  }

  countdown(): void {
    const interval = setInterval(() => {
      if (this.timerValue > 0 && this.isTimerRunning) {
        this.timerValue--;
        localStorage.setItem('timer_value', this.timerValue.toString());
        this.minutesInput = Math.floor(this.timerValue / 60);
        this.secondsInput = this.timerValue % 60;
        if(this.timerValue==0){
          this.textDataService.autoSubmitting.next(true);
        }
      } else {
        clearInterval(interval);
        this.isTimerRunning = false;
      }
    }, 1000); // 1 second in milliseconds
  }

  pauseTimer(): void {
    this.isTimerRunning = false;
  }

  resumeTimer(): void {
    if (!this.isTimerRunning) {
      this.isTimerRunning = true;
      this.countdown();
    }
  }
}