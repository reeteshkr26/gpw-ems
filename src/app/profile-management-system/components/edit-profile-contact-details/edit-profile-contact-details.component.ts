import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContactModel } from '../../model/contact-model';
import { ProfileModel } from '../../model/profile-model';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-edit-profile-contact-details',
  templateUrl: './edit-profile-contact-details.component.html',
  styleUrls: ['./edit-profile-contact-details.component.css']
})
export class EditProfileContactDetailsComponent implements OnInit {

  profile:ProfileModel;
  contact:ContactModel;
  loadData=false;
  errorOccurs=false;
  errorMsg:string='';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private profileService:ProfileService,
    private dialogRef:MatDialogRef<EditProfileContactDetailsComponent>
  ) {
    this.contact=new ContactModel();
  }

  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo(){
    this.profile=this.data.profileInfo;
    this.contact=this.profile.contact;
  }

  updateContactDetails(){
    this.loadData=true;
    console.log(this.contact);

    this.profileService.updateProfileContactDetails(this.profile.profileId,this.contact).subscribe((data)=>{
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
