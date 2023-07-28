import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { Clipboard } from '@angular/cdk/clipboard';
import { TestDataService } from 'src/app/service/test-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {

  UserImage:any;
  userData:any;
  fullname:any;
  emailId:any;
  userPassword:any;
  UpdatedImage:any;
  imageUrl: SafeResourceUrl;
  selectedFile: File;
  CurrentUserLoginId: string;
  link:string='fetching link.....';
  copied:boolean=false;
  profileForm:FormGroup;

   constructor(private sanitizer: DomSanitizer,private messageService: MessageService,private clipboard: Clipboard,private testserivce :TestDataService) {}

  ngOnInit(): void {
  const admin = sessionStorage.getItem('UserId')
  this.link= `https://wondertest.netlify.app/#/login/applicant/${admin}`;
  this.getUserDetails();

  }

  getUserDetails(){
    this.testserivce.updateProfile.subscribe(res=>{
      this.userData=res;
      this.imageUrl = this.userData.profile_pic?.changingThisBreaksApplicationSecurity;
      this.profileForm=new FormGroup({
        'name':new FormControl(this.userData.name,Validators.required),
        'email': new FormControl(this.userData.email,Validators.required),
        'password':new FormControl(this.userData.password,Validators.required),
        'mobile_number':new FormControl(this.userData.mobile,[Validators.required]),
        'location':new FormControl(this.userData.location,Validators.required),
        'pin':new FormControl(this.userData.pin,Validators.required),
        'company':new FormControl(this.userData.company_name,Validators.required)
    
      })
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(event.target.result);
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


  removeImage() {
    this.selectedFile = null;
    this.imageUrl = null;
  }

  copyText(textToCopy: string) {
    this.clipboard.copy(textToCopy);
    this.copied=true;
    this.messageService.add({severity:'info', summary: 'Info', detail: 'Linked Copied'});
  }
  

  OnSave(){
    
      const admin = sessionStorage.getItem('UserId')
      const updatedProfile={
        name:this.profileForm.get('name').value,
        email:this.profileForm.get('email').value,
        password:this.profileForm.get('password').value,
        mobile:this.profileForm.get('mobile_number').value,
        location:this.profileForm.get('location').value,
        pin:this.profileForm.get('pin').value,
        company_name:this.profileForm.get('company').value,
        profile_pic:this.imageUrl,
        noOfTest:0,
      }
      this.testserivce.UpDateAdminProfile(updatedProfile,admin).subscribe(res=>{
        this.messageService.add({severity:'success', summary:'Updated', detail:'User Details Saved'});
        this.testserivce.UpdatePic.emit(this.imageUrl);
      })
      
  }
}
