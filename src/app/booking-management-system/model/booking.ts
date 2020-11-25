import { EventModel } from "src/app/event-management-system/model/event-model";

export class Booking {

  public bookingId: number;
  public fullname:string;
  public email:string;
  public mobileNo:string;
  public eventId: number;
  public customerId: string;
  public bookingDate: Date;
  public numberOfSeats: number;
  public event: EventModel;
  public bookingStatus:number

  constructor() {}
}
