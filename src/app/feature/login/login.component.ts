import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestDataService } from 'src/app/service/test-data.service';
import { Subscription } from 'rxjs';
import {MessageService} from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
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

  loginForm:FormGroup;
  

  constructor(private router:Router, private route:ActivatedRoute,private testService : TestDataService,private messageService: MessageService) { }
  
  
  ngOnDestroy(): void {
    this.dataSubcription.unsubscribe();
  }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      'emailid': new FormControl(null,[Validators.email,Validators.required]),
      'possword':new FormControl(null,Validators.required)
    })


   sessionStorage.clear();
   localStorage.clear();
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

    if(this.loginForm.valid){
      if(this.activeUser=="admin"){
        const admins = this.adminArray.find(u => u.email == this.loginForm.get('emailid').value && u.password == this.loginForm.get('possword').value);
        if (admins) {
          sessionStorage.setItem("UserId", admins.id);
          // this.auth.haveloggedin = true;
          this.router.navigate(['/admin/tests']);
        } else {
          this.showError();
        }
      }
      else if(this.activeUser=="applicant"){
        const applicant = this.applicantArray.find(u => u.email == this.loginForm.get('emailid').value && u.mobile_number== this.loginForm.get('possword').value);
        if(applicant){
          this.testService.SendUserInfo(applicant);
          sessionStorage.setItem("admid",this.activeId);
          sessionStorage.setItem("UserName", applicant.name);
          sessionStorage.setItem("ApplicantId", applicant.id);
          this.router.navigate(['/welcome']);
        }
      }

    }

  }


  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'User Not Found'}); 
  }


}
