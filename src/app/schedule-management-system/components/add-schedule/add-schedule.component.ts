import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/common/service/location.service';
import { EventModel } from 'src/app/event-management-system/model/event-model';
import { EventService } from 'src/app/event-management-system/service/event.service';
import { SpeakerModel } from 'src/app/speaker-management-system/model/speaker-model';
import { SpeakerService } from 'src/app/speaker-management-system/service/speaker.service';
import { ScheduleModel } from '../../model/schedule-model';
import { ScheduleService } from '../../service/schedule.service';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {
  style_variable=false;

  success:boolean;
  errorMsg:any;
  errorOccurs:boolean;
  btnClick:boolean;

  eventList:EventModel[]=[];
  speakerList:SpeakerModel[]=[];
  locationList:string[]=[];
  scheduleForm:FormGroup;
  constructor(
    private fb:FormBuilder,
    private eventService:EventService,
     private speakerService:SpeakerService,
     private locationService:LocationService,
     private scheduleService:ScheduleService
     ) { }

  ngOnInit(): void {
    this.loadEventAndSpeakerData();
    this.init();
  }

  init(){
    this.locationList=this.locationService.getLocations();
    this.scheduleForm= this.fb.group({
      scheduleTitle: ['', [Validators.required]],
      eventId: ['', [Validators.required]],
      speakerId: ['', [Validators.required]],
      startDateAndTime: ['', [Validators.required]],
      endDateAndTime: ['', [Validators.required]],
      location: ['', [Validators.required]],
      totalSeats:['',[Validators.required]]
    });

  }
  loadEventAndSpeakerData(){
    this.speakerService.viewAllSpeakers().subscribe((data)=>{
      console.log(data);
      this.speakerList=data;
    },(error)=>{
      this.errorMsg=error.error.message;
      this.errorOccurs=true;
      setTimeout(() => this.errorOccurs = false, 5000);
      console.log(error);
    });

    this.eventService.getEventsbyStatusCode(0).subscribe((data)=>{
      console.log(data);
      this.eventList=data;
    },
    (error)=>{
      this.errorMsg=error.error.message;
      this.errorOccurs=true;
      setTimeout(() => this.errorOccurs = false, 5000);
      console.log(error);
    }
    );
  }

  onSubmit(){

    if(this.scheduleForm.invalid){
      return;
    }
    this.btnClick=true;
    console.log(this.scheduleForm.value);

    let schedule=new ScheduleModel();
    schedule.eventId=this.scheduleForm.get('eventId').value;
    schedule.speakerId=this.scheduleForm.get('speakerId').value;
    schedule.scheduleTitle=this.scheduleForm.get('scheduleTitle').value;
    schedule.location=this.scheduleForm.get('location').value;
    schedule.startDateAndTime=this.scheduleForm.get('startDateAndTime').value;
    schedule.endDateAndTime=this.scheduleForm.get('endDateAndTime').value;
    schedule.totalSeats=this.scheduleForm.get('totalSeats').value;
    schedule.availableSeats=this.scheduleForm.get('totalSeats').value;

    this.scheduleService.addSchedule(schedule).subscribe((data)=>{
      this.btnClick=false;
      this.success=true;
      setTimeout(() => this.success = false, 6000);
      console.log(data);
      this.resetFormData();
      this.loadEventAndSpeakerData();
    },
    (err)=>{
      this.btnClick=false;
      this.errorMsg=err.error.message;
      this.errorOccurs=true;
      setTimeout(() => this.errorOccurs = false, 5000);
      console.log(err.error.message);
    })
    console.log(schedule);
  }

  resetFormData(){
    this.scheduleForm.reset();
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
