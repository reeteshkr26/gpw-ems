
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryList:any[]=["Technical","Bussiness","Travel","Science & Technology","Meetup","Get Together"];
  constructor() { }

  getCategories(){
    return this.categoryList;
  }
}
