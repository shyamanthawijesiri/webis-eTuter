import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-video',
  templateUrl: './course-video.component.html',
  styleUrls: ['./course-video.component.scss']
})
export class CourseVideoComponent implements OnInit {
  videos = [];
  course: any;
  url: any;
  name: string;
  vidName:string;
  constructor(private a: DomSanitizer, private courseService: CourseService) { }

  ngOnInit() {
   //  this.videos.push(this.a.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+'Hnh0NtGtSuM'+'?enablejsapi=1'));
   //  this.url = this.a.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+'Hnh0NtGtSuM'+'?enablejsapi=1');

    this.courseService.displaycourse('5dc0f95e06bf736c081704b1').subscribe(res =>{
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
