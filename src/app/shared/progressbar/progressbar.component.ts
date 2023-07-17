import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {

  @Input() maxValue: number =0;
  @Input() value: number =0;
  @Input() testName:string;

  constructor() { }

  ngOnInit(): void {
}

}