import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories/categories.component';
import { AllPostComponent } from './post/all-post/all-post.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { EditPostComponent } from './post/edit-post/edit-post.component';
import { AuthLoginComponent } from './accounts/auth-login/auth-login.component';

const routes: Routes = [
  {path : "",component: AuthLoginComponent},
  {path : "dashboard",component: DashboardComponent},
  {path :"categories",component: CategoriesComponent},
  {path :"posts",component: AllPostComponent},
  {path :"posts/new",component: NewPostComponent},
  {path :"posts/edit/:id",component: EditPostComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
