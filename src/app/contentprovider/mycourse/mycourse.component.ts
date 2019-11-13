import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

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
  superAdmin:boolean;
  userId: {id: string }
  editDisable:boolean = false;
  constructor(private userService: UserService,
              private courseService: CourseService,
              private activatedRoute: ActivatedRoute,
              public toastr: ToastrManager
              ) { }

  ngOnInit() {
    console.log('my course')
    this.pass = this.userService.loadToken();
    console.log(this.pass.role)


    if(this.pass.role === 'superAdmin'){
        this.superAdmin = true;

        this.userId = {
          id: this.activatedRoute.snapshot.paramMap.get('id')
        };
        this.activatedRoute.params.subscribe(
          (params: Params) => {
            this.userId.id = params['id'];
          }
        );

      }else if(this.pass.role === 'admin'){
        this.superAdmin = false;
        this.userId = {
          id: this.activatedRoute.snapshot.paramMap.get('id')
        };
        this.activatedRoute.params.subscribe(
          (params: Params) => {
            this.userId.id = params['id'];
          }
        );


      }else{
        this.superAdmin = false;
        this.userId = {
          id: this.pass.id
        }


    }

    this.userService.getCPApprovedCourse(this.userId.id).subscribe(res =>{
      this.accepted = res;
      console.log(res);
    });
    this.userService.getCPPendingCourse(this.userId.id).subscribe(res =>{
      this.pending = res;
      console.log(res);
    });
    this.userService.getCPRejectCourse(this.userId.id).subscribe(res =>{
      this.rejected = res;
      console.log(res);
    });
  }



  onDelete(id: string){
    this.courseService.removeCourse(id).subscribe(res => {
      if(res.state){
        this.toastr.successToastr(res.msg, 'Success!');
        console.log('delete')
        setTimeout(()=>{
          window.location.reload();
        }, 1000);
      }else{
        this.toastr.errorToastr(res.msg, 'Oops!')
        console.log('delete failed')
      }
    })

  }




}
