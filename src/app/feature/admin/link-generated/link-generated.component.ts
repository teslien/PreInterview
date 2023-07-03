import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';


@Component({
  selector: 'app-link-generated',
  templateUrl: './link-generated.component.html',
  styleUrls: ['./link-generated.component.scss']
})
export class LinkGeneratedComponent implements OnInit {

  link:string='https://www.w3schools.com/howto/howto_js_copy_clipboard.asp';
  copied:boolean=false;

  constructor(private clipboard: Clipboard){}
  ngOnInit(): void {
  }

  copyText(textToCopy: string) {
    this.clipboard.copy(textToCopy);
    this.copied=true;
  }



}
