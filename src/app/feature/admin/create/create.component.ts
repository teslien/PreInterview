import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserdataService } from 'src/app/service/shareData/userdata.service';
import {MessageService} from 'primeng/api';
import { FormControl,FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [MessageService]
})
export class CreateComponent implements OnInit {

  Categories: any;
  Levels:any;
  testForm:FormGroup;

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
    this.Levels = [
      {
        name:'Easy',
        code:1
      },
      {
        name:'Medium',
        code:2
      },
      {
        name:'Hard',
        code:3

      }
    ]

   this.testForm= new FormGroup({
      'assessment':new FormControl(null,Validators.required),
      'Categories':new FormControl(null,Validators.required),
      'shuffle': new FormControl(null),
      'totalQuestions': new FormControl(null,Validators.required),
      'totalmins': new FormControl(null,Validators.required),
      'Levels':new FormControl(null)

  })
}

  OnNextt() {

    if (this.testForm.valid) {
      const quizdata = {
        "testName": this.testForm.get('assessment').value,
        "totalQuestions": this.testForm.get('totalQuestions').value,
        "totalTimeInMins": this.testForm.get('totalmins').value,
        "category":this.testForm.get('Categories').value,
        "shuffle": this.testForm.get('shuffle').value,
        "level":this.testForm.get('Levels').value
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

