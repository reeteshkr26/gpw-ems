
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  locationList:any[]=["New Delhi","Greater Noida","Mumbai","Hyderabad","Chennai","Banglore","Pune"];
  constructor() { }

  getLocations(){
    return this.locationList;
  }
}
