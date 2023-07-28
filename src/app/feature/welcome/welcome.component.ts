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
  userDetails: any;
  constructor(private testService: TestDataService) { }

  ngOnInit(): void {
    this.userDetails = sessionStorage.getItem('UserName');
    const applicantid = sessionStorage.getItem("ApplicantId")
    const adminId = sessionStorage.getItem("admid")
    this.getLocation();
    this.testService.updateTestStatus({ test_status: "Live" }, applicantid, adminId).subscribe();
  }


  getLocation() {
    const applicantid = sessionStorage.getItem("ApplicantId")
    const adminId = sessionStorage.getItem("admid")
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
          console.log(this.lng);
          this.testService.updateLocation({
            lat: this.lat,
            lng: this.lng
          }, applicantid, adminId).subscribe()
        }
      },
        (error) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

}
