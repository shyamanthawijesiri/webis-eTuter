import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';

import { CatergoryService } from 'src/app/services/catergory.service';
import { SubcatergoryService } from 'src/app/services/subcatergory.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-addcatergory',
  templateUrl: './addcatergory.component.html',
  styleUrls: ['./addcatergory.component.scss']
})
export class AddcatergoryComponent implements OnInit {

  loadedCatergory: any;
  loadedSubcatergory: any;

  catergory: string;
  changeCatergory: string;
  subCatergory: any;
  catsize: number;
  objectKeys = Object.keys;
  whenClicked = [];
  whensub = [[],[]];
  constructor(private catergoryService: CatergoryService,
              private subCatergoryService: SubcatergoryService,
              private ngFlashMessageService: NgFlashMessageService,
              public toastr: ToastrManager) { }

  ngOnInit() {
    this.catergoryService.getCatergory().subscribe(res =>{
      this.loadedCatergory = res;
      this.catsize = this.objectKeys(res).length;
      for(let i=0; i<this.catsize; i++){


        this.whensub.push([false]);

        }
      console.log(this.loadedCatergory);
    });

    this.subCatergoryService.getSubcatergory().subscribe(res =>{
      this.loadedSubcatergory = res;
      console.log(res);
    });
  }



  addCatergory() {
    const catergory = {
      catergoryName: this.catergory
    }
    this.catergoryService.addCatergory(catergory).subscribe(res => {
      if (res.state) {
        console.log('added successfully');
        this.toastr.successToastr(res.msg, 'Success!')
      } else {
        console.log('failed');
        this.toastr.errorToastr(res.msg, 'Oops!');
      }
    });
    console.log(this.catergory);
  }

  addSubcatergory() {
    const subCatergory = {
      catergoryName: this.catergory,
      subCatergoryName: this.subCatergory
    };
    this.subCatergoryService.addSubcatergory(subCatergory).subscribe(res =>{
      if (res.state) {

        console.log('successfully add subcatergory');
        this.toastr.successToastr(res.msg, 'Success!');

        setTimeout(()=>{
          window.location.reload();
        }, 1000);

      } else {
        console.log('failed');
        this.toastr.errorToastr(res.msg, 'Oops!');

      }
    });
    // console.log(this.subcatergoryForm.get('name').value);

  }

  deleteSubcatergory(subCatergory: string) {
    this.subCatergoryService.deleteSubcatergory(subCatergory).subscribe((res: any) => {
      if (res.state) {
        console.log('delete Ok');
        this.toastr.successToastr(res.msg, 'Success!');
        setTimeout(()=>{
          window.location.reload();
        }, 1000);
      } else {
        console.log('delete failed');
        this.toastr.errorToastr(res.msg, 'Oops!');

      }
    });

  }

  deleteCatergory(catergory: string) {
    this.catergoryService.deleteCatergory(catergory).subscribe((res: any) => {
      if (res.state) {
        console.log('delete Ok');
        this.toastr.successToastr(res.msg, 'Success!');
        setTimeout(()=>{
          window.location.reload();
        }, 1000);
      } else {
        console.log('delete failed');
        this.toastr.errorToastr(res.msg, 'Oops!');
      }
    });

  }

  updateCatergory(id: string) {
    const catergory = {
      catergoryName: this.changeCatergory
    };
    this.catergoryService.updateCatergory(catergory, id).subscribe(res =>{
      if (res.state) {
        console.log('update ok');
        this.toastr.successToastr(res.msg, 'Success!');
        setTimeout(()=>{
          window.location.reload();
        }, 1000);
      } else {
        console.log('update failed');
        this.toastr.errorToastr(res.msg, 'Oops!');
      }
    });

  }





}
