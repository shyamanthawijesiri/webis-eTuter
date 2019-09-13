import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.scss']
})
export class CourseContentComponent implements OnInit {


  courseId: string;
  course: any;
  constructor(private activatedRoute: ActivatedRoute,
              private courseService: CourseService) { }

  ngOnInit() {
      // get activate route in course
      this.courseId = this.activatedRoute.snapshot.paramMap.get('id')

      // course
      this.courseService.displaycourse(this.courseId).subscribe(res => {
        this.course = res;
        console.log(res);
      })
  }

}
