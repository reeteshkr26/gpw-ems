import { getActiveOffset } from '@angular/material/datepicker/multi-year-view';
import { ContactModel } from './contact-model';
import { ProfileImage } from './profile-image';

export class ProfileModel {

  public profileId:number;
	public userId:number;

	public profileName:string;

	public profileImage:ProfileImage;

	public contact:ContactModel;

  public profileStatus:number;

  constructor(){}
}

