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

  constructor(private route:Router,private testDataService: TestDataService) { }
  
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  ngOnInit(): void {

    this.Applicant = Boolean(localStorage.getItem('UserId'));
    
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
if(this.Applicant){
  const id = localStorage.getItem("ApplicantId");
  if(id!=null)
  {
    this.UserDataSubscription=this.testDataService.getSpecificApplicantdata(id).subscribe((res)=>{
      this.userArray=res;
    })
  }
}
else{
const id =localStorage.getItem("UserId");
if(id!=null){
  this.UserDataSubscription=this.testDataService.getSpecificAdmindata(id).subscribe(res=>{
    this.userArray=res;
  })
}
}
}


  logout(){
    localStorage.clear();
    this.route.navigate(['/login/admin']);
  }

}
