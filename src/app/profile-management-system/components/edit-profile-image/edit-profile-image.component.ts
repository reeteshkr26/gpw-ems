import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileModel } from '../../model/profile-model';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-edit-profile-image',
  templateUrl: './edit-profile-image.component.html',
  styleUrls: ['./edit-profile-image.component.css']
})
export class EditProfileImageComponent implements OnInit {

  profile:ProfileModel;
  previewUrl:any = null;
  imagefileData:File=null;
  loadData=false;
  errorOccurs=false;
  errorMsg:string='';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private profileService:ProfileService,
    private dialogRef:MatDialogRef<EditProfileImageComponent>
  ) { }

  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo(){
    this.profile=this.data.profileInfo;
    this.previewUrl=this.profile.profileImage.imageUrl;
  }

  showPreview(event:any){
    this.imagefileData = <File>event.target.files[0];
    console.log(this.imagefileData);
      this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.imagefileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.imagefileData);
    reader.onload = (_event) => {
      console.log(this.previewUrl);
      this.previewUrl = reader.result;
    }
  }

  updateImage(){
    this.loadData=true;
    const formData=new FormData();
    formData.append("file",this.imagefileData);

    this.profileService.profileImageUpload(this.profile.profileId,formData).subscribe((data)=>{
      console.log(data);
      this.loadData=false;
      this.errorOccurs=false;
      this.dialogRef.close();
      this.profileService.profileServiceEvent.next("close");

    },
    (err)=>{
      console.log(err);
      this.errorMsg=err.error.error;
      this.loadData=false;
      this.errorOccurs=true;
      setTimeout(()=>this.errorOccurs=false,4000);
    }
    );
  }
}
