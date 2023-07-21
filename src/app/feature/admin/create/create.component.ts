import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserdataService } from 'src/app/service/shareData/userdata.service';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [MessageService]
})
export class CreateComponent implements OnInit {

  testName: String;
  Categories: any;
  stateOptions: { label: string; value: string; }[];
  shuffle: boolean=false;
  noOfQuestion: any;
  min: any;
  

  constructor(private quizDataService: UserdataService, private route: Router,private messageService:MessageService) { }


  selectedCategory: any;
  ngOnInit(): void {
    this.Categories = [
      { name: 'Aptitude Test', code: 'NY' },
      { name: 'Personality Assesment', code: 'RM' },
      { name: 'Technical Skill Evaluation', code: 'LDN' },
      { name: 'Problem Solving Exercise', code: 'IST' },
      { name: 'Programming Language Knowledge', code: 'PRS' },
      { name: 'Coding Challenge', code: 'PRS' },
      { name: 'Other', code: 'PRS' }

    ];


  }

  OnNextt() {
    if (this.shuffle != undefined) {
      const quizdata = {
        "testName": this.testName,
        "totalQuestions": this.noOfQuestion,
        "totalTimeInMins": this.min,
        "category":this.selectedCategory,
        "shuffle": this.shuffle
      }
      console.log(quizdata);
      localStorage.setItem("customtest",JSON.stringify(quizdata))
      this.route.navigate(['/admin/createtest/add']);
    }
    else
    {
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Message Content'});
    }

  }


}
