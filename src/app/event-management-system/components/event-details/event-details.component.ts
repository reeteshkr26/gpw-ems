import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventFileModel } from '../../model/event-file-model';
import { EventModel } from '../../model/event-model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  @Input() eventItem:EventModel;
  eventImageInfo:EventFileModel[]=[];
  eventThoughtPaperInfo:EventFileModel[]=[];

  constructor(private router:Router) { }

  ngOnInit(): void {

    this.getFileInfo();
  }

  getFileInfo(){
    for(let file of this.eventItem.eventFiles){
      if(file.fileType.match(/image\/*/)){
        this.eventImageInfo.push(file);
      }
      else{
        this.eventThoughtPaperInfo.push(file);
      }
    }
  }
  goToEventDetailsPage(){
    this.router.navigateByUrl(`/view-events/${this.eventItem.eventId}/${this.eventItem.scheduleStatusCode}`,{state:this.eventItem});
  }
}
