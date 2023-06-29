import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProgressBarModule,
    InputTextModule,
    PasswordModule
  ],
  exports:[
    ProgressBarModule,
    InputTextModule,
    PasswordModule
  ]
})
export class PrimengModule { }
