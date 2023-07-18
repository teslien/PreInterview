import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TestDataService } from 'src/app/service/test-data.service';

@Component({
  selector: 'app-view-applicants',
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.scss']
})
export class ViewApplicantsComponent implements OnInit {

  adminId=localStorage.getItem('UserId')
  ExcelData:any[]=[];
  load:boolean=true;
  constructor(private testService: TestDataService,private route:Router) { }

  ngOnInit(): void {
    this.testService.getApplicantData(this.adminId).subscribe(res=>{
      this.ExcelData=res;
      this.load=false;
      console.log(this.ExcelData);
    })
  }

  openReportCard(id: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: id
      }
    };
  
    this.route.navigate(['admin/applicant/report/'], navigationExtras);
  }
}
