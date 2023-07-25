import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-running-quiz',
  templateUrl: './running-quiz.component.html',
  styleUrls: ['./running-quiz.component.scss']
})
export class RunningQuizComponent implements OnInit {

  constructor(  private route:Router){}
  showNavbar: boolean=false;

  ngOnInit() {

    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !event.url.includes('/login');
      }
    });

    
  }



}
