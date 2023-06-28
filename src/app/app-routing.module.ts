import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './feature/quiz/quiz.component';
import { InstructionsComponent } from './feature/instructions/instructions.component';
import { WelcomeComponent } from './feature/welcome/welcome.component';

const routes: Routes = [
  { path: 'quiz', component: QuizComponent },
  { path: 'instruction', component: InstructionsComponent },
  { path:'welcome', component: WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
