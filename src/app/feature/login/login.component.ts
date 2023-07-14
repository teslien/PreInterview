import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestDataService } from 'src/app/service/test-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  inputpassword:any;
  emailId:any;
  activeUser:any='';
  adminId:any;
  adminArray:any[];
  dataSubcription:Subscription;

  constructor(private router:Router, private route:ActivatedRoute,private testService : TestDataService) { }

  ngOnInit(): void {
   this.activeUser =  this.route.snapshot.params['user'];
   this.adminId = this.route.snapshot.params['id'];
   this.dataSubcription = this.testService.getAdminData().subscribe((res)=>{
    this.adminArray=res;
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
      // this.showError();
    }
  }
  else if(this.activeUser=="applicant"){
    this.router.navigate(['/welcome']);
  }
  }

}
