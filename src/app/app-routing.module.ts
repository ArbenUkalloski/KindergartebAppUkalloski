import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KindergartenDetailComponent } from './kindergarten-detail/kindergarten-detail.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'Kindergarten-detail', component: KindergartenDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
