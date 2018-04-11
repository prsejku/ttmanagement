import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { TimerHistoryComponent } from "./timer-history/timer-history.component"
import { DashboardComponent } from "./dashboard/dashboard.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'timer-history', component: TimerHistoryComponent },
  { path: 'profile', component: UserProfileComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }
