import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { EventModel } from 'src/app/event-management-system/model/event-model';
import { EventService } from 'src/app/event-management-system/service/event.service';
import { TokenStorageService } from 'src/app/user-management-system/service/token-storage.service';
import { Booking } from '../../model/booking';
import { BookingService } from "../../service/booking.service";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.css"],
})
export class BookingComponent implements OnInit {
  reason: string;
  otherReason: string;
  eventId:number;
  event:EventModel=null;
  loadData:boolean=false;
  booking:Booking;
  errorMsg:string='';
  errorOccurs:boolean=false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private bookingService: BookingService,
    private eventService:EventService,
    private tokenStorage:TokenStorageService,
    private router: Router,
    private dialogRef:MatDialogRef<BookingComponent>
  ) {
    this.booking=new Booking();
  }

  ngOnInit(): void {
    this.loadData=true;
    this.loadEventData();
  }

  loadEventData(){
    this.eventId=this.data.eventId;
    this.eventService.getEventById(this.eventId).subscribe((res)=>{
      this.event=res;
      this.loadData=false;
      this.errorOccurs=false;
    },
    (err)=>{
      this.errorMsg=err.error.error;
      this.loadData=false;
      this.errorOccurs=true;
      setTimeout(()=>this.errorOccurs=false,4000);
      console.log(err.error);
    }
    )
  }

  bookEvent(){
    this.loadData=true;
    this.booking.eventId=this.eventId;
    this.booking.bookingDate=new Date();
    this.booking.numberOfSeats=1;
    this.booking.bookingStatus=1;
    this.booking.customerId=this.tokenStorage.getUser().username;
    console.log(this.booking);


    this.bookingService.bookEvent(this.booking).subscribe((res)=>{
      console.log(res);
      this.loadData=false;
      this.errorOccurs=false;
      alert("your Booking has been Done..you can get mail for further info!")
          this.dialogRef.close();
          this.router.navigate(['view-bookings']);
    },
    (err)=>{
      this.errorMsg=err.error.error;
      console.log(err.error);
      this.loadData=false;
      this.errorOccurs=true;

      setTimeout(()=>this.errorOccurs=false,4000);
    }
    );
  }
}
