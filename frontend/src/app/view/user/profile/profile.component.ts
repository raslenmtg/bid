import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthentificationService} from "../../../service/auth/AuthentificationService.service";
import {AuthenticatedUser} from "../../../service/auth/AuthenticatedUser.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  ProfileForm: FormGroup;
  ChangePasswordForm: FormGroup;
  ProfilePhotoLink:String | null = null;
  @ViewChild('PasswordModal') PasswordModal: any;

  constructor(private router: Router, private authService: AuthentificationService, private formbuilder: FormBuilder, private authenticatedUser: AuthenticatedUser) {
    this.ProfileForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      phone: ['', [Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]{8}')]],
    });

    this.ChangePasswordForm = this.formbuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
    });


  }

  ngOnInit(): void {
    let user = this.authenticatedUser.getAuthenticatedUser()
    if (user) {
      this.ProfileForm.patchValue(user)
      if(user.photo){
        this.ProfilePhotoLink = user.photo
      }
    }
  }


  SubmitPasswordChange() {
    if (this.ChangePasswordForm.invalid) {
      return;
    }
    if (this.ChangePasswordForm.value.password != this.ChangePasswordForm.value.password_confirmation) {
      alert("Mot de passe n'est pas identique à la confirmation")
      return;
    }
    this.authService.changepassword(this.ChangePasswordForm.value.password).subscribe(() => {
      this.ChangePasswordForm.reset()
      Swal.fire("Succès", "Votre mot de passe a été mis à jour", "success");
    })
  }

  SubmitProfile() {
    if (this.ProfileForm.invalid) {
      console.log(this.ProfileForm.errors)
      return;
    }
    this.authService.updateProfile(this.ProfileForm.value).subscribe((token) => {
      localStorage.setItem('token', token)
      this.authenticatedUser.refreshAuthenticatedUser()
      Swal.fire("Succès", "Votre profile a été mis à jour", "success");
    })

  }


  SetAvatarProfile(event: any) {
    this.authService.updateProfilePicture(event.target.files[0]).subscribe((user) => {
      this.ProfilePhotoLink = user.photo
      this.authenticatedUser.setAuthenticatedUser(user)
    })
  }

  openDialog() {

  }
}
