import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from "./view/auth/sign-in/sign-in.component";
import {SignUpComponent} from "./view/auth/sign-up/sign-up.component";
import {LandingPageComponent} from "./view/landing-page/landing-page.component";
import {AuthGuard} from "./config/auth.guard";


const routes: Routes = [
  {
    path: '',
    component:LandingPageComponent
  },
  {
    path: 'signin',
    component:SignInComponent
  },
  {
    path: 'signup',
    component:SignUpComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./view/user/user.module').then(m => m.UserModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {
      expectedRole: ['USER']
    }
  },
  {
    path: 'admin',
    loadChildren: () => import('./view/admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {
      expectedRole: ['ADMIN']
    }
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
