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

const routes: Routes = [
  { path: 'quiz', component: QuizComponent },
  { path: 'instruction', component: InstructionsComponent },
  { path:'welcome', component: WelcomeComponent},
  { path:'login/:user',component:LoginComponent},
  {path:'verification',component:PhotoVerificationComponent},
  {path:'admin', component:HomeComponent},
  {path:'admin/upload',component:UploadDetailsComponent},
  {path:'admin/generate',component:LinkGeneratedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
