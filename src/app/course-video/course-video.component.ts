import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CourseService } from '../services/course.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-course-video',
  templateUrl: './course-video.component.html',
  styleUrls: ['./course-video.component.scss']
})
export class CourseVideoComponent implements OnInit {
  videos = [];
  course: any;
  courseId: {id: string }
  url: any;
  name: string;
  vidName:string;

  constructor(private a: DomSanitizer,
              private courseService: CourseService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
   //  this.videos.push(this.a.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+'Hnh0NtGtSuM'+'?enablejsapi=1'));
   //  this.url = this.a.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+'Hnh0NtGtSuM'+'?enablejsapi=1');
   this.courseId = {
    id: this.activatedRoute.snapshot.paramMap.get('id')
  };
   this.activatedRoute.params.subscribe(
    (params: Params) => {
      this.courseId.id = params['id'];
    }
  );
   this.courseService.displaycourse(this.courseId.id).subscribe(res =>{
      this.course = res;
      console.log(res);
      this.url = this.a.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+ res['firstVideoId'] +'?enablejsapi=1');
    })

  }

  setVideo(id,name,vidname){
    this.url = this.a.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+ id +'?enablejsapi=1');
    console.log(this.url);
    this.name = name;
    this.vidName = vidname;

  }


}
