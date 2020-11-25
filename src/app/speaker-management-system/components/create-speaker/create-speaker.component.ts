import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from '../../model/contact';
import { SpeakerModel } from '../../model/speaker-model';
import { SpeakerService } from '../../service/speaker.service';

@Component({
  selector: 'app-create-speaker',
  templateUrl: './create-speaker.component.html',
  styleUrls: ['./create-speaker.component.css']
})
export class CreateSpeakerComponent implements OnInit {

  @ViewChild('inputImageFile') myInputVariable1: ElementRef;

  style_variable=false;

  imagefileData: File = null;

  previewUrl:any = null;

  speaker:SpeakerModel;
  contact:Contact;
  speakerResponse:SpeakerModel;
  submitted=false;

  errorOccurs=false;
  added=false;
  btnClick=false;
  errorMsg:string='';

  constructor(private service:SpeakerService, private router:  Router) {
    this.speaker=new SpeakerModel();
    this.contact=new Contact();
   }

  ngOnInit(): void {
    this.init();
  }

  init(){

  }

  showPreview(event:any){
    this.imagefileData = <File>event.target.files[0];
    console.log(this.imagefileData);
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
      console.log(this.previewUrl);
      this.previewUrl = reader.result;
    }
  }

  addSpeaker()
  {
    this.btnClick=true;
    this.speaker.contact=this.contact;
    const formData=new FormData();
    formData.append("file",this.imagefileData);
    formData.append("speakerInfo",JSON.stringify(this.speaker));


   console.log(this.speaker);
   console.log("Submit form");


    this.service.addSpeaker(formData).subscribe(
      (data)=>
      {
        console.log(data);
        this.speakerResponse=data
        this.btnClick=false;
        this.added=true;
        this.errorOccurs=false;
        setTimeout(() => this.added = false, 6000);
        this.resetFormData();

      },
      (err)=>{
        console.log(err.error.message);
        this.btnClick=false;
        this.errorMsg=err.error.message;
        this.errorOccurs=true;
        setTimeout(() => this.errorOccurs = false, 5000);
      }
      );

     this.submitted=true;
  }

  resetFormData(){
    this.speaker=new SpeakerModel();
    this.contact=new Contact();
    this.myInputVariable1.nativeElement.value = '';
    this.imagefileData=null;
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
