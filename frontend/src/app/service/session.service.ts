import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Product} from "../model/Product.model";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http:HttpClient) { }

  deleteSession(id: string | number) {
    return this.http.delete(environment.server_url+'session/'+id)
  }

  saveSession(session: any) {
    return this.http.post<any>(environment.server_url+'session',session)
  }

  updateSession(session: any) {
    return this.http.patch<any>(environment.server_url+'session',session)
  }

  getSessions() {
    return this.http.get<any[]>(environment.server_url+'session')
  }



}
