import { ChangeDetectionStrategy, HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/common/service/event-category';
import { LocationService } from 'src/app/common/service/location.service';
import { EventModel } from '../../model/event-model';
import { EventService } from '../../service/event.service';

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ViewEventsComponent implements OnInit {
  style_variable=false;
  loadData=false;
  eventsFound=false;
  eventsNotFound=false;
  searchByTitle=false;
  searchByLocation=false;
  searchByCategory=false;
  searchButtonClick=false;

  title:string='';
  category:string='';
  location:string='';

  eventList:EventModel[]=[];
  eventViewList:EventModel[]=[];
  locationList:any[]=[];
  categoryList:any[]=[];
  searchByList:any[]=[
    {"id":1,"text":"Search By Category"},
    {"id":2,"text":"Search By Location"},
    {"id":3,"text":"Search By Title"},
    {"id":4,"text":"View All"}
];
slectedSearchType:number;
  constructor(private eventService:EventService,private locationService:LocationService, private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.loadData=true;
    this.init();
  }

  init(){
    this.locationList=this.locationService.getLocations();
    this.categoryList=this.categoryService.getCategories();
    this.getAllEvents();
  }
  getAllEvents(){
  this.eventService.getAllEvents().subscribe((data)=>{
      console.log(data);
      this.eventList=data;
      this.eventViewList=this.eventList;
      this.loadData=false;
    },
    (err)=>{
      this.loadData=false;
      console.log(err.error.message);
    }
    );
  }
  searchByName(){
    this.searchButtonClick=true;
    console.log(this.title);
    this.eventViewList=this.eventList.filter(event=>event.eventTitle.toLocaleLowerCase()===this.title.toLocaleLowerCase());
    console.log(this.eventViewList);
    if(this.eventViewList.length>0){
      this.searchButtonClick=false;
      this.eventsFound=true;
      console.log(this.eventViewList);
    }
    else{
      this.eventsFound=false;
      this.eventsNotFound=true;
      setTimeout(()=>this.eventsNotFound=false,3000);
      this.searchButtonClick=false;
      this.eventViewList=this.eventList;
    }

  }
  searchByCategoryMethod(){
    console.log(this.category);
    this.searchButtonClick=true;
    this.eventViewList=this.eventList.filter(event=>
      event.eventCategory==this.category
    );
    console.log(this.eventViewList);
    if(this.eventViewList.length>0){
      this.searchButtonClick=false;
      this.eventsFound=true;
      console.log(this.eventViewList);
    }
    else{
      this.eventsFound=false;
      this.eventsNotFound=true;
      setTimeout(()=>this.eventsNotFound=false,3000);
      this.searchButtonClick=false;
      this.eventViewList=this.eventList;
    }

  }
  searchByLocationMethod(){
    console.log(this.location);
    this.searchButtonClick=true;
    this.eventViewList=this.eventList.filter(event=>
      event.eventLcation==this.location
    );
    console.log(this.eventViewList);
    if(this.eventViewList.length>0){
      this.searchButtonClick=false;
      this.eventsFound=true;
      console.log(this.eventViewList);
    }
    else{
      this.eventsFound=false;
      this.eventsNotFound=true;
      setTimeout(()=>this.eventsNotFound=false,3000);
      this.searchButtonClick=false;
      this.eventViewList=this.eventList;
    }

  }
  selectChangeHandler(event:any){

    this.slectedSearchType= event.target.value;
    console.log(this.slectedSearchType);
    if(this.slectedSearchType==1){
      this.searchByCategory=true;
      this.searchByLocation=false;
      this.searchByTitle=false;
    }
    if(this.slectedSearchType==2){
      this.searchByLocation=true;
      this.searchByCategory=false;
      this.searchByTitle=false;
    }
    if(this.slectedSearchType==3){
      this.searchByTitle=true;
      this.searchByLocation=false;
      this.searchByCategory=false;
    }
    if(this.slectedSearchType==4){
      this.searchByTitle=false;
      this.searchByLocation=false;
      this.searchByCategory=false;
      this.eventViewList=this.eventList;
    }
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
