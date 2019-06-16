import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResourcesModule } from './modules/resources/resources.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http';
import { ApiInterceptor } from './core/interceptor/interceptor';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    !environment.production ? [] : AkitaNgDevtools.forRoot(),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    DashboardModule,
    ResourcesModule,
    AuthModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
