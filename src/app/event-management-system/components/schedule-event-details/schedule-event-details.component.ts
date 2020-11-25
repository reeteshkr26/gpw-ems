import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookingComponent } from 'src/app/booking-management-system/components/booking/booking.component';
import { ScheduleModel } from 'src/app/schedule-management-system/model/schedule-model';
import { ScheduleService } from 'src/app/schedule-management-system/service/schedule.service';
import { EventFileModel } from '../../model/event-file-model';
import { EventModel } from '../../model/event-model';
import { EventService } from '../../service/event.service';

@Component({
  selector: 'app-schedule-event-details',
  templateUrl: './schedule-event-details.component.html',
  styleUrls: ['./schedule-event-details.component.css']
})
export class ScheduleEventDetailsComponent implements OnInit, OnDestroy {
  style_variable=false;
  event:EventModel;
  scheduleEvent:ScheduleModel;
  eventImageInfo:EventFileModel[]=[];
  eventThoughtPaperInfo:EventFileModel[]=[];
  eventId:number;
  scheduleCode:number;
  private routeSub: Subscription;
  loadData=false;
  errorOccurs=false;
  schedule:boolean=false;

  constructor(private dialog:MatDialog,private activatedRoute:ActivatedRoute,private eventService:EventService, private scheduleService:ScheduleService ) { }

  ngOnInit(): void {
    this.loadData=true;
    this.getDataFromRoute();

  }

  getDataFromRoute(){
   this.routeSub = this.activatedRoute.params.subscribe(params => {
      console.log(params) //log the entire params object
      this.eventId=params['eventId'] //log the value of id
      this.scheduleCode=params['scheduleCode'] //log the value of id

      if(this.scheduleCode==0){
        this.getEventbyId();
      }
      if(this.scheduleCode==1){
        this.getScheduleDetails();
      }

    });

  }
  getEventbyId(){
    this.eventService.getEventById(this.eventId).subscribe((data)=>{
      console.log(data);
      this.event=data;
      this.getFileInfo();
      this.loadData=false;
      this.schedule=false;
    },
    (err=>{
      this.loadData=false;
      this.errorOccurs=true;
      console.log(err);
    })
    );
  }
  getScheduleDetails(){
    this.scheduleService.getScheduleDetailsByEventId(this.eventId).subscribe((data)=>{
      console.log(data);
      this.scheduleEvent=data;
      this.event=this.scheduleEvent.event;
      this.getFileInfo();
      this.loadData=false;
      this.schedule=true;
    },
    ((err)=>{
      this.loadData=false;
      this.errorOccurs=true;
      console.log(err);
    })
    );
  }
  getFileInfo(){
    for(let file of this.event.eventFiles){
      if(file.fileType.match(/image\/*/)){
        this.eventImageInfo.push(file);
      }
      else{
        this.eventThoughtPaperInfo.push(file);
      }
    }
  }
  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

  openBookingPopup(){

    let dialogRef= this.dialog.open(BookingComponent,{data:{eventId:this.eventId}});
    dialogRef.disableClose=true;


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
