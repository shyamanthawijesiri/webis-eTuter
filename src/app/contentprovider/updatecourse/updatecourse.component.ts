import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SubcatergoryService } from 'src/app/services/subcatergory.service';
import { CatergoryService } from 'src/app/services/catergory.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-updatecourse',
  templateUrl: './updatecourse.component.html',
  styleUrls: ['./updatecourse.component.scss']
})
export class UpdatecourseComponent implements OnInit {

  updateForm: FormGroup;
  loadedSubcatergory: any;
  loadedCatergory: any;
  catergory = '';
  courseId: any;

  name:string;
  description:string;
  mainCatergory:string;
  subcatregory:string;
  type:string;
  skillLevel:string;
  duration:string;

  constructor(private fb: FormBuilder,
              private subCatergoryService: SubcatergoryService,
              private catergoryService: CatergoryService,
              private activatedRoute: ActivatedRoute,
              private courseService: CourseService) { }

  ngOnInit() {


    this.updateForm = this.fb.group({
      name: [this.name,Validators.required],
      description: [this.description,Validators.required],
      catergory: [this.mainCatergory,Validators.required],
      subCatergory: [this.subCatergoryService,Validators.required],
      type: [this.type,Validators.required],
      skillLevel: [this.skillLevel,Validators.required],
      duration: [this.duration, Validators.required],
    });

    this.courseId = {
      id: this.activatedRoute.snapshot.paramMap.get('id')
    };
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.courseId.id = params['id'];
      }
    );



     // load subcatergories
    this.subCatergoryService.getSubcatergory().subscribe(res =>{
      this.loadedSubcatergory = res;
      console.log(res);

    });
    // load catergories
    this.catergoryService.getCatergory().subscribe(res =>{
      this.loadedCatergory = res;
      console.log(res);
    });
  }


  onUpdate(){
    this.courseService.updateCourse(this.updateForm.value,this.courseId.id).subscribe(res => {
      if(res.state){
        console.log('updated')
      }else{
        console.log('update failed')
      }
    })

  }

}
