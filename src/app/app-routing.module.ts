import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { TimerComponent } from "./timer/timer.component"
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'timer', component: TimerComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }
