import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-recent-added-course',
  templateUrl: './recent-added-course.component.html',
  styleUrls: ['./recent-added-course.component.scss']
})
export class RecentAddedCourseComponent implements OnInit {

   denyCourse: any;
   objectKeys = Object.keys;
   size: number;

   @Output() passSize = new EventEmitter<number>();
  constructor(private courseService: CourseService,
              public toastr: ToastrManager) { }

  ngOnInit() {
    this.courseService.getNullPermissionCourse().subscribe(res =>{
      this.denyCourse = res;
      console.log(res);
       //get object size
      this.size = this.objectKeys(res).length;
      //send size to parent
      this.passSize.emit(this.size);
    });
  }


  giveAcceptPermission(id: string){
    const permission = {
      value: true
    }
    this.courseService.givePermission(permission, id).subscribe(res =>{
      if(res.state){
        console.log('course accept');
        this.toastr.infoToastr(res.msg, 'Success!')
        setTimeout(()=>{
          window.location.reload();
        }, 450);

      }else{
        console.log('rejected');
      }
    })
  }

  giveRejectPermission(id: string){
    const permission = {
      value: false
    }
    this.courseService.givePermission(permission, id).subscribe(res =>{
      if(res.state){
        console.log('course reject');
        this.toastr.infoToastr(res.msg, 'Success!')
        setTimeout(()=>{
          window.location.reload();
        }, 450);
      }else{
        console.log('rejected');
      }
    })
  }

}
