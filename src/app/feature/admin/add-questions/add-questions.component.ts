import { Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {
  
  text:any;
  Options:any[]=[
  {
    name:"Option 1",
    key:1,
    check:false
  },
  {
    name:"Option 2",
    key:2,
    check:false
  }
];
  constructor() { }

  ngOnInit(): void {

  }
  
  addOptions(){
    const len = this.Options.length+1;
    this.Options.push({
      name:"Option "+len,
      key:len,
      check:false
    })
  }

  deleteOptions(){
    
  }
  


}
