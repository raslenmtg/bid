import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../model/User.interface";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import Swal from "sweetalert2";
import {UserService} from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements AfterViewInit {

  @ViewChild('userDialog', {static: true}) UserDialog: any;
  @ViewChild(MatPaginator) paginator: any;
  //@ts-ignore
  @ViewChild(MatSort) sort: MatSort
  userForm: FormGroup;
  users = new MatTableDataSource<User>([]);
  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'phone', 'action'];

  constructor(private fb: FormBuilder, private dialog: MatDialog, private userService: UserService) {
    this.userForm = fb.group({
      id: [''],
      email: ['', Validators.email],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      photo: [''],
      password: [''],
      phone: [''],
    })

    userService.getUsers().subscribe(users=>this.users.data=users)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();

    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }

  openDialog() {
    this.userForm.reset();
    this.dialog.open(this.UserDialog)
  }

  ngAfterViewInit() {
    this.users.paginator = this.paginator
    this.users.sort = this.sort;
  }

  showUserDetails(id: number) {
    this.userForm.reset();
    let user = this.users.data.find(user => user.id === id)
    if (user != undefined) {
      // @ts-ignore
      this.userForm.controls.password.value = null
      this.userForm.patchValue(user);
      this.dialog.open(this.UserDialog)
    }
  }


  deleteUser(id: number) {
    Swal.fire({
      text: 'Voulez-vous Supprimer ?',
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Oui',
      showDenyButton: true,
      denyButtonText: 'Non'
    }).then((swwetAlert) => {
      if (swwetAlert.isConfirmed)
        this.userService.deleteUser(id).subscribe(() => this.users.data = this.users.data.filter(users => users.id !== id));
    })
  }

  saveUser() {
    if (this.userForm.invalid)
      return;
    this.userService.saveUser(this.userForm.value).subscribe(User => {
      let index = this.users.data.findIndex(ea => ea.id === User.id)
      if (index === -1)
        this.users.data.push(User);
      else
        this.users.data[index] = User;
      this.users._updateChangeSubscription();
      this.userForm.reset();
      this.dialog.closeAll();
    });

  }
}

