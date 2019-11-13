import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

 disable: boolean = false;
 userRole: any;
  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userRole = this.userService.loadToken().role
    if(this.userRole === 'admin' || this.userRole === 'superAdmin'){
      this.disable = true;
    }
  }

}
