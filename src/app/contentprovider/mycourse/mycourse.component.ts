import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

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
  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log('my course')
    this.pass = this.userService.loadToken();
    console.log(this.pass.id)
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




}
