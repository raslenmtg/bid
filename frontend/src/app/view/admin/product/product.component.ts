import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {ProductService} from "../../../service/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements AfterViewInit {
  @ViewChild('productDialog', {static: true}) productDialog: any;
  @ViewChild(MatPaginator) paginator: any;
  //@ts-ignore
  @ViewChild(MatSort) sort: MatSort
  productForm: FormGroup;
  products = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['title', 'description','action'];
  photo:File|null=null

  constructor(private fb: FormBuilder, private dialog: MatDialog, private ProductService: ProductService) {
    this.productForm = fb.group({
      id: [''],
      title: ['', Validators.required],
      description: [''],
      photo: [''],
    })
    ProductService.getProducts().subscribe(data=>this.products.data=data)

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();

    if (this.products.paginator) {
      this.products.paginator.firstPage();
    }
  }

  openDialog() {
    this.productForm.reset();
    this.dialog.open(this.productDialog)
  }

  ngAfterViewInit() {
    this.products.paginator = this.paginator
    this.products.sort = this.sort;
  }

  showProductDetails(id: number) {
    this.productForm.reset();
    let user = this.products.data.find(user => user.id === id)
    if (user != undefined) {
      this.productForm.patchValue(user);
      this.dialog.open(this.productDialog)
    }
  }



  deleteProduct(id: number) {
    Swal.fire({
      text: 'Voulez-vous Supprimer ?',
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Oui',
      showDenyButton: true,
      denyButtonText: 'Non'
    }).then((swwetAlert) => {
      if (swwetAlert.isConfirmed)
        this.ProductService.deleteProduct(id).subscribe(() => this.products.data = this.products.data.filter(products => products.id !== id));
    })
  }

  saveProduct() {
    if (this.productForm.invalid)
      return;
    this.ProductService.saveProduct(this.productForm.value).subscribe(Product => {
      let index = this.products.data.findIndex(ea => ea.id === Product.id)
      if (index === -1)
        this.products.data.push(Product);
      else
        this.products.data[index] = Product;
      this.products._updateChangeSubscription();
      this.productForm.reset();
      this.dialog.closeAll();
    });

  }

}
