import { HostListener } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocationService } from 'src/app/common/service/location.service';
import { EventModel } from 'src/app/event-management-system/model/event-model';
import { EventService } from 'src/app/event-management-system/service/event.service';
import { SpeakerModel } from 'src/app/speaker-management-system/model/speaker-model';
import { SpeakerService } from 'src/app/speaker-management-system/service/speaker.service';
import { ScheduleModel } from '../../model/schedule-model';
import { ScheduleService } from '../../service/schedule.service';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css']
})
export class EditScheduleComponent implements OnInit , OnDestroy{

  style_variable = false;
  loadData = false;
  errorOccurs = false;
  errorMsg:string='';
  updated:boolean=false;
  btnClick:boolean=false;

  locationList:string[]=[];
  eventList:EventModel[]=[];
  speakerList:SpeakerModel[]=[];

  scheduleId:number;
  schedule:ScheduleModel;
  scheduleForm:FormGroup

  private routeSub:Subscription;

  constructor(
    private fb:FormBuilder,
    private service: ScheduleService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private locationService:LocationService,
    private eventService:EventService,
    private speakerService:SpeakerService
  ) { }

  ngOnInit(): void {
    this.getDataFromRoute();
  }

  init(){
    this.locationList=this.locationService.getLocations();
    this.scheduleForm= this.fb.group({
      scheduleId:[this.schedule.scheduleId],
      scheduleTitle: [this.schedule.scheduleTitle, [Validators.required]],
      eventId: [this.schedule.eventId, [Validators.required]],
      speakerId: [this.schedule.speakerId, [Validators.required]],
      startDateAndTime: [this.schedule.startDateAndTime, [Validators.required]],
      endDateAndTime: [this.schedule.endDateAndTime, [Validators.required]],
      location: [this.schedule.location, [Validators.required]],
      totalSeats:[this.schedule.totalSeats,[Validators.required]]
    });
  }
    getDataFromRoute(){
      this.loadData=true;
      this.routeSub = this.activatedRoute.params.subscribe((params) => {
        console.log(params); //log the entire params object
        this.scheduleId = params["scheduleId"]; //log the value of id

        this.service.getScheduleById(this.scheduleId).subscribe((data)=>{
          this.schedule=data;
          this.loadEventAndSpeakerData();
          this.init();
        },
        (err)=>{
          this.loadData = false;
          this.errorOccurs=true;
          console.log(err);
        }
        )
      });
    }

    loadEventAndSpeakerData(){
      this.speakerService.viewAllSpeakers().subscribe((data)=>{
        console.log(data);
        this.speakerList=data;
        this.loadData=false;
      },(error)=>{
        this.loadData=false;
        this.errorMsg=error.error.message;
        this.errorOccurs=true;
        setTimeout(() => this.errorOccurs = false, 5000);
        console.log(error);
      });

      /*this.eventService.getEventsbyStatusCode(0).subscribe((data)=>{
        console.log(data);
        this.eventList=data;
      },
      (error)=>{
        this.errorMsg=error.error.message;
        this.errorOccurs=true;
        setTimeout(() => this.errorOccurs = false, 5000);
        console.log(error);
      }
      );*/

    }

    onSubmit(){
      if(this.scheduleForm.invalid)
      {
        return;
      }
      let request=new ScheduleModel();
      request.scheduleId=this.scheduleId;
      request.eventId=this.scheduleForm.get('eventId').value;
      request.speakerId=this.scheduleForm.get('speakerId').value;
      request.scheduleTitle=this.scheduleForm.get('scheduleTitle').value;
      request.location=this.scheduleForm.get('location').value;
      request.startDateAndTime=this.scheduleForm.get('startDateAndTime').value;
      request.endDateAndTime=this.scheduleForm.get('endDateAndTime').value;
      request.totalSeats=this.scheduleForm.get('totalSeats').value;
      request.availableSeats=this.scheduleForm.get('totalSeats').value;

      this.service.updateSchedule(this.scheduleId,request).subscribe((data)=>{
        console.log(data);
      this.btnClick=false;
      this.loadData=false;
      this.errorOccurs=false;
      this.updated=true;
      setTimeout(()=>this.updated=false,4000);
      this.resetFormData();
      this.router.navigateByUrl('/view-schedules');

      },(err)=>{
        this.btnClick=false;
        this.loadData=false;
        this.errorOccurs=true;
        setTimeout(()=>this.errorOccurs=false,5000);
        console.log(err);
      })
    }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
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
