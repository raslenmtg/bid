import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  Logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }









}
