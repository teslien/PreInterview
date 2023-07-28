import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TestDataService } from 'src/app/service/test-data.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { NavigationExtras, Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[MessageService]
})
export class HomeComponent implements OnInit,OnDestroy {

  catagories:any;
  sortOptions: any[];
  sortOrder: number;
  sortField: string;
  sortKey:any;
  loading=true;


  dataSubs:Subscription;
  
  constructor(private testService:TestDataService,private primengConfig: PrimeNGConfig,private route:Router,private MessageService:MessageService) { }
  ngOnDestroy(): void {
    this.dataSubs.unsubscribe()
  }

  ngOnInit(): void {
   const adminId = sessionStorage.getItem("UserId");
   this.dataSubs = this.testService.getAllTest(adminId).subscribe(res=>{
    this.catagories=res;
  
    this.loading=false;
   },error=>{
    this.MessageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
   })

this.primengConfig.ripple = true;
  }



  OpenTest(id:any){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: JSON.stringify(id)
      }
    };
  
    this.route.navigate(['admin/upload/'], navigationExtras);
  }
  }

