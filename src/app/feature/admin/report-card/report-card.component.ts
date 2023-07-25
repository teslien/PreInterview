import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TestDataService } from 'src/app/service/test-data.service';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss']
})
export class ReportCardComponent implements OnInit,OnDestroy {

  loading:boolean=true;
  extraDetails:any;
  
  constructor(private testService: TestDataService,private activatedRoute: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
  value=0;
  reportCard:any;
  adminId=sessionStorage.getItem('UserId');
  dataSubscription:Subscription;

  ngOnInit(): void {
    this.dataSubscription= this.activatedRoute.queryParams.subscribe(data=>{
      const obj = data;
      this.testService.getSpecificApplicantdata(obj['id'],this.adminId).subscribe((res)=>{
        this.reportCard=res;
        this.value=this.reportCard.score;
        this.getUserInfo(this.reportCard.ip);
        this.loading=false;
        console.log(this.reportCard);
      })
    })

  }

  getUserInfo(info:any){
    console.log(info);
      this.testService.getUserInfo(info).subscribe((res)=>{
        console.log(res);
        this.extraDetails=res;
      })
    
    }

}
