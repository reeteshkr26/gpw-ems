import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ScheduleModel } from 'src/app/schedule-management-system/model/schedule-model';
import { ScheduleService } from 'src/app/schedule-management-system/service/schedule.service';
import { TokenStorageService } from 'src/app/user-management-system/service/token-storage.service';
import { Booking } from '../../model/booking';
import { BookingService } from '../../service/booking.service';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {

  bookingList:Booking[]=[];
  result:boolean;
  loadData:boolean;
  style_variable=false;
  event:ScheduleModel;

  errorMsg: any
  response:any;
  customerId:string;
  constructor(private bookingService:BookingService, private storageService:TokenStorageService, private scheduleService:ScheduleService) { }

  ngOnInit(): void {
    this.loadData=true;
    this.result=false;
    this.loadBookings();
  }

  loadBookings(){
    this.customerId=this.storageService.getUser().username;
    console.log(this.customerId);

    this.bookingService.getBookingByCustomerId(this.customerId).subscribe((data)=>{
      console.log(data);
      this.bookingList=data;
      this.loadData=false;
    },
    (error)=>{
      this.errorMsg = error.error;
      console.log(error);
      this.loadData=false;
    }
    )
  }


  cancelBooking(bookingId:number){
    this.bookingService.updateBookingStatus(bookingId).subscribe((data)=>{
      this.response=data;
      this.result=this.response;
       this.loadBookings();
    },
    (error)=>{
      this.errorMsg = error.error;
      console.log(error.error);
      this.loadBookings();
    }
    );
  }
  @HostListener("document:scroll")
  scrollFunction(){
    if(document.body.scrollTop>0 || document.documentElement.scrollTop>0){
      this.style_variable=true;
    }
    else{
      this.style_variable=false;
    }
  }

}
