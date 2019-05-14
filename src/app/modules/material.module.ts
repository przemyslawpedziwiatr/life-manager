import { NgModule } from '@angular/core';
import {
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule
  } from '@angular/material';

const modules = [
    MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatListModule,
        MatToolbarModule,
        MatSidenavModule
];
  
@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule {}