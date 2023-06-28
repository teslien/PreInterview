import { Component, OnInit, Input,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {

  @Input() customStyles: any = {};
  constructor() { }

  ngOnInit(): void {
  }

}
