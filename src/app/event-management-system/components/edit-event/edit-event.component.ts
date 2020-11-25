import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryService } from "src/app/common/service/event-category";
import { LocationService } from "src/app/common/service/location.service";
import { EventModel } from "../../model/event-model";
import { EventService } from "../../service/event.service";
import { map } from "rxjs/operators";
import { EventFileModel } from "../../model/event-file-model";
import { Subscription } from "rxjs";
import { UpdateRequest } from "../../model/update-request";

@Component({
  selector: "app-edit-event",
  templateUrl: "./edit-event.component.html",
  styleUrls: ["./edit-event.component.css"],
})
export class EditEventComponent implements OnInit, OnDestroy {
  @ViewChild("inputImageFile") myInputVariable1: ElementRef;
  @ViewChild("inputThoughtPaperFile") myInputVariable2: ElementRef;

  style_variable = false;
  loadData = false;
  errorOccurs = false;
  errorMsg: string = "";
  updated: boolean = false;
  btnClick: boolean = false;

  imagefileData: File = null;
  thoughtPaperData: File = null;
  files: File[] = [];
  previewUrl: any = null;
  previewDocUrl: any = null;
  locationList: any[] = [];
  categoryList: any[] = [];

  eventForm: FormGroup;
  event: EventModel;
  eventId: number;

  private routeSub: Subscription;

  constructor(
    private locationService: LocationService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDataFromRoute();
  }

  init() {
    this.locationList = this.locationService.getLocations();
    this.categoryList = this.categoryService.getCategories();

    this.eventForm = this.fb.group({
      eventId: [this.event.eventId],
      eventTitle: [this.event.eventTitle, [Validators.required]],
      eventDescription: [this.event.eventDescription, [Validators.required]],
      eventCategory: [this.event.eventCategory, [Validators.required]],
      eventLcation: [this.event.eventLcation, [Validators.required]],
      eventVideoUrl: [this.event.eventVideoUrl, [Validators.required]],
    });

    this.setFileUrl(this.event.eventFiles);
  }

  setFileUrl(files: EventFileModel[]) {
    console.log(files);
    for (let file of files) {
      if (file.fileType.match(/image\/*/) == null) {
        this.previewDocUrl = file.fileUrl;
      } else {
        this.previewUrl = file.fileUrl;
      }
    }
    this.loadData = false;
  }
  getDataFromRoute() {
    this.loadData = true;
    this.routeSub = this.activatedRoute.params.subscribe((params) => {
      console.log(params); //log the entire params object
      this.eventId = params["eventId"]; //log the value of id

      this.eventService.getEventById(this.eventId).subscribe(
        (data) => {
          this.event = data;
          this.init();
        },
        (err) => {
          this.loadData = false;
          this.errorOccurs = false;
          console.log(err);
        }
      );
    });
  }

  showPreview(event: any) {
    this.imagefileData = <File>event.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.imagefileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.imagefileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }

  onChangeFile(event: any) {
    this.thoughtPaperData = <File>event.target.files[0];
    console.log(this.thoughtPaperData);
  }
  previewDoc() {
    // Show preview
    var mimeType = this.thoughtPaperData.type;
    if (mimeType.match(/image\/*/)) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.thoughtPaperData);
    reader.onload = (_event) => {
      this.previewDocUrl = reader.result;
    };
  }

  onSubmit() {
    if (this.eventForm.invalid) {
      return;
    }
    this.loadData = true;

    let request = new UpdateRequest();
    request.eventTitle = this.eventForm.get("eventTitle").value;
    request.eventDescription = this.eventForm.get("eventDescription").value;
    request.eventCategory = this.eventForm.get("eventCategory").value;
    request.eventLcation = this.eventForm.get("eventLcation").value;
    request.eventVideoUrl = this.eventForm.get("eventVideoUrl").value;

    this.eventService.updateEventInfo(this.eventId, request).subscribe(
      (data) => {
        this.btnClick = false;
        this.loadData = false;
        this.errorOccurs = false;
        this.updated = true;
        setTimeout(() => (this.updated = false), 4000);
        this.router.navigateByUrl("/view-event-table");
      },
      (err) => {
        this.btnClick = false;
        this.loadData = false;
        this.errorOccurs = true;
        this.errorMsg=err.error.message;
        setTimeout(() => (this.errorOccurs = false), 5000);
        console.log(err);
      }
    );
    /* const formData=new FormData();
    this.files.push(this.imagefileData);
    this.files.push(this.thoughtPaperData);
    console.log(this.files);

    for(let file of this.files){
      formData.append('files',file);
    }


    formData.append('eventData',JSON.stringify(this.eventForm.value));
    //call update method
    this.eventService.updateEvent(this.eventId,formData).subscribe((data)=>{
      console.log(data);
      this.btnClick=false;
      this.loadData=false;
      this.errorOccurs=false;
      this.updated=true;
      setTimeout(()=>this.updated=false,4000);
      this.router.navigateByUrl('/view-event-table');
      this.resetFormData();
    },
    (err)=>{
      this.btnClick=false;
      this.loadData=false;
      this.errorOccurs=true;
      setTimeout(()=>this.errorOccurs=false,5000);
      console.log(err);
    })*/
  }

  resetFormData() {
    this.eventForm.reset();
    this.myInputVariable1.nativeElement.value = "";
    this.myInputVariable2.nativeElement.value = "";
    this.imagefileData = null;
    this.thoughtPaperData = null;
    this.previewUrl = null;
    this.previewDocUrl = null;
  }

  @HostListener("document:scroll")
  scrollFunction() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.style_variable = true;
    } else {
      this.style_variable = false;
    }
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
