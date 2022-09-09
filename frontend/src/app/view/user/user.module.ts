import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserComponent} from "./user.component";
import {UserRoutingModule} from "./user-routing.module";
import {HeaderComponent} from './header/header.component';
import {ProfileComponent} from './profile/profile.component';
import {PaymentComponent} from './payment/payment.component';
import { VoteComponent } from './vote/vote.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatSliderModule} from "@angular/material/slider";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    HeaderComponent,
    ProfileComponent,
    PaymentComponent,
    VoteComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatButtonModule
  ]
})
export class UserModule { }
