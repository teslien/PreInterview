import { Component, OnInit } from '@angular/core';
import { TestDataService } from 'src/app/service/test-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  //location 
  public lat;
  public lng;
  userDetails:any;
  constructor(private testService:TestDataService) { }

  ngOnInit(): void {
    this.testService.applicantdatalog.subscribe(res=>{
      this.userDetails=res;
    })
    const applicantid = localStorage.getItem("ApplicantId")
    this.getLocation(applicantid);
  }

  
getLocation(applicantid:any) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) {
        console.log("Latitude: " + position.coords.latitude +
          "Longitude: " + position.coords.longitude);
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log(this.lat);
        console.log(this.lng);
        this.testService.sendMyPicToCheatMonitor(applicantid,{"lat":this.lat,"lng":this.lng}).subscribe(res=>{
          console.log("Your Location is shared with 12th Wonder");
        })
      }
    },
      (error) => console.log(error));
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

}
