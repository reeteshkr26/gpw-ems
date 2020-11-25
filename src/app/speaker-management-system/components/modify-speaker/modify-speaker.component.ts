import { HostListener, OnDestroy } from "@angular/core";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Contact } from "../../model/contact";
import { SpeakerModel } from "../../model/speaker-model";
import { SpeakerService } from "../../service/speaker.service";

@Component({
  selector: "app-modify-speaker",
  templateUrl: "./modify-speaker.component.html",
  styleUrls: ["./modify-speaker.component.css"],
})
export class ModifySpeakerComponent implements OnInit, OnDestroy {
  @ViewChild("inputImageFile") myInputVariable1: ElementRef;

  style_variable = false;
  loadData = false;
  errorOccurs = false;
  errorMsg: string = "";
  updated: boolean = false;
  btnClick: boolean = false;

  imagefileData: File = null;
  previewUrl: any = null;

  speaker: SpeakerModel;
  speakerResponse: SpeakerModel;
  contact: Contact;

  private routeSub: Subscription;
  speakerId: number;

  constructor(
    private service: SpeakerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.speaker = new SpeakerModel();
    this.contact = new Contact();
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.loadData = true;
    this.routeSub = this.activatedRoute.params.subscribe((params) => {
      console.log(params); //log the entire params object
      this.speakerId = params["speakerId"]; //log the value of id
      this.service.viewSpeakerById(this.speakerId).subscribe(
        (data) => {
          console.log(data);
          this.speaker = data;
          this.contact = this.speaker.contact;
          this.previewUrl = this.speaker.speakerImage.imageUrl;
          this.loadData = false;
        },
        (err) => {
          this.loadData = false;
          this.errorOccurs = true;
          console.log(err);
        }
      );
    });
  }

  showPreview(event: any) {
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
    };
  }

  modifySpeaker() {
    this.btnClick = true;
    this.loadData = true;
    this.speaker.contact = this.contact;
    const formData = new FormData();

    formData.append("file", this.imagefileData);
    formData.append("speakerInfo", JSON.stringify(this.speaker));

    console.log(this.speaker);
    console.log("Submit form");

    this.service.updateContactDetails(this.speakerId, this.contact).subscribe(
      (data) => {
        this.btnClick = false;
        this.loadData = false;
        this.errorOccurs = false;
        this.updated = true;
        setTimeout(() => (this.updated = false), 4000);
        console.log("Update Successful !");
        this.router.navigate(["/view-speakers"]);
      },
      (error) => {
        this.btnClick = false;
        this.loadData = false;
        this.errorOccurs = true;
        setTimeout(() => (this.errorOccurs = false), 5000);
        console.log(error.error.message);
      }
    );

    /*this.service.modifySpeaker(this.speakerId,formData).subscribe((data)=>
      {
        console.log(data);
        this.speakerResponse=data
        this.btnClick=false;
        this.loadData=false;
        this.errorOccurs=false;
        this.updated=true;
        setTimeout(()=>this.updated=false,4000);
        console.log("Update Successful !");
        this.router.navigate(['/viewAll']);
      },
      (error)=>{
        this.btnClick=false;
        this.loadData=false;
        this.errorOccurs=true;
        setTimeout(()=>this.errorOccurs=false,5000);
        console.log(error.error.message);
      });*/
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
