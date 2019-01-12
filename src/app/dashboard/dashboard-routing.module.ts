import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ImportDialogComponent} from './import-dialog/import-dialog.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
}, {
  path: 'import',
  component: ImportDialogComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
