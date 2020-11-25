import { Contact } from './contact';
import { SpeakerImageModel } from './speaker-image-model';

export class SpeakerModel {

  public speakerId:number;
  public speakerName:string;
  public contact:Contact;
  public speakerImage:SpeakerImageModel;
  public designation:string;

  constructor(){}
}
