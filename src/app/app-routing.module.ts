import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoxesComponent } from './boxes/boxes.component';
import { DpointsComponent } from './dpoints/dpoints.component';
import { AccountsComponent } from './accounts/accounts.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data:{roles:['Admin', 'Worker']}, children: [
      {path: 'boxes', component: BoxesComponent},
      {path: 'dpoints', component: DpointsComponent},
      {path: 'accounts', component: AccountsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
