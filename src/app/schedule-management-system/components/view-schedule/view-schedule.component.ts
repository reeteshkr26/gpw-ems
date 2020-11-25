import { HostListener } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ScheduleModel } from "../../model/schedule-model";
import { ScheduleService } from "../../service/schedule.service";

@Component({
  selector: "app-view-schedule",
  templateUrl: "./view-schedule.component.html",
  styleUrls: ["./view-schedule.component.css"],
})
export class ViewScheduleComponent implements OnInit {
  scheduleList: ScheduleModel[] = [];
  p:number=1;
  searchText: string = "";

  loadData: boolean;
  success: boolean;
  deletionErr: boolean = false;
  deletionSuccess: boolean = false;
  deleteBtnClick: boolean = false;
  deletionStart: boolean = false;

  style_variable = false;

  constructor(
    private scheduleService: ScheduleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData = true;
    this.loadScheduleList();
  }

  loadScheduleList() {
    this.scheduleService.getAllSchedules().subscribe(
      (data) => {
        console.log(data);
        this.scheduleList = data;
        this.loadData = false;
      },
      (err) => {
        console.log(err);
        this.loadData = false;
      }
    );
  }

  deleteSchedule(schedule: ScheduleModel) {
    this.deleteBtnClick = true;
    this.deletionStart = true;
    if (confirm("Are you sure want to delete?")) {
      this.scheduleService.deleteSchedule(schedule.scheduleId).subscribe(
        (data) => {
          this.deleteBtnClick = false;
          this.deletionStart = false;
          this.success = true;
          this.loadScheduleList();
          setTimeout(() => (this.success = false), 4000);
          this.deletionErr = false;
        },
        (err) => {
          console.log(err.message);
          this.deleteBtnClick = false;
          this.deletionStart = false;
          this.deletionErr = true;
          setTimeout(() => (this.deletionErr = false), 4000);
        }
      );
    } else {
      this.deleteBtnClick = false;
      this.deletionStart = false;
    }
  }

  goToModifyPage(schedule: ScheduleModel) {
    this.router.navigateByUrl(`/edit-schedule/${schedule.scheduleId}`, {
      state: schedule,
    });
  }

  search(schedule: ScheduleModel) {
    return (
      schedule.scheduleTitle
        .toLocaleLowerCase()
        .indexOf(this.searchText.toLocaleLowerCase()) != -1
    );
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
