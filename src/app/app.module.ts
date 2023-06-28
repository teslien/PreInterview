import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ProgressbarComponent } from './shared/progressbar/progressbar.component';
import { PrimengModule } from './primeng/primeng.module';
import { QuizComponent } from './feature/quiz/quiz.component';
import { ButtonComponent } from './shared/button/button.component';
import { RunningQuizComponent } from './feature/running-quiz/running-quiz.component';
import { InstructionsComponent } from './feature/instructions/instructions.component';
import { WrapInstructionComponent } from './shared/wrap-instruction/wrap-instruction.component';
import { WelcomeComponent } from './feature/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProgressbarComponent,
    QuizComponent,
    ButtonComponent,
    RunningQuizComponent,
    WrapInstructionComponent,
    InstructionsComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
