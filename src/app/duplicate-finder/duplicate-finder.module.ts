import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DuplicateFinderRoutingModule } from './duplicate-finder-routing.module';
import { DuplicateFinderComponent } from './duplicate-finder/duplicate-finder.component';
import {MatButtonModule, MatCheckboxModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [DuplicateFinderComponent],
  imports: [
    CommonModule,
    DuplicateFinderRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    FormsModule,
  ],
})
export class DuplicateFinderModule { }
