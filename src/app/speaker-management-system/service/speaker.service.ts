import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../model/contact';
import { SpeakerModel } from '../model/speaker-model';

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {
  baseUrl:string;
  constructor(private http:HttpClient) {
    this.baseUrl=`${environment.baseMWUrl}/speaker-service/api`;
  }

  addSpeaker(formData:FormData):Observable<SpeakerModel>{
    return this.http.post<SpeakerModel>(`${this.baseUrl}/addSpeaker`,formData);
  }

  viewSpeakerById(speakerId:number):Observable<SpeakerModel>{
    return this.http.get<SpeakerModel>(`${this.baseUrl}/speakers/${speakerId}`);
  }
  viewAllSpeakers():Observable<SpeakerModel[]>{
    return this.http.get<SpeakerModel[]>(`${this.baseUrl}/viewAll`);
  }
  deleteSpeaker(speakerId:number):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/deleteSpeaker/${speakerId}`);
  }
  modifySpeaker(speakerId:number,formData:FormData):Observable<SpeakerModel>{

    return this.http.put<SpeakerModel>(`${this.baseUrl}/modify/${speakerId}`,formData);
  }

  updateContactDetails(speakerId:number,contact:Contact):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/modify/contact/${speakerId}`,contact);
  }
}
