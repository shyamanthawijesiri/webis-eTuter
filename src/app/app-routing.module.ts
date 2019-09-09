import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DisplaycoursesComponent } from './displaycourses/displaycourses.component';
import { ContentproviderComponent } from './contentprovider/contentprovider.component';


const routes: Routes = [

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'displaycourses', component: DisplaycoursesComponent},
  {path: 'displaycourses/:catergory', component: DisplaycoursesComponent},
  {path: 'displaycourses/:catergory/:subCatergory', component: DisplaycoursesComponent},
  {path: 'contentprovider', component: ContentproviderComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
