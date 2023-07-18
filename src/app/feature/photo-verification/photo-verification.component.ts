import { Component, OnInit } from '@angular/core';
import {WebcamImage} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';
import { TestDataService } from 'src/app/service/test-data.service';

@Component({
  selector: 'app-photo-verification',
  templateUrl: './photo-verification.component.html',
  styleUrls: ['./photo-verification.component.scss']
})
export class PhotoVerificationComponent implements OnInit {

  UserIpAddress:any;
  applicantid=localStorage.getItem("ApplicantId");
    

  constructor(private testDataService:TestDataService) { }

  ngOnInit(): void {
    this.getUserIp();
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
   this.testDataService.sendMyPicToCheatMonitor(this.applicantid,{"firstpic":this.webcamImage}).subscribe((res)=>{
    console.log("mission successful!");
   })
  }
 
  public get triggerObservable(): Observable<void> {
   return this.trigger.asObservable();
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
      this.testDataService.sendMyPicToCheatMonitor(this.applicantid,{"Info":res}).subscribe(res=>{
        console.log("mission 2 successfull");
      })
    })
  
  }



}
