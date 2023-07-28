import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { Clipboard } from '@angular/cdk/clipboard';


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
  link:string='https://www.w3schools.com/howto/howto_js_copy_clipboard.asp';
  copied:boolean=false;

   constructor(private sanitizer: DomSanitizer,private messageService: MessageService,private clipboard: Clipboard) {}

  ngOnInit(): void {


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
  }
  
}
