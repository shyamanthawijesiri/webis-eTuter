import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SubcatergoryService } from 'src/app/services/subcatergory.service';
import { CatergoryService } from 'src/app/services/catergory.service';
import { CourseService } from 'src/app/services/course.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss']
})
export class AddcourseComponent implements OnInit {
  loadedCatergory: any;
  loadedSubcatergory: any;
  catergory = '';
  fileName = 'Choose File';

    contentForm: FormGroup;

    user: any;
    loggedIn = false;
  constructor(private fb: FormBuilder,
              private subCatergoryService: SubcatergoryService,
              private catergoryService: CatergoryService,
              private courseService: CourseService,
              private http: HttpClient)
              { }

  ngOnInit() {


    this.subCatergoryService.getSubcatergory().subscribe(res =>{
      this.loadedSubcatergory = res;
      console.log(res);

    });

    this.catergoryService.getCatergory().subscribe(res =>{
      this.loadedCatergory = res;
      console.log(res);
    });


    this.contentForm = this.fb.group({
      name: ['',Validators.required],
      description: ['',Validators.required],
      catergory: ['',Validators.required],
      subCatergory: ['',Validators.required],
      type: ['',Validators.required],
      skillLevel: ['',Validators.required],
      duration: ['', Validators.required],
      topics: this.fb.array([this.fb.group({
        topic:['', Validators.required],
        videos : this.fb.array([new FormControl('',Validators.required)]),
        files: this.fb.array([new FormControl('', Validators.required)])
      })]),

    });


  }


  get topic() {
    return this.contentForm.get('topics') as FormArray;
    }




  addVideos(i){

    const vid = this.topic.at(i).get('videos') as FormArray;
    const file = this.topic.at(i).get('files') as FormArray;
    vid.push(new FormControl('',Validators.required));
    file.push(new FormControl('',Validators.required))

  }

  addFile(i){
    const file = this.topic.at(i).get('files') as FormArray;
    file.push(new FormControl('',Validators.required));
  }
  addTopic(){

    this.topic.push(this.fb.group({
      topic:['', Validators.required],
      videos : new FormArray([new FormControl('',Validators.required)]),
      files : new FormArray([new FormControl('',Validators.required)])
    })
    );
    // ((this.topic.controls[0] as FormGroup).get('videos') as FormArray).push(new FormControl('HELLO',Validators.required));
    console.log(this.contentForm.value);
  }
  onDelete(i: number) {
    (this.contentForm.get('topics') as FormArray).removeAt(i);

  }
  onDeleteFile(i: number){
    (this.topic.at(i).get('files') as FormArray).removeAt(i);
  }
  onDeleteVideo(i: number){
    (this.topic.at(i).get('videos') as FormArray).removeAt(i);
  }

  onSubmit(){
    console.log(this.contentForm.value);
  }

}
