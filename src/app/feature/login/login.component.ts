import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestDataService } from 'src/app/service/test-data.service';
import { Subscription } from 'rxjs';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit,OnDestroy {

  inputpassword:any;
  emailId:any;
  activeUser:any='';
  adminId:any;
  adminArray:any[];
  applicantArray:any[];
  dataSubcription:Subscription;
  applicantDataSubscription:Subscription;
  activeId:any;
  //location 
  public lat;
  public lng;
  

  constructor(private router:Router, private route:ActivatedRoute,private testService : TestDataService,private messageService: MessageService) { }
  
  
  ngOnDestroy(): void {
    this.dataSubcription.unsubscribe();
  }

  ngOnInit(): void {
   this.activeUser =  this.route.snapshot.params['user'];
   this.activeId =  this.route.snapshot.params['id'];


   this.dataSubcription = this.testService.getAdminData().subscribe((res)=>{
    this.adminArray=res;
   })
   this.applicantDataSubscription = this.testService.getApplicantData(this.activeId).subscribe(res=>{
    this.applicantArray=res;
   })
  }

  onLogin(){
  if(this.activeUser=="admin"){
    const admins = this.adminArray.find(u => u.email == this.emailId && u.password == this.inputpassword);
    if (admins) {
      localStorage.setItem("UserId", admins.id);
      // this.auth.haveloggedin = true;
      this.router.navigate(['/admin']);
    } else {
      this.showError();
    }
  }
  else if(this.activeUser=="applicant"){
    const applicant = this.applicantArray.find(u => u.email == this.emailId && u.password == this.inputpassword);
    if(applicant){
      localStorage.setItem("admid",this.activeId);
      localStorage.setItem("ApplicantId", applicant.id);
      this.router.navigate(['/welcome']);
    }
    else
    {
      this.showError();
    }
  }
  }


  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'User Not Found'}); 
  }


}
