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
  totalQuestions:number;
  reportCard:any;
  adminId=sessionStorage.getItem('UserId');
  dataSubscription:Subscription;
  ImageData:any;

  ngOnInit(): void {
    this.dataSubscription= this.activatedRoute.queryParams.subscribe(data=>{
      const obj = data;
      this.testService.getSpecificApplicantdata(obj['id'],this.adminId).subscribe((res)=>{
        this.reportCard=res;
        this.value=this.reportCard.score;
        this.ImageData=this.reportCard.imageCaptured;
        this.totalQuestions=this.reportCard.totalquestions;
        this.getUserInfo(this.reportCard.ip);
        this.loading=false;

      })
    })

  }

  getUserInfo(info:any){
      this.testService.getUserInfo(info).subscribe((res)=>{
        this.extraDetails=res;
      })
    
    }




}
