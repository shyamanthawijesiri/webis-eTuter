import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-all-student',
  templateUrl: './all-student.component.html',
  styleUrls: ['./all-student.component.scss']
})
export class AllStudentComponent implements OnInit {
  allStudent: any;

  constructor(private userService: UserService,public toastr: ToastrManager) { }

  ngOnInit() {
    this.userService.getAllStudent().subscribe(res =>{
      this.allStudent = res;
      console.log(res)
    })
  }

  onDeleteStu(id:string){
    this.userService.deleteCP(id).subscribe((res:any) =>{
      if(res.state){
        console.log('delete')
        this.toastr.successToastr(res.msg, 'Success!');
        setTimeout(()=>{
          window.location.reload();
        }, 450);
      }else{
        console.log('error delete')
      }
    })
  }

}
