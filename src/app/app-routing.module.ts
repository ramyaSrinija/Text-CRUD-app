import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { HomeComponent } from './home/home.component';
import { WordsComponent } from './words/words.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"words",component:WordsComponent},
  {path:"aboutme",component:AboutmeComponent},
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"**",redirectTo:"home",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
