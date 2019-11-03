import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  selectedFile: File = null;
  userId: any;
  userDetail: any;
  pass: any;
  passwordMatch: boolean = true;
  passwordrestForm: FormGroup;

    //update name
    fname: string;
    lname: string;

    //error msg
    incorrectPass: string;

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit() {


    this.passwordrestForm = this.fb.group({
      password : ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

    this.pass = this.userService.loadToken();
    this.userService. getUser(this.pass.id).subscribe(response => {
     this.userDetail = response;
      console.log('user details')
     console.log(this.userDetail);
     this.fname = this.userDetail.fname;
     this.lname = this.userDetail.lname;
   });

  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
  }


  updateName(){
    const user ={
      fname: this.fname,
      lname: this.lname
    }

    this.userService.updataAccount(user,this.pass.id).subscribe(data =>{
      console.log('update');
      console.log(data.state);
      if(data.state){
        console.log('update success');
        window.location.reload();
      }else{
        console.log('updata failed');

      }
    });


  }

  uploadImage(){
    this.userService.uploadImage(this.selectedFile,this.pass.id);
    window.location.reload();
  }

  changePassword(){
    if(this.passwordrestForm.get('newPassword').value === this.passwordrestForm.get('confirmPassword').value){
      console.log('matching');
      this.passwordMatch = true;
      this.userService.changePassword(this.passwordrestForm.value, this.pass.id).subscribe(res => {
        if(res.state){
          console.log('change password successfully');
          console.log(res.msg)

        }else{
          console.log('failed to change password');
          console.log(res.msg);
          this.incorrectPass = res.msg;
        }
      })

    }else{
      console.log('not matching')
      this.passwordMatch = false;
    }



  }

}
