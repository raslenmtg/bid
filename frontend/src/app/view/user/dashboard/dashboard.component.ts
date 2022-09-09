import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../../service/session.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  next_session:Array<any> = [];
  past_session:Array<any> = [];

  constructor(private SessionService: SessionService) {
    SessionService.getSessions().subscribe(data=> {
      data.forEach(el=>{
        if (el.finished_at == null)
          this.next_session.push(el);
        else
          this.past_session.push(el);
      })

    })



  }

  ngOnInit(): void {
  }

}
