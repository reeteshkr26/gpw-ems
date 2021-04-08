import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment.prod';
import { ScheduleModel } from "../model/schedule-model";

@Injectable({
  providedIn: "root",
})
export class ScheduleService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.baseMWUrl}/schedule-service/api`;
  }

  addSchedule(schedule: ScheduleModel): Observable<ScheduleModel> {
    return this.http.post<ScheduleModel>(
      `${this.baseUrl}/addSchedule`,
      schedule
    );
  }

  getScheduleById(scheduleId: number): Observable<ScheduleModel> {
    return this.http.get<ScheduleModel>(
      `${this.baseUrl}/schedules/${scheduleId}`
    );
  }
  getAllSchedules(): Observable<ScheduleModel[]> {
    return this.http.get<ScheduleModel[]>(`${this.baseUrl}/schedules`);
  }
  deleteSchedule(scheduleId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${scheduleId}`);
  }
  updateSchedule(
    scheduleId: number,
    schedule: ScheduleModel
  ): Observable<ScheduleModel> {
    return this.http.put<ScheduleModel>(
      `${this.baseUrl}/schedule/update/${scheduleId}`,
      schedule
    );
  }
  getScheduleDetailsByEventId(eventId: number): Observable<any> {
    console.log(eventId);
    return this.http.get<any>(
      `${this.baseUrl}/schedules/event/${eventId}`
    );
  }
}
