import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../model/User.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  deleteUser(id: string | number) {
    return this.http.delete(environment.server_url+'user/'+id)
  }

  saveUser(user: User) {
    return this.http.post<User>(environment.server_url+'user',user)
  }

  getUsers(){
    return this.http.get<User[]>(environment.server_url+'user')
  }



}
