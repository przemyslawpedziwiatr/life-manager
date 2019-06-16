import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatListModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatProgressBarModule,
  MatButtonToggleModule,
  MatAutocompleteModule,
  MatIconModule,
  MatSelectModule,
  MatOptionModule
} from '@angular/material';

const modules = [
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatListModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
  MatProgressBarModule,
  MatAutocompleteModule,
  MatButtonToggleModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {
}
