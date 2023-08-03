import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TestDataService } from 'src/app/service/test-data.service';
import {ConfirmationService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-view-applicants',
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.scss'],
  providers:[MessageService,ConfirmationService]
})
export class ViewApplicantsComponent implements OnInit {

  adminId=sessionStorage.getItem('UserId')
  ExcelData:any[]=[];
  load:boolean=true;
  loading:boolean=true;
  boolValue:boolean;
 

  constructor(private confirmationService: ConfirmationService,private primengConfig: PrimeNGConfig,private testService: TestDataService,private route:Router,private message:MessageService) { }

  ngOnInit(): void {
    this.testService.getApplicantData(this.adminId).subscribe(res=>{
      this.ExcelData=res;
      this.load=false;
      this.loading=false;
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

  highlight(score:number,total:number){
    let result = score/total*100;
    if(result>60){
      this.boolValue=true;
    }else{
      this.boolValue=false;
    }
    return this.boolValue;
  }

  confirmDelete(id:any,event:MouseEvent,name:any) {
    event.stopPropagation();
    this.confirmationService.confirm({
        message: `Do you want to delete this record of ${name}?`,
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          const tragetObject = this.ExcelData.find(item => item.id === id);
          const indexToDelete = this.ExcelData.indexOf(tragetObject);
          if (tragetObject) {
            this.ExcelData.splice(indexToDelete, 1);
          } 
          this.testService.deleteApplicant(this.adminId,id).subscribe(res=>{
            this.message.add({severity:'success', summary:'Succesfully', detail:'Deleted'});
          })
        },
        reject: () => {
          this.message.add({severity:'info', summary:'Rejected', detail:'Item not deleted'});
        }
    });
}


}
