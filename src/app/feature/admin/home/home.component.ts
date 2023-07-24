import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TestDataService } from 'src/app/service/test-data.service';
import { PrimeNGConfig } from 'primeng/api';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {

  catagories:any;
  sortOptions: any[];
  sortOrder: number;
  sortField: string;
  sortKey:any;
  loading=true;


  dataSubs:Subscription;
  
  constructor(private testService:TestDataService,private primengConfig: PrimeNGConfig) { }
  ngOnDestroy(): void {
    this.dataSubs.unsubscribe()
  }

  ngOnInit(): void {
   const adminId = sessionStorage.getItem("UserId");
   this.dataSubs = this.testService.getAllTest(adminId).subscribe(res=>{
    this.catagories=res;
    console.log(res);
    this.loading=false;
   },error=>{
    console.log(error)
   })

this.primengConfig.ripple = true;
  }

}
