import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-contentprovider',
  templateUrl: './contentprovider.component.html',
  styleUrls: ['./contentprovider.component.scss']
})
export class ContentproviderComponent implements OnInit {
    disabel: boolean = false;
    userRole: any;
  constructor(private userServicea: UserService) { }

  ngOnInit() {
    this.userRole = this.userServicea.loadToken().role
    if(this.userRole === 'admin' || this.userRole === 'superAdmin'){
      this.disabel = true;
    }
  }

}
