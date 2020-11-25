import { EventModel } from 'src/app/event-management-system/model/event-model';
import { SpeakerModel } from 'src/app/speaker-management-system/model/speaker-model';

export class ScheduleModel {
  public scheduleId:number;
  public eventId:number;
  public speakerId:number;

	public scheduleTitle:string;
  public startDateAndTime:Date;
  public endDateAndTime:Date;
  public location:string;
  public totalSeats:number;
	public availableSeats:number;
	public event:EventModel;
  public speaker:SpeakerModel;

  constructor(){}

}
