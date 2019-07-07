import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
import {AuthGuard} from "./core/guards/auth.guard";
import { AuthLoginComponent } from './modules/auth/components/auth-login/auth-login.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthLoginComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  },
    {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
