import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  applicantid=sessionStorage.getItem("ApplicantId");
  adminId = sessionStorage.getItem("admid");

  constructor(private testDataService:TestDataService,private route:Router) { }

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

  }

 
  public get triggerObservable(): Observable<void> {
   return this.trigger.asObservable();
  }

  getUserIp(){
    this.testDataService.getUserIP().subscribe((res)=>{
     this.UserIpAddress=res;
    })
  }

  NextPage(){
    this.testDataService.updateFirstPic(this.webcamImage,this.applicantid,this.adminId).subscribe(res=>{
      console.log("Picture Sent To Interviewer");
     },error=>{
      console.log("Error Sending Picture",error);
     })
    this.testDataService.updateIP(this.UserIpAddress.ip,this.applicantid,this.adminId).subscribe(res=>{
      console.log("IP Sent To Interviewer");
    },error=>{
      console.log("Error Sending IP")
    })
     this.route.navigate(['/instruction'])
  }




}
