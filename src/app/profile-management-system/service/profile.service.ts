import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ContactModel } from '../model/contact-model';
import { ProfileModel } from '../model/profile-model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profileServiceEvent = new Subject<string>();
  baseUrl:string;

  constructor(private http:HttpClient) {
    this.baseUrl=`${environment.baseMWUrl}/profile-management-service/api`;
   }

   profileImageUpload(profileId:number,formData:FormData):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/updateProfile/imageUpload/${profileId}`,formData);
   }

   updateProfileContactDetails(profileId:number,contact:ContactModel):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/updateProfile/contactDetails/${profileId}`,contact);
  }
  viewProfile(profileName:string):Observable<ProfileModel>{
    return this.http.get<ProfileModel>(`${this.baseUrl}/viewProfile/profileName/${profileName}`);
  }
  viewProfileByProfileId(profileId:number):Observable<ProfileModel>{
    return this.http.get<ProfileModel>(`${this.baseUrl}/viewProfile/${profileId}`);
  }
}
