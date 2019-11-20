import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';


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

    // delete course
    delPassword: string;

    // image
    url: any;
    imageView = false;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private router: Router,
              public toastr: ToastrManager,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.pass = this.userService.loadToken();
    if(this.pass.role === 'superAdmin' || this.pass.role === 'admin'){

      this.userId = {
        id: this.activatedRoute.snapshot.paramMap.get('id')
      };
      this.activatedRoute.params.subscribe(
        (params: Params) => {
          this.userId.id = params['id'];
        }
      );

    }else{
      this.userId = {
        id: this.pass.id
      }


  }




    this.passwordrestForm = this.fb.group({
      password : ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });


    this.userService. getUser(this.userId.id).subscribe(response => {
     this.userDetail = response;
      console.log('user details')
     console.log(this.userDetail);
     this.fname = this.userDetail.fname;
     this.lname = this.userDetail.lname;
   });

  }

  onFileSelected(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.url = event.target['result'];
      }
      this.imageView = true;

    }
    this.selectedFile = <File>event.target.files[0];
  }


  updateName(){
    const user ={
      fname: this.fname,
      lname: this.lname
    }

    this.userService.updataAccount(user,this.userId.id).subscribe(data =>{
      console.log('update');
      console.log(data.state);
      if(data.state){
        console.log('update success');
        this.toastr.successToastr(data.msg, 'Success!')
        setTimeout(()=>{
          window.location.reload();
     }, 2000);

      }else{
        this.toastr.errorToastr(data.msg, 'Oops!')
        console.log('updata failed');

      }
    });


  }

  uploadImage(){
    this.userService.uploadImage(this.selectedFile,this.userId.id).subscribe(res=>{
      if(res.state){
        console.log('success')
        this.toastr.successToastr(res.msg, 'Success!')
        setTimeout(()=>{
          window.location.reload();
     }, 2000);
      }else{
        this.toastr.errorToastr(res.msg, 'Oops!')
      }
    });


  }

  changePassword(){
    if(this.passwordrestForm.get('newPassword').value === this.passwordrestForm.get('confirmPassword').value){
      console.log('matching');
      this.passwordMatch = true;
      this.userService.changePassword(this.passwordrestForm.value, this.userId.id).subscribe(res => {
        if(res.state){
          this.toastr.successToastr(res.msg, 'Success!')
          console.log(res.msg)

        }else{
          console.log('failed to change password');
          console.log(res.msg);

          this.toastr.errorToastr(res.msg, 'Oops!')
        }
      })

    }else{
      console.log('not matching')
      this.passwordMatch = false;
    }



  }

  onDelete(){

    //console.log(del)
    this.userService.deleteAccount(this.userId.id,this.delPassword).subscribe((res:any) =>{
      console.log(this.userId.id)
      console.log(this.delPassword)
      if(res.state){
        console.log('successfully delete')
        this.userService.logout();
        this.router.navigateByUrl('/home');


      }else{
        console.log('error delete')
        this.toastr.errorToastr(res.msg, 'Oops!')
      }

    })

  }

}
