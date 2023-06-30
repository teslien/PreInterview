import { Component, OnInit } from '@angular/core';
import {WebcamImage} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';

@Component({
  selector: 'app-photo-verification',
  templateUrl: './photo-verification.component.html',
  styleUrls: ['./photo-verification.component.scss']
})
export class PhotoVerificationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public webcamImage: WebcamImage=null;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  triggerSnapshot(): void {
   this.trigger.next();
  }
  handleImage(webcamImage: WebcamImage): void {
   console.info('received webcam image', webcamImage);
   this.webcamImage = webcamImage;
  }
 
  public get triggerObservable(): Observable<void> {
   return this.trigger.asObservable();
  }

}
