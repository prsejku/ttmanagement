import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { TimerHistoryComponent } from "./timer-history/timer-history.component"
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserProfileComponent} from "./user-profile/user-profile.component";
import { LoginComponent} from "./login/login.component";
import { AuthGuard } from "./auth.guard"

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'timer-history', component: TimerHistoryComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }
