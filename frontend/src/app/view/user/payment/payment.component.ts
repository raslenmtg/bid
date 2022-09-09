import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  formatLabel(value: number) {
    if (value >= 100) {
      return Math.round(value / 100) + 'dt';
    }

    return value;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
