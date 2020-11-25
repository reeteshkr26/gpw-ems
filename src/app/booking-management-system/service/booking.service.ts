import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking } from '../model/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  baseUrl:string;
  constructor(private httpservice:HttpClient) {
    this.baseUrl=`${environment.baseMWUrl}/booking-service/api/booking`
  }

  bookEvent(booking:Booking):Observable<Booking>{
    return this.httpservice.post<Booking>(`${this.baseUrl}/bookevent`,booking);
  }

  getBookingByCustomerId(customerId:string):Observable<Booking[]>{
    return this.httpservice.get<Booking[]>(`${this.baseUrl}/getbooking/custId/${customerId}`);
  }

  public getBookingByEventId(eventId: number){
    return this.httpservice.get(this.baseUrl+"/getbooking/eventId/"+eventId, {responseType: 'json'});
  }

  public getAllBookings(){
    return this.httpservice.get(this.baseUrl+"/getallbookings", {responseType: 'json'});
  }

  public cancelBooking(bookingId:number){
    return this.httpservice.delete(this.baseUrl+"/cancelbooking/"+bookingId, {responseType: 'json'});
  }

  updateBookingStatus(bookingId:number):Observable<any>{
    let statusCode={
      "statusCode":2
    }
    return this.httpservice.put<any>(`${this.baseUrl}/updateStatus/${bookingId}`,statusCode);
  }
 /* public getEvents(eventId : number){
    return this.httpservice.get("http://localhost:7002/api"+"/events/"+eventId, {responseType: 'json'});
  }

  public getScheduleById(Id: number){
    return this.httpservice.get("http://localhost:7003/api/schedules/"+Id,  {responseType: 'json'});
  }

  public getSchedulesByEventId(Id: number){
    return this.httpservice.get("http://localhost:7003/api/schedule/event/"+Id,  {responseType: 'json'});
  }*/
}
