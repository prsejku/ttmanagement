import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatCardModule, MatCheckboxModule, MatButtonModule, MatMenuModule, MatIconModule,
    MatDatepickerModule, MatToolbarModule, MatFormFieldModule, MatNativeDateModule, MatInputModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TimerComponent } from './timer/timer.component';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimerService } from "./timer.service";
import { MessageService } from "./message.service";
import { MessagesComponent } from './messages/messages.component';
import { HeaderComponent } from './header/header.component';
import { TimerHistoryComponent } from './timer-history/timer-history.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import {HttpModule} from "@angular/http";


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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatMenuModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [
    TimerService,
    MessageService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
