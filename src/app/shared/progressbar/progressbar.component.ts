import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {

  @Input() maxValue: number =0;
  @Input() value: number =0;

  calculatedValue: number= 0;
  constructor() { }

  ngOnInit(): void {
    this.calculatedValue= Math.floor((this.value*100)/60);
}

}