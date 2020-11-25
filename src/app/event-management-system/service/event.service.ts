import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { EventModel } from "../model/event-model";
import { UpdateRequest } from "../model/update-request";

@Injectable({
  providedIn: "root",
})
export class EventService {
  private baseUrl: string;
  public movieServiceEvent = new BehaviorSubject({});
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.baseMWUrl}/event-service/api`;
  }

  addEvent(formData: FormData): Observable<EventModel> {
    return this.http.post<EventModel>(`${this.baseUrl}/event/create`, formData);
  }

  updateEventInfo(eventId: number, request: UpdateRequest): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/event/updateEventInfo/${eventId}`,
      request
    );
  }

  updateEvent(eventId: number, formData: FormData): Observable<EventModel> {
    return this.http.put<EventModel>(
      `${this.baseUrl}/event/updateDetails/${eventId}`,
      formData
    );
  }

  getEventById(eventId: number): Observable<EventModel> {
    return this.http.get<EventModel>(`${this.baseUrl}/events/${eventId}`);
  }

  getAllEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(`${this.baseUrl}/events`);
  }

  getEventsbyStatusCode(statusCode: number): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(
      `${this.baseUrl}/events/stausCode/${statusCode}`
    );
  }

  getEventsbyCategory(category: string): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(
      `${this.baseUrl}/events/eventCategory/${category}`
    );
  }

  deleteEvent(eventId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/event/delete/${eventId}`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError("Something bad happened; please try again later.");
  }
}
