import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {AdminComponent} from "./admin.component";
import {UserComponent} from "./user/user.component";
import {ProductComponent} from "./product/product.component";
import {SessionComponent} from "./session/session.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path:'user', component: UserComponent},
      {path:'product', component: ProductComponent},
      {path:'session', component: SessionComponent}


    ]

  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
