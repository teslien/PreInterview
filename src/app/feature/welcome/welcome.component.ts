import { Component, OnInit } from '@angular/core';
import { TestDataService } from 'src/app/service/test-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {


  userDetails:any;
  constructor(private testService:TestDataService) { }

  ngOnInit(): void {
    this.testService.applicantdatalog.subscribe(res=>{
      this.userDetails=res;
    })
  }

}
