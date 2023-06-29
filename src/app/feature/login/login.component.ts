import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  inputpassword:any;
  emailId:any;
  activeUser:any='';
  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
   this.activeUser =  this.route.snapshot.params['user'];
  }

  onLogin(){
  this.router.navigate(['/welcome']);
  }

}
