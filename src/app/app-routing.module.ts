import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './feature/quiz/quiz.component';
import { InstructionsComponent } from './feature/instructions/instructions.component';
import { WelcomeComponent } from './feature/welcome/welcome.component';
import { LoginComponent } from './feature/login/login.component';
import { PhotoVerificationComponent } from './feature/photo-verification/photo-verification.component';
import { HomeComponent } from './feature/admin/home/home.component';
import { UploadDetailsComponent } from './feature/admin/upload-details/upload-details.component';
import { LinkGeneratedComponent } from './feature/admin/link-generated/link-generated.component';
import { CreateComponent } from './feature/admin/create/create.component';
import { AddQuestionsComponent } from './feature/admin/add-questions/add-questions.component';
import { TestResultComponent } from './feature/test-result/test-result.component';
import { ViewApplicantsComponent } from './feature/admin/view-applicants/view-applicants.component';
import { ReportCardComponent } from './feature/admin/report-card/report-card.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'login/admin/0',pathMatch:'full'},
  {path: 'quiz', component: QuizComponent },
  {path: 'instruction', component: InstructionsComponent },
  {path:'welcome', component: WelcomeComponent},
  {path:'login/:user/:id',component:LoginComponent},
  {path:'verification',component:PhotoVerificationComponent},
  {path:'admin', component:HomeComponent ,canActivate: [AuthGuard]},
  {path:'admin/upload',component:UploadDetailsComponent,canActivate: [AuthGuard]},
  {path:'admin/generate',component:LinkGeneratedComponent,canActivate: [AuthGuard]},
  {path:'admin/create',component:CreateComponent,canActivate: [AuthGuard]},
  {path:'admin/createtest/add',component:AddQuestionsComponent,canActivate: [AuthGuard]},
  {path:'quiz/result',component:TestResultComponent},
  {path:'admin/applicants',component:ViewApplicantsComponent,canActivate: [AuthGuard]},
  {path:'admin/tests',component:HomeComponent,canActivate: [AuthGuard]},
  {path:'admin/applicant/report', component:ReportCardComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
