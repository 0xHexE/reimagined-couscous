import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DuplicateFinderComponent} from './duplicate-finder/duplicate-finder.component';

const routes: Routes = [{
  path: '',
  component: DuplicateFinderComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DuplicateFinderRoutingModule { }
