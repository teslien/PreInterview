import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TestDataService } from 'src/app/service/test-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnDestroy {

  roundDetails:boolean=false;
  private eventSubscription: Subscription;
  CurrentQuestion: any;

  constructor(private route:Router,private testDataService: TestDataService) { }
  
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  ngOnInit(): void {
    
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.roundDetails = event.url.includes('/quiz');
      }
    });

    this.eventSubscription = this.testDataService.UpdateNavbar.subscribe((res) => {
      this.CurrentQuestion= res;
    });
  }


}
