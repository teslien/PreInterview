import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  Next="Next"
  bgColorBtn='#3266CA';
  bgColorSEBtn='#FBFBFB';
  currentQuestionIndex:number=0;
  optionChoosen:boolean=false;
  optionChoosenIndex:number=0;

  ngOnInit(): void {
  }

  quizData = [
    {
      qNo:1,
      statement:'Consider the following definition of demo module.',
      image:'../../../assets/images/france.jpg',
      question: 'What is the capital of France?',
      options: [
      {
        name:'Paris',
        id:1,
        inputIndex:-1
      },
      { name:'Madrid',
        id:2,
        inputIndex:-1
      },
      { name:'Rome',
        id:3,
        inputIndex:-1
      },
      { name:'London',
        id:4,
        inputIndex:-1
      }
    ],
    
      answer: 'Paris',
      input:'',
    },
    {
      qNo:2,
      statement:'Consider the following definition of demo module.',
      image:'../../../assets/images/japan.jpg',
      question: 'What is the currency of Japan?',
      options: [
      {
        name:'Yen',
        id:1,
        inputIndex:-1
      },
      { name:'Dollar',
        id:2,
        inputIndex:-1
      },
      { name:'Pound',
        id:3,
        inputIndex:-1
      },
      { name:'Euro',
        id:4,
        inputIndex:-1
      }
    
    ],
      answer: 'Yen',
      input:'',
      inputIndex:-1
    },
    {
      qNo: 3,
      statement: 'Consider the following statement.',
      image: '../../../assets/images/solar.jpg',
      question: 'What is the largest planet in our solar system?',
      options: [
        {
          name: 'Jupiter',
          id: 1,
          inputIndex: -1
        },
        {
          name: 'Mars',
          id: 2,
          inputIndex: -1
        },
        {
          name: 'Earth',
          id: 3,
          inputIndex: -1
        },
        {
          name: 'Venus',
          id: 4,
          inputIndex: -1
        }
      ],
      answer: 'Jupiter',
      input: ''
    },
    {
      qNo: 4,
      statement: 'Consider the following statement.',
      image: '',
      question: 'Who painted the Mona Lisa?',
      options: [
        {
          name: 'Leonardo da Vinci',
          id: 1,
          inputIndex: -1
        },
        {
          name: 'Pablo Picasso',
          id: 2,
          inputIndex: -1
        },
        {
          name: 'Vincent van Gogh',
          id: 3,
          inputIndex: -1
        },
        {
          name: 'Michelangelo',
          id: 4,
          inputIndex: -1
        }
      ],
      answer: 'Leonardo da Vinci',
      input: ''
    },
     // Question 5
  {
    qNo: 5,
    statement: 'Consider the following statement.',
    image: '',
    question: 'Which country is known as the "Land of the Rising Sun"?',
    options: [
      {
        name: 'Japan',
        id: 1,
        inputIndex: -1
      },
      {
        name: 'China',
        id: 2,
        inputIndex: -1
      },
      {
        name: 'India',
        id: 3,
        inputIndex: -1
      },
      {
        name: 'Australia',
        id: 4,
        inputIndex: -1
      }
    ],
    answer: 'Japan',
    input: ''
  },
  // Question 6
  {
    qNo: 6,
    statement: 'Consider the following statement.',
    image: '',
    question: 'What is the chemical symbol for gold?',
    options: [
      {
        name: 'Au',
        id: 1,
        inputIndex: -1
      },
      {
        name: 'Ag',
        id: 2,
        inputIndex: -1
      },
      {
        name: 'Fe',
        id: 3,
        inputIndex: -1
      },
      {
        name: 'Cu',
        id: 4,
        inputIndex: -1
      }
    ],
    answer: 'Au',
    input: ''
  },
  // Question 7
  {
    qNo: 7,
    statement: 'Consider the following statement.',
    image: '',
    question: 'Which planet is known as the "Red Planet"?',
    options: [
      {
        name: 'Mars',
        id: 1,
        inputIndex: -1
      },
      {
        name: 'Mercury',
        id: 2,
        inputIndex: -1
      },
      {
        name: 'Venus',
        id: 3,
        inputIndex: -1
      },
      {
        name: 'Saturn',
        id: 4,
        inputIndex: -1
      }
    ],
    answer: 'Mars',
    input: ''
  },
  // Question 8
  {
    qNo: 8,
    statement: 'Consider the following statement.',
    image: '',
    question: 'What is the largest ocean in the world?',
    options: [
      {
        name: 'Pacific Ocean',
        id: 1,
        inputIndex: -1
      },
      {
        name: 'Atlantic Ocean',
        id: 2,
        inputIndex: -1
      },
      {
        name: 'Indian Ocean',
        id: 3,
        inputIndex: -1
      },
      {
        name: 'Arctic Ocean',
        id: 4,
        inputIndex: -1
      }
    ],
    answer: 'Pacific Ocean',
    input: ''
  },
  // Question 9
  {
    qNo: 9,
    statement: 'Consider the following statement.',
    image: '',
    question: 'What is the largest country in the world?',
    options: [
      {
        name: 'Russia',
        id: 1,
        inputIndex: -1
      },
      {
        name: 'Canada',
        id: 2,
        inputIndex: -1
      },
      {
        name: 'China',
        id: 3,
        inputIndex: -1
      },
      {
        name: 'United States',
        id: 4,
        inputIndex: -1
      }
    ],
    answer: 'Russia',
    input: ''
  },
  // Question 10
  {
    qNo: 10,
    statement: 'Consider the following statement.',
    image: '',
    question: 'Which famous scientist developed the theory of general relativity?',
    options: [
      {
        name: 'Albert Einstein',
        id: 1,
        inputIndex: -1
      },
      {
        name: 'Isaac Newton',
        id: 2,
        inputIndex: -1
      },
      {
        name: 'Galileo Galilei',
        id: 3,
        inputIndex: -1
      },
      {
        name: 'Stephen Hawking',
        id: 4,
        inputIndex: -1
      }
    ],
    answer: 'Albert Einstein',
    input: ''
  }
  ];


  onAnswerSelected(id:number,selectedValue:string,currentIndex:number){
  this.optionChoosen=!this.optionChoosen;
  if(this.optionChoosen)
  {
   this.quizData[currentIndex].input = selectedValue;
   const objectToUpdate = this.quizData[currentIndex].options.find(obj => obj.id === id);
   if(objectToUpdate)
   {
    objectToUpdate.inputIndex=id;
   }

  }
  else{

    this.quizData[currentIndex].input = '';
    const objectToUpdate = this.quizData[currentIndex].options.find(obj => obj.id === id);
    if(objectToUpdate)
    {
     objectToUpdate.inputIndex=-1;
    }

  }
}

  onNext(){
    this.optionChoosen=false;
    this.currentQuestionIndex++;
  }

  onBack(){
    this.optionChoosen=true;
    this.currentQuestionIndex--;
  }

}
