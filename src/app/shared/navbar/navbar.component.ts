import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TestDataService } from 'src/app/service/test-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnDestroy {

  roundDetails:boolean=false;
  private eventSubscription: Subscription;
  private UserDataSubscription: Subscription;
  CurrentQuestion: any=1;
  Applicant:boolean;
  userArray:any;
  adminArray:any;
  admintoken=sessionStorage.getItem('UserId');
  applicanttoken=sessionStorage.getItem('ApplicantId')
  admid=sessionStorage.getItem('admid');
  UserName=sessionStorage.getItem("UserName");

  constructor(private route:Router,private testDataService: TestDataService) { }
  
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
    this.UserDataSubscription.unsubscribe();
  }

  ngOnInit(): void {



    this.Applicant = Boolean(sessionStorage.getItem('UserId'));
    
    this.getUserData();
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.roundDetails = event.url.includes('/quiz');
      }
    });

    this.eventSubscription = this.testDataService.UpdateNavbar.subscribe((res) => {
      this.CurrentQuestion= res;
    });

  }


getUserData(){
if(this.applicanttoken){
  console.log(this.applicanttoken);
    this.UserDataSubscription=this.testDataService.getSpecificApplicantdata(this.applicanttoken,this.admid).subscribe((res)=>{
      this.userArray=res;
      sessionStorage.setItem("TestId",this.userArray.test_allocated_id)
      this.testDataService.SendUserInfo(this.userArray);
    
      console.log("Here Bro!",this.userArray);
    })
}
else if(this.admintoken){
  this.UserDataSubscription=this.testDataService.getSpecificAdmindata(this.admintoken).subscribe((res)=>{
    this.adminArray=res;
    console.log(this.adminArray);
  })
}
}


  logout(){
    sessionStorage.clear();
    this.route.navigate(['/login/admin/0']);
  }

}
