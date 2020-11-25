import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EventFileModel } from "../../model/event-file-model";
import { EventModel } from "../../model/event-model";
import { EventService } from "../../service/event.service";

@Component({
  selector: "app-view-event-table",
  templateUrl: "./view-event-table.component.html",
  styleUrls: ["./view-event-table.component.css"],
})
export class ViewEventTableComponent implements OnInit {
  eventList: EventModel[] = [];
  searchText: string = "";
  p:number=1;
  loadData: boolean;
  success: boolean;
  deletionErr: boolean = false;

  style_variable = false;

  imageFie: EventFileModel[] = [];
  thoughtPaperFile: EventFileModel[] = [];

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.loadData = true;
    this.getEvents();
  }

  getEvents() {
    this.eventService.getAllEvents().subscribe(
      (data) => {
        console.log(this.eventList);
        this.eventList = data;
        this.getFiles();
        this.loadData = false;
      },
      (err) => {
        this.loadData = false;
        console.log(err.error.message);
      }
    );

  }

  getFiles() {
    for (let event of this.eventList) {
      for (let file of event.eventFiles) {
        if (file.fileType.match(/image\/*/)) {
          this.imageFie.push(file);
        } else {
          this.thoughtPaperFile.push(file);
        }
      }
    }
  }

  onSearch(event: EventModel) {
    return (
      event.eventTitle
        .toLocaleLowerCase()
        .indexOf(this.searchText.toLocaleLowerCase()) != -1
    );
  }
  deleteEvent(event: EventModel) {
    if (confirm("Are you sure want to delete?")) {
      this.loadData=true;
      this.eventService.deleteEvent(event.eventId).subscribe(
        (data) => {
          const deletedContrat = this.eventList.find(
            (x) => x.eventId === event.eventId
          );
          this.eventList.splice(this.eventList.indexOf(deletedContrat), 1);
          this.loadData=false;
          this.success = true;
          // this.getEvents();
          setTimeout(() => (this.success = false), 4000);
          this.deletionErr = false;
        },
        (err) => {
          console.log(err.message);
          this.loadData=false;
          this.deletionErr = true;
          setTimeout(() => (this.deletionErr = false), 4000);
        }
      );
    }else{
      this.loadData=false;
    }
  }

  editEvent(event: EventModel) {
    this.router.navigateByUrl(`/edit-event/${event.eventId}`, { state: event });
  }

  @HostListener("document:scroll")
  scrollFunction() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.style_variable = true;
    } else {
      this.style_variable = false;
    }
  }
}
