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
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PhotoVerificationComponent } from './feature/photo-verification/photo-verification.component';
import {WebcamModule} from 'ngx-webcam';
import { HomeComponent } from './feature/admin/home/home.component';
import { UploadDetailsComponent } from './feature/admin/upload-details/upload-details.component';
import { LinkGeneratedComponent } from './feature/admin/link-generated/link-generated.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateComponent } from './feature/admin/create/create.component';
import { AddQuestionsComponent } from './feature/admin/add-questions/add-questions.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


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
    LinkGeneratedComponent,
    CreateComponent,
    AddQuestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    FormsModule,
    BrowserAnimationsModule,
    WebcamModule,
    HttpClientModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
