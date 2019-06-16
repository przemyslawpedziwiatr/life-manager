import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthRegisterComponent } from './components/auth-register/auth-register.component';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/auth';

const ROUTES = [
  { path: 'login', component: AuthLoginComponent }
];

@NgModule({
  declarations: [AuthLoginComponent,
    AuthRegisterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthLoginComponent,
    AuthRegisterComponent
  ]
})
export class AuthModule {
}
