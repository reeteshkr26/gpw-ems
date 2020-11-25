import { EventFileModel } from './event-file-model';

export class EventModel {

  public eventId:number;
  public eventTitle:string;
  public eventDescription:string;
  public eventCategory:string;
  public eventLcation:string;
  public eventFiles:EventFileModel[];
  public eventVideoUrl:string;
  public scheduleStatusCode:number;

  constructor(){ }
}
