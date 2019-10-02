import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatIconModule
 } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { DisplaycoursesComponent } from './displaycourses/displaycourses.component';
import { DurationPipe } from './pipes/duration.pipe';
import { SkillLevelPipe } from './pipes/skill-level.pipe';
import { TypePipe } from './pipes/type.pipe';
import { ContentproviderComponent } from './contentprovider/contentprovider.component';
import { AddcourseComponent } from './contentprovider/addcourse/addcourse.component';
import { SubcatergoryPipe } from './pipes/subcatergory.pipe';
import { MycourseComponent } from './contentprovider/mycourse/mycourse.component';
import { CourseContentComponent } from './displaycourses/course-content/course-content.component';
import { AdminComponent } from './admin/admin.component';
import { AddcatergoryComponent } from './admin/addcatergory/addcatergory.component';
import { RecentAddedCourseComponent } from './admin/recent-added-course/recent-added-course.component';


export function tokenGetter() {
  return localStorage.getItem('id_token');
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    ShortenPipe,
    DisplaycoursesComponent,
    DurationPipe,
    SkillLevelPipe,
    TypePipe,
    ContentproviderComponent,
    AddcourseComponent,
    SubcatergoryPipe,
    MycourseComponent,
    CourseContentComponent,
    AdminComponent,
    AddcatergoryComponent,
    RecentAddedCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter
      }
    }),
    MDBBootstrapModule.forRoot(),
    NgFlashMessagesModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
