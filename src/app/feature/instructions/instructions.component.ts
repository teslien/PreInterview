import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {

  bgColorBtn='#3266CA';
  bgColorSEBtn='#FBFBFB';
  constructor() { }

  ngOnInit(): void {
  }

}
