import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatCardModule, MatCheckboxModule, MatButtonModule, MatMenuModule, MatIconModule,
    MatDatepickerModule, MatToolbarModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatRadioModule,
    MatTableModule, MatDividerModule, MatExpansionModule, MatProgressSpinnerModule, MatSelectModule, MatChipsModule, MatButtonToggleModule,
    MatDialogModule, MatSidenavModule, MatSortModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TimerComponent } from './timer/timer.component';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpService } from "./http.service";
import { MessageService } from "./message.service";
import { MessagesComponent } from './messages/messages.component';
import { HeaderComponent } from './header/header.component';
import { TimerHistoryComponent } from './timer-history/timer-history.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { ProjectsComponent } from './projects/projects.component';
import {TaskService} from './task.service';
import { ProjectTableComponent } from './projects/project-table/project-table.component';
import { WorkPackTableComponent } from './projects/work-pack-table/work-pack-table.component';
import { TaskTableComponent } from './projects/task-table/task-table.component';
import { RegistrationComponent } from './registration/registration.component';
import {RegisterService} from './register.service';
import {OpenService} from './menu/open.service';
import {TaskDetailComponent} from './projects/task-detail/task-detail.component';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {ReportingService} from './reporting.service';
import {ChartsModule} from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    TimerComponent,
    MenuComponent,
    DashboardComponent,
    MessagesComponent,
    HeaderComponent,
    TimerHistoryComponent,
    LoginComponent,
    ProjectsComponent,
    ProjectTableComponent,
    WorkPackTableComponent,
    TaskTableComponent,
    RegistrationComponent,
    TaskDetailComponent,
    ConfirmationDialogComponent
  ],
  entryComponents: [
    TaskDetailComponent,
    ConfirmationDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatDatepickerModule,
    MatDialogModule,
    MatMenuModule,
    MatToolbarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatRadioModule,
    MatTableModule,
    MatInputModule,
    MatDividerModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
  ],
  providers: [
    HttpService,
    TaskService,
    MessageService,
    AuthService,
    AuthGuard,
    RegisterService,
    OpenService,
    ReportingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
