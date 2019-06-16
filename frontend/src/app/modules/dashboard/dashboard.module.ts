import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardToolbarComponent } from './components/dashboard-toolbar/dashboard-toolbar.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { resourcesRoutes } from '../resources/resources.module';
import { Routes } from '@angular/router/src/config';
import { AuthGuard } from '../../core/guards/auth.guard';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      ... resourcesRoutes
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    DashboardToolbarComponent,
    DashboardSidebarComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    DashboardToolbarComponent,
    DashboardSidebarComponent,
    DashboardComponent,
  ]
})
export class DashboardModule {
}
