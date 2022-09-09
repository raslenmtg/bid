import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthentificationService} from "../../../service/auth/AuthentificationService.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

declare var grecaptcha: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent  {
  loginForm: FormGroup;
  captchaError: boolean = false;
  constructor(private router: Router, private authService: AuthentificationService, private formbuilder: FormBuilder) {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
  /*  const response = grecaptcha.getResponse();
    console.log(response)
    if (response.length === 0) {
      this.captchaError = true;
      return;
    }*/

    this.authService.signIn(this.loginForm.get('email')!.value, this.loginForm.get('password')!.value).subscribe()

  }

}
