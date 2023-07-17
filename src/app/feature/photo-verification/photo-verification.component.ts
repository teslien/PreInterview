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
  //location 
  public lat;
  public lng;

    

  constructor(private testDataService:TestDataService) { }

  ngOnInit(): void {
    this.getUserIp();
    this.getLocation();
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
     this.getUserInfo(this.UserIpAddress.ip);
    })
  }

  getUserInfo(info:any){
  console.log(info);
    this.testDataService.getUserInfo(info).subscribe((res)=>{
      console.log(res);
    })
  
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
