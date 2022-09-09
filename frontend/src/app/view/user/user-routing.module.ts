import {RouterModule, Routes} from "@angular/router";
import {NgModule} from '@angular/core';
import {UserComponent} from "./user.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProfileComponent} from "./profile/profile.component";
import {PaymentComponent} from "./payment/payment.component";
import {VoteComponent} from "./vote/vote.component";

const routes: Routes = [
  {path: '',
  component: UserComponent,
  children: [
    {
      path: '',
      component:DashboardComponent,
    },
    {path:'profile',
      component:ProfileComponent
    },
    {path:'payment',
      component:PaymentComponent
    },
    {path:'vote',
      component:VoteComponent
    }



  ]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
