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
import { CountdownComponent } from './shared/countdown/countdown.component';
import { LoginComponent } from './feature/login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PhotoVerificationComponent } from './feature/photo-verification/photo-verification.component';
import {WebcamModule} from 'ngx-webcam';
import { HomeComponent } from './feature/admin/home/home.component';
import { UploadDetailsComponent } from './feature/admin/upload-details/upload-details.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateComponent } from './feature/admin/create/create.component';
import { AddQuestionsComponent } from './feature/admin/add-questions/add-questions.component';
import { TestResultComponent } from './feature/test-result/test-result.component';
import { ViewApplicantsComponent } from './feature/admin/view-applicants/view-applicants.component';
import { ReportCardComponent } from './feature/admin/report-card/report-card.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { ProfileComponent } from './feature/admin/profile/profile.component';
import { SecToMinPipe } from './sec-to-min.pipe';
import { ShufflePipe } from './shuffle.pipe';


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
    WelcomeComponent,
    CountdownComponent,
    LoginComponent,
    PhotoVerificationComponent,
    HomeComponent,
    UploadDetailsComponent,
    CreateComponent,
    AddQuestionsComponent,
    TestResultComponent,
    ViewApplicantsComponent,
    ReportCardComponent,
    LoaderComponent,
    ProfileComponent,
    SecToMinPipe,
    ShufflePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    FormsModule,
    BrowserAnimationsModule,
    WebcamModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
