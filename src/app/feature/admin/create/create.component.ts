import { Component, OnInit } from '@angular/core';
import { UserdataService } from 'src/app/service/shareData/userdata.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  testName: String;
  Categories: any;
  stateOptions: { label: string; value: string; }[];
  shuffle: boolean;
  noOfQuestion: any;
  min: any;

  constructor(private quizDataService: UserdataService) { }


  selectedCategory: any;
  ngOnInit(): void {
    this.Categories = [
      { name: 'Apptitude Test', code: 'NY' },
      { name: 'Personality Assesment', code: 'RM' },
      { name: 'Technical Skill Evaluation', code: 'LDN' },
      { name: 'Problem Solving Exercise', code: 'IST' },
      { name: 'Programming Language Knowledge', code: 'PRS' },
      { name: 'Coding Challenge', code: 'PRS' },
      { name: 'Other', code: 'PRS' }

    ];

    this.stateOptions = [
      { label: 'Off', value: 'false' },
      { label: 'On', value: 'true' },
    ];

  }

  OnNextt() {
    const quizdata={
            "testName":this.testName,
            "totalQuestions":this.noOfQuestion,
            "totalTimeInMins":this.min,
            "shuffle":this.shuffle
    }
    console.log(quizdata);
    // this.quizDataService.getTestData();

  }


}
