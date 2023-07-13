import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss']
})
export class ReportCardComponent implements OnInit {

  constructor() { }
  value=100;
  ngOnInit(): void {
  }

}
