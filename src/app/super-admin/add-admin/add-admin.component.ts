import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
registerForm: FormGroup;
  constructor(private fb: FormBuilder,private userService: UserService,public toastr: ToastrManager) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      fname: ['',Validators.required],
      lname: ['',Validators.required],
      email: ['',Validators.email],
      contact:['',Validators.required],
      password: ['',Validators.required],
      role: ['',Validators.required]
    });
  }

  onSubmit(){
    console.log(this.registerForm.value);
    this.userService.registerAdmin(this.registerForm.value).subscribe(res =>{
      if(res.state){
        this.toastr.successToastr(res.msg, 'Success!');
        console.log('success');
        setTimeout(()=>{
          window.location.reload();
        }, 1000);
      }else{
        console.log('errror');
        this.toastr.errorToastr(res.msg, 'Oops!');
      }

    })

  }

}
