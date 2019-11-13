import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatergoryService {

  constructor(private http: HttpClient) { }


  getCatergory(){
    return this.http.get(environment.url + '/catergory/display');
  }

  addCatergory(catergory){
    return this.http.post(environment.url + '/catergory/addCatergory',catergory).pipe(map((res:any)=>res));
  }

  deleteCatergory(catergory){
    return this.http.delete(environment.url + '/catergory/delete/'+ catergory);
   }

   updateCatergory(catergory,id: string){
    return this.http.put(environment.url + '/catergory/updateCatergory/' + id, catergory).pipe(map((res:any)=>res));
   }
}
