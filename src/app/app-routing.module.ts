import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { PostsListComponent } from './component/post/posts-list/posts-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AddPostComponent } from './component/post/add-post/add-post.component';
import { EditPostComponent } from './component/post/edit-post/edit-post.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {
    path:'posts',
    component:PostsListComponent,
    children:[
      {path:'add', component:AddPostComponent},
      {path:'edit/:id', component:EditPostComponent}
    ]
  },
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
