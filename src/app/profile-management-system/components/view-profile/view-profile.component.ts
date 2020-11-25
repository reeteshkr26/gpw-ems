import { HostListener } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { TokenStorageService } from "src/app/user-management-system/service/token-storage.service";
import { ProfileModel } from "../../model/profile-model";
import { ProfileService } from "../../service/profile.service";
import { EditProfileContactDetailsComponent } from "../edit-profile-contact-details/edit-profile-contact-details.component";
import { EditProfileImageComponent } from "../edit-profile-image/edit-profile-image.component";

@Component({
  selector: "app-view-profile",
  templateUrl: "./view-profile.component.html",
  styleUrls: ["./view-profile.component.css"],
})
export class ViewProfileComponent implements OnInit {
  style_variable: boolean = false;

  loadData: boolean = false;

  errorOccurs: boolean = false;
  errorMsg: string = "";
  profile: ProfileModel = null;
  userName: string;
  timestamp;
  constructor(
    private profileService: ProfileService,
    private tokenStorageService: TokenStorageService,
    private dialog: MatDialog
  ) {
    this.profileService.profileServiceEvent.subscribe((result) => {
      this.loadProfile();
    });
  }

  ngOnInit(): void {
    this.loadData = true;
    this.loadProfile();
  }

  loadProfile() {
    this.userName = this.tokenStorageService.getUser().username;
    this.profileService
      .viewProfile(this.tokenStorageService.getUser().username)
      .subscribe(
        (data) => {
          console.log(data);
          this.profile = data;
          this.loadData = false;
          this.errorOccurs = false;
        },
        (err) => {
          console.log(err);
          this.loadData = false;
          this.errorOccurs = true;
          this.errorMsg = err.error.error;
        }
      );
  }

  openProfileImagePopUp() {
    let dialogRef = this.dialog.open(EditProfileImageComponent, {
      data: { profileInfo: this.profile },
    });
    dialogRef.disableClose = true;
  }

  openProfileContactDetailsPopUp() {
    let dialogRef = this.dialog.open(EditProfileContactDetailsComponent, {
      data: { profileInfo: this.profile },
    });
    dialogRef.disableClose = true;
  }

  @HostListener("document:scroll")
  scrollFunction() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.style_variable = true;
    } else {
      this.style_variable = false;
    }
  }
}
