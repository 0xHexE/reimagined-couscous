import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'dashboard',
}, {
  path: 'authentication',
  loadChildren: './authentication/authentication.module#AuthenticationModule',
}, {
  path: 'dashboard',
  loadChildren: './dashboard/dashboard.module#DashboardModule',
}, {
  path: 'duplicate-finder',
  loadChildren: './duplicate-finder/duplicate-finder.module#DuplicateFinderModule',
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
