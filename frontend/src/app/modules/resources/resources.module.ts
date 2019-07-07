import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResourcesPageComponent} from './components/resources-page/resources-page.component';
import {ResourcePageComponent} from './components/resource-page/resource-page.component';
import {ResourceComponent} from './components/resource/resource.component';
import {ResourcePictureComponent} from './components/resource-picture/resource-picture.component';
import {ResourceQuantityComponent} from './components/resource-quantity/resource-quantity.component';
import {ResourcePictureEditComponent} from './components/resource-picture-edit/resource-picture-edit.component';
import {ResourceBuyComponent} from './components/resource-buy/resource-buy.component';
import {ResourceBuyProvidersComponent} from './components/resource-buy-providers/resource-buy-providers.component';
import {ResourcesBarComponent} from './components/resources-bar/resources-bar.component';
import {ResourceViewComponent} from './components/resource-view/resource-view.component';
import {ResourceEditComponent} from './components/resource-edit/resource-edit.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCommonModule,
  MatGridListModule,
  MatInputModule,
  MatMenuModule, MatSelectModule
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import { MaterialModule } from '../material.module';
import { AuthGuard } from '../../core/guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const resourcesRoutes: Routes = [
  {
    path: 'resources',
    component: ResourcesPageComponent,
  },
  {
    path: 'resources/:id',
    component: ResourcePageComponent,
  },
  {
    path: 'resources-types',
    component: ResourceBuyProvidersComponent,
  }
];


@NgModule({
  declarations: [
    ResourcesPageComponent,
    ResourcePageComponent,
    ResourceComponent,
    ResourcePictureComponent,
    ResourceQuantityComponent,
    ResourcePictureEditComponent,
    ResourceBuyComponent,
    ResourceBuyProvidersComponent,
    ResourcesBarComponent,
    ResourceViewComponent,
    ResourceEditComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ResourcesModule { }
