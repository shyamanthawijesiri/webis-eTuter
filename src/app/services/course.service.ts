import { Injectable, EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {map} from 'rxjs/operators';
import {HttpClient,HttpClientModule,HttpHeaders, HttpErrorResponse} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CourseService {


  constructor(private http:HttpClient) { }

getCourses(){
 // const course=this.http.get("http://localhost:3000/course/display");
  const course=this.http.get("http://localhost:3000/catergory/display");

  console.log(course);
  console.log("MMMMMMMMMMMMMMM")
  return course;

}
getFullCourse(){
 return this.http.get('http://localhost:3000/course/display');

}
getCourseVideos(catergory){
  const course=this.http.get("http://localhost:3000/subCatergory/display/"+catergory);
 // const course=this.http.get("http://localhost:3000/subCatergory/display"+catergory);

   console.log(course);
   console.log("MMMMMMMMMMMMMMM")
   return course;
}

getCourseVideossub(catergory,subCatergory){
  const course=this.http.get("http://localhost:3000/subCatergory/display/"+catergory+"/"+subCatergory);

   return course;
}

courseVideoUpdate = new EventEmitter<string>( );
courseDetail = new EventEmitter<string>();

//display a full course
displaycourse(id: string){
  const course = this.http.get("http://localhost:3000/course/display/"+id);
  return course;

}
//user register for a course


registerUserToCourse(course, id: string){
  const httpOption ={
    headers: new HttpHeaders({
      'Content-type':'application/json',
      'Authorization' : localStorage.getItem('id_token')
  })
  };
  //let headers = new HttpHeaders();


   //headers.append('Authorization',localStorage.getItem('id_token'));
  return this.http.post('http://localhost:3000/course/registerCourse/' + id, course, httpOption).pipe(map((res: any) => res));


}

getDenyPermissionCourse(){
  return this.http.get('http://localhost:3000/course/display/permissionDenyCourse');
}

givePermission(permission, id: string){
  return this.http.put('http://localhost:3000/course/givePermissionOrNot/' + id, permission).pipe(map((res: any) => res));
}


giveRate(id: string, rate){
  return this.http.put('http://localhost:3000/course/rating/' + id, rate).pipe(map((res: any) => res));
}
 rating = new EventEmitter<string>();


 Addcourse(course){
  return this.http.post('http://localhost:3000/course/put', course).pipe(map((res: any) => res))
 }

 getSubcourses(catergory){

   return this.http.get('http://localhost:3000/subCatergory/display/' + catergory);

}

   courseUpdate = new EventEmitter<string>( )


}


