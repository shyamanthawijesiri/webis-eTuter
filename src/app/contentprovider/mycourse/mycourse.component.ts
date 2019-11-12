import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-mycourse',
  templateUrl: './mycourse.component.html',
  styleUrls: ['./mycourse.component.scss']
})
export class MycourseComponent implements OnInit {
  pass: any;
  pending: any;
  accepted: any;
  rejected: any;
  admin:boolean;
  constructor(private userService: UserService, private courseService: CourseService) { }

  ngOnInit() {
    console.log('my course')
    this.pass = this.userService.loadToken();
    console.log(this.pass.id)

    if(this.pass.role === 'admin'){
        this.admin = true;
      }else{
        this.admin = false;

    }

    this.userService.getCPApprovedCourse(this.pass.id).subscribe(res =>{
      this.accepted = res;
      console.log(res);
    });
    this.userService.getCPPendingCourse(this.pass.id).subscribe(res =>{
      this.pending = res;
      console.log(res);
    });
    this.userService.getCPRejectCourse(this.pass.id).subscribe(res =>{
      this.rejected = res;
      console.log(res);
    });
  }



  onDelete(id: string){
    this.courseService.removeCourse(id).subscribe(res => {
      if(res.state){
        console.log('delete')
      }else{
        console.log('delete failed')
      }
    })

  }




}
