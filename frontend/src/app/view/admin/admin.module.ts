import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from "./admin.component";
import {AdminRoutingModule} from "./admin-routing.module";
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { SessionComponent } from './session/session.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AdminComponent,
    UserComponent,
    ProductComponent,
    SessionComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MatFormFieldModule,
        MatTableModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatSelectModule
    ]
})
export class AdminModule { }
