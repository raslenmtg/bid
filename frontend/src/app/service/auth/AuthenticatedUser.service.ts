import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {User} from "../../model/User.interface";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedUser {

  constructor() {
   this.refreshAuthenticatedUser()
  }
  private User= new BehaviorSubject<User|null>(null);

  public setAuthenticatedUser(user:User){
    this.User.next(user);
  }

  public getAuthenticatedUser():User|null{
    return this.User.getValue();
  }

  public refreshAuthenticatedUser():User|null{
    if(localStorage.getItem('token') != null&&this.getAuthenticatedUser()==null){
      try {
        // @ts-ignore
      this.setAuthenticatedUser(JSON.parse(jwt_decode(localStorage.getItem('token')!).sub));
      }catch (e) {
        localStorage.clear()
      }
    }
    return this.User.getValue();
  }

}
