import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from "../../model/User.interface";
import jwt_decode from "jwt-decode";
import {Router} from "@angular/router";
import {AuthenticatedUser} from "./AuthenticatedUser.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient, private router: Router,private AuthenticatedUser:AuthenticatedUser) {
  }

  signup(user:User): Observable<any> {
    return this.http.post<any>(environment.server_url + 'auth/register', user).pipe(map(res => this.setToken(res)));
  }

  updateProfile(user:User): Observable<any> {
    let payload=new FormData();
    Object.keys(user).forEach(key=>{
      // @ts-ignore
      payload.append(key,user[key])
    });
    return this.http.patch<any>(environment.server_url + 'profile', user)
  }

  updateProfilePicture(Photo:File){
    let formdata=new FormData();
    formdata.append('photo',Photo);
    return this.http.patch<any>(environment.server_url + 'profile/photo',formdata,{
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('sstk'))
    });
  }

  signIn(email: string, password: string): Observable<any> {
    return this.http.post<any>(environment.server_url +'auth/login', {email, password}).pipe(map(res => this.setToken(res)));
  }

  setToken(data:{token:string}){
    localStorage.setItem('token', data.token);
    let user=this.AuthenticatedUser.refreshAuthenticatedUser()!;
    this.router.navigateByUrl(user.role=="USER"?'/dashboard':'/admin');
  }


  verifyrecaptcha(response:any) {
    const body = new HttpParams()
      .set('secret', '6Le2Lf0UAAAAAB_-ytQevwQbLuhLHgO_ycD249W0')
      .set('response', response);
    return this.http.post<any>(environment.server_url + 'api/recaptchaverify', body.toString());

  }

  sendverificationcodeforgetpassword(mail:string) {
    return this.http.post<any>(environment.server_url + 'sendverificationcodeforgetpassword', mail);
  }

  changepassword(password:string) {
    const body = new HttpParams()
      .set('password', password);
    return this.http.patch<any>(environment.server_url + 'password/reset',body);
  }

  verifiecodeforgetpassword(code:string) {
    const body = new HttpParams()
      .set('code', code);
    return this.http.post<any>(environment.server_url + 'verifiecodeforgetpassword', body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  resendcodeemail() {
    return this.http.get<any>(environment.server_url + 'resendcode', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('sstk'))
    });
  }

  checkRole(): Observable<boolean> {
    return this.http.get<any>(environment.server_url +'checkrole', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded').append('Authorization', 'Bearer ' + localStorage.getItem('sstk'))
    });
  }

}
