import {AfterViewInit, Component, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {SessionService} from "../../../service/session.service";
import {ProductService} from "../../../service/product.service";

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements AfterViewInit {

  @ViewChild('productDialog', {static: true}) productDialog: any;
  @ViewChild(MatPaginator) paginator: any;
  //@ts-ignore
  @ViewChild(MatSort) sort: MatSort
  sessionForm: FormGroup;
  sessions = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['started_at', 'fininshed_at', 'participation_fees', 'winner_product_id','action'];
  photo:File|null=null
  products: any;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private SessionService: SessionService, private ProductService: ProductService) {
    this.sessionForm = fb.group({
      id: [''],
      started_at: ['', Validators.required],
      fininshed_at: [''],
      participation_fees: [''],
      winner_product_id: [''],
    })
    SessionService.getSessions().subscribe(data=>this.sessions.data=data)
    ProductService.getProducts().subscribe(data=>this.products=data)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.sessions.filter = filterValue.trim().toLowerCase();

    if (this.sessions.paginator) {
      this.sessions.paginator.firstPage();
    }
  }

  openDialog() {
    this.sessionForm.reset();
    this.dialog.open(this.productDialog)
  }

  ngAfterViewInit() {
    this.sessions.paginator = this.paginator
    this.sessions.sort = this.sort;
  }

getSessionProduct(productID:number){
    return this.products.find((el:any)=>el.id==productID)?.title
}

  deleteSession(id: number) {
    Swal.fire({
      text: 'Voulez-vous Supprimer ?',
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Oui',
      showDenyButton: true,
      denyButtonText: 'Non'
    }).then((swwetAlert) => {
      if (swwetAlert.isConfirmed)
        this.SessionService.deleteSession(id).subscribe(() => this.sessions.data = this.sessions.data.filter(sessions => sessions.id !== id));
    })
  }

  saveSession() {
    if (this.sessionForm.invalid)
      return;
    this.SessionService.saveSession(this.sessionForm.value).subscribe(sessions => {
      let index = this.sessions.data.findIndex(ea => ea.id === sessions.id)
      if (index === -1)
        this.sessions.data.push(sessions);
      else
        this.sessions.data[index] = sessions;
      this.sessions._updateChangeSubscription();
      this.sessionForm.reset();
      this.dialog.closeAll();
    });

  }

}
