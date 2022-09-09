import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LandingPageComponent} from './view/landing-page/landing-page.component';
import {SignInComponent} from './view/auth/sign-in/sign-in.component';
import {SignUpComponent} from './view/auth/sign-up/sign-up.component';
import {ResetPasswordComponent} from './view/auth/reset-password/reset-password.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpInterceptor} from "./config/HttpInterceptor.interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SignInComponent,
    SignUpComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:HttpInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
