import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { EventEmitter } from 'events';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubcatergoryService {

  constructor(private http:HttpClient) { }

  getSubcatergory(){
    return this.http.get(environment.url + '/subCatergory/display');

  }

  addSubcatergory(subCatergory){
    return this.http.post(environment.url + '/subCatergory/addSubCatergory',subCatergory).pipe(map((res:any)=>res));
  }


 deleteSubcatergory(subCatergory){
  return this.http.delete(environment.url + '/subCatergory/delete/'+subCatergory);
 }
 updateSubCatergory(subCatergory,id: string){
  return this.http.put(environment.url + '/subCatergory/updateSubCatergory/' + id, subCatergory).pipe(map((res:any)=>res));
 }

}
