import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo:"todo", pathMatch: "full"},
  {path:"todo", component: TodoListComponent, canActivate:[AuthGuard]},
  {path:"bookmarks", component: BookmarksComponent, canActivate:[AuthGuard]},
  {path:"login", component: LoginComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
