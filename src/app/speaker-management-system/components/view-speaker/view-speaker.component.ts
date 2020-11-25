import { HostListener, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpeakerModel } from '../../model/speaker-model';
import { SpeakerService } from '../../service/speaker.service';

@Component({
  selector: 'app-view-speaker',
  templateUrl: './view-speaker.component.html',
  styleUrls: ['./view-speaker.component.css']
})
export class ViewSpeakerComponent implements OnInit {
  speakerList:SpeakerModel[]=[];
  searchText:string='';
  p:number=1;

  loadData:boolean;
  success:boolean;
  deletionErr:boolean=false;
  deletionSuccess:boolean=false;
  deleteBtnClick:boolean=false;
  deletionStart:boolean=false;

  style_variable=false;
  constructor(private speakerService:SpeakerService, private router:Router) { }

  ngOnInit(): void {
    this.loadData=true;
    this.getAllSpeakers();
  }

  getAllSpeakers(){
    this.speakerService.viewAllSpeakers().subscribe((data)=>{
      console.log(data);
      this.speakerList=data;
      this.loadData=false;
    },
    (err)=>{
      console.log(err);
      this.loadData=false;
    }
    );
  }

  deleteSpeaker(speaker:SpeakerModel){
    this.deleteBtnClick=true;
    this.deletionStart=true;
    if(confirm("Are you sure want to delete?")){
      this.speakerService.deleteSpeaker(speaker.speakerId).subscribe(
        (data)=>{
          const deletedContrat = this.speakerList.find(x => x.speakerId === speaker.speakerId);
          this.speakerList.splice(this.speakerList.indexOf(deletedContrat), 1);

          this.deleteBtnClick=false;
          this.deletionStart=false;
          this.success=true;
         // this.getAllSpeakers();
           setTimeout(()=>this.success=false,4000);
           this.deletionErr=false;
        },
        (err)=>{
          console.log(err.message);
          this.deleteBtnClick=false;
          this.deletionStart=false;
          this.deletionErr=true;
          setTimeout(()=>this.deletionErr=false,4000);
        }
      );
    }
    else{
      this.deleteBtnClick=false;
      this.deletionStart=false;
    }

  }

  goToModifyPage(speaker:SpeakerModel){
    this.router.navigateByUrl(`/modify-speaker/${speaker.speakerId}`,{state:speaker});
  }

  search(speaker:SpeakerModel)
  {
    return (speaker.speakerName.toLocaleLowerCase().indexOf(this.searchText.toLocaleLowerCase())) != -1;
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
