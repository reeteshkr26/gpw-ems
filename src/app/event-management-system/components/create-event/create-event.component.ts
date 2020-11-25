import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { CategoryService } from 'src/app/common/service/event-category';
import { LocationService } from 'src/app/common/service/location.service';
import { EventModel } from '../../model/event-model';
import { EventService } from '../../service/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  @ViewChild('inputImageFile') myInputVariable1: ElementRef;
  @ViewChild('inputThoughtPaperFile') myInputVariable2: ElementRef;
  style_variable=false;

  eventForm:FormGroup;
  imagefileData: File = null;
  thoughtPaperData: File = null;
  files:File[]=[];
  previewUrl:any = null;
  locationList:any[]=[]
  categoryList:any[]=[]

  success:boolean;
  errorMsg:any;
  errorOccurs:boolean;
  btnClick:boolean;
  event:EventModel;

  constructor(private locationService:LocationService, private categoryService:CategoryService,
    private fb:FormBuilder, private eventService:EventService) { }

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.eventForm= this.fb.group({
      eventTitle: ['', [Validators.required]],
      eventDescription: ['', [Validators.required]],
      eventCategory: ['', [Validators.required]],
      eventLcation: ['', [Validators.required]],
      eventVideoUrl: ['', [Validators.required]]
    });
    this.locationList=this.locationService.getLocations();
    this.categoryList=this.categoryService.getCategories();
  }

  showPreview(event:any){
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
    }
  }

  onChangeFile(event:any){
    this.thoughtPaperData = <File>event.target.files[0];
    console.log(this.thoughtPaperData);
  }
  onSubmit(){
    if(this.eventForm.invalid){
      return;
    }
    this.btnClick=true;
    let formData=new FormData();

    console.log(this.eventForm.value);

    this.files.push(this.imagefileData);
    this.files.push(this.thoughtPaperData);
    for(let file of this.files){
      formData.append('files',file);
    }

    formData.append('eventData',JSON.stringify(this.eventForm.value));

    console.log(this.files);
    console.log(formData);

    this.eventService.addEvent(formData).subscribe((data)=>{
      console.log(data);
      this.btnClick=false;
      this.success=true;
      setTimeout(() => this.success = false, 6000);
      this.resetFormData();
    },
    (err)=>{
      this.btnClick=false;
      this.errorMsg=err.error.message;
      this.errorOccurs=true;
      setTimeout(() => this.errorOccurs = false, 5000);
      console.log(err.error.message);
    }
    );
    console.log("Submit form");
  }

  resetFormData(){
    this.eventForm.reset();
    this.myInputVariable1.nativeElement.value = '';
    this.myInputVariable2.nativeElement.value = '';
    this.imagefileData=null;
    this.thoughtPaperData=null;
    this.previewUrl=null;
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
