import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatCardModule, MatCheckboxModule, MatButtonModule, MatMenuModule, MatIconModule,
    MatDatepickerModule, MatToolbarModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatRadioModule,
    MatTableModule, MatDividerModule, MatExpansionModule, MatProgressSpinnerModule, MatSelectModule, MatChipsModule, MatButtonToggleModule,
    MatDialogModule
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
  ],
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
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    HttpService,
    TaskService,
    MessageService,
    AuthService,
    AuthGuard,
    RegisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
