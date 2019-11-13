import { Injectable, EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {map} from 'rxjs/operators';
import {HttpClient,HttpClientModule,HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

sCourse =new EventEmitter<any>();

  constructor(private http:HttpClient) { }

getCourses(){
 // const course=this.http.get("http://localhost:3000/course/display");
  return this.http.get(environment.url + '/catergory/display');




}
getFullCourse(){
 return this.http.get(environment.url + '/course/display');

}
getCourseVideos(catergory){
  return this.http.get(environment.url + '/subCatergory/display/'+catergory);



}

getCourseVideossub(catergory,subCatergory){
  return this.http.get(environment.url + '/subCatergory/display/'+catergory+'/'+subCatergory);

}

courseVideoUpdate = new EventEmitter<string>( );
courseDetail = new EventEmitter<string>();

//display a full course
displaycourse(id: string){
  return this.http.get(environment.url + '/course/display/'+id);
}

// user register for a course

registerUserToCourse(course, id: string){
  const httpOption ={
    headers: new HttpHeaders({
      'Content-type':'application/json',
      'Authorization' : localStorage.getItem('id_token')
  })
  };

  return this.http.post(environment.url + '/course/registerCourse/' + id, course,httpOption).pipe(map((res: any) => res));


}

getNullPermissionCourse(){
  return this.http.get(environment.url + '/course/display/permissionNullCourse');
}

givePermission(permission, id: string){
  return this.http.put(environment.url + '/course/givePermissionOrNot/' + id, permission).pipe(map((res: any) => res));
}


// giveRate(id: string, rate){
//   return this.http.put('http://localhost:3000/course/rating/' + id, rate).pipe(map((res: any) => res));
// }
getTopRate(){

  return this.http.get(environment.url + '/course/highRated' );

}
 rating = new EventEmitter<string>();


 Addcourse(course){

  return this.http.post(environment.url + '/course/put', course).pipe(map((res:any)=>res));

  }
 courseImgUpload(selectedFile:File, id: string){
  const fd = new FormData();
  fd.append('image', selectedFile, selectedFile.name);
  return this.http.post(environment.url + '/course/uploadCourseImage/'+ id, fd).pipe(map((res:any)=>res));
 }

 getSubcourses(catergory){

   return this.http.get(environment.url + '/subCatergory/display/' + catergory);

}
searchCourse(value){
  return this.http.get(environment.url + '/course/search/' + value);
}

rateCourse(rate){
  console.log(rate)
  return this.http.post(environment.url + '/course/rating' , rate).pipe(map((res:any)=>res));;
}
 updateCourse(course,id:string){
  return this.http.put(environment.url + '/course/update/'+ id , course).pipe(map((res:any)=>res));;
 }

 removeCourse(id){
  const httpOption ={
    headers: new HttpHeaders({
      'Content-type':'application/json',
      'Authorization' : localStorage.getItem('id_token')
  })
  };
  return this.http.delete(environment.url + '/course/delete/' + id, httpOption ).pipe(map((res:any)=>res));;
 }

 uploadFile(selectedFile:File){
  const fd = new FormData();
  fd.append('file', selectedFile, selectedFile.name);
  return this.http.post(environment.url + '/course/put/file',  fd).pipe(map((res:any)=>res));
 }
// course image
// uploadCourseImg(selectedFile: File){
//   const fd = new FormData();
//   fd.append('image', selectedFile, selectedFile.name);
//   this.http.post('http://localhost:3000/course/put/',fd)
//     .subscribe(res => {
//       console.log(res);
//     });
// }


   courseUpdate = new EventEmitter<string>( )


}


