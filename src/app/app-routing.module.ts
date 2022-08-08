import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ReportsDatatableComponent } from './components/reports-datatable/reports-datatable.component';
import { ReportsOverviewComponent } from './components/reports-overview/reports-overview.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SignupComponent } from './components/signup/signup.component';
import { TemplatesComponent } from './components/templates/templates.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'home',
    component: LandingPageComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'templates',
    component: TemplatesComponent
  },
  {
    path: 'reports',
    component: ReportsComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
