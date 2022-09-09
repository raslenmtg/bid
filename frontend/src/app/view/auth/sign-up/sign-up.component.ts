import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthentificationService} from "../../../service/auth/AuthentificationService.service";
import {Router} from "@angular/router";

declare var grecaptcha: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent{
  captchaError: boolean = false;
  registerForm: FormGroup;

  constructor(private router: Router, private authService: AuthentificationService, private formbuilder: FormBuilder) {
    this.registerForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      phone: ['', Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern('[0-9]{8}')],

    });

  }



  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
  /*  const response = grecaptcha.getResponse();
    console.log(response)
    if (response.length === 0) {
      this.captchaError = true;
      return;
    }*/
    this.authService.signup(this.registerForm.value).subscribe()

  }


}
