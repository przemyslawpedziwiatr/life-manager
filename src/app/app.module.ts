import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthRegisterComponent } from './components/auth-register/auth-register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardToolbarComponent } from './components/dashboard-toolbar/dashboard-toolbar.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { MaterialModule } from './modules/material.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';

const ROUTES = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthLoginComponent },
  { path: 'dashboard', component: DashboardComponent }
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   canActivate: [AuthGuard],
  // },
];

@NgModule({
  declarations: [
    AppComponent,
    AuthLoginComponent,
    AuthRegisterComponent,
    DashboardComponent,
    DashboardToolbarComponent,
    DashboardSidebarComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(ROUTES),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
