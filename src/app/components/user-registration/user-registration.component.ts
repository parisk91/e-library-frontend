import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from 'src/app/shared/interfaces/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { Role } from 'src/app/shared/interfaces/role';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
    selector: 'app-user-registration',
    standalone: true,
    imports: [ReactiveFormsModule, MatButtonModule, MatInputModule, MatButtonModule, FormsModule, MatSelectModule, MatFormFieldModule, CommonModule],
    templateUrl: './user-registration.component.html',
    styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {
  userService = inject(UserService);
  router = inject(Router);

  registrationStatus: { success: boolean; message: string } = {
    success: false,
    message: 'Not attempted yet',
  };

  roles: Role[] = [
    {value: 'ADMIN', viewValue: 'ADMIN'},
    {value: 'USER', viewValue: 'USER'},
  ];

  userForm = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [
        Validators.required, 
        Validators.email
      ]),
      role: new FormControl('', Validators.required),
    },
    this.passwordConfirmValidator
  );

  passwordConfirmValidator(userForm: FormGroup) {
    if (userForm.get('password').value !== userForm.get('confirmPassword').value) {
      userForm.get('confirmPassword').setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(value: any) {
    console.log(value);
    this.checkOnSubmit();
  }

  registerAnotherUser() {
    this.userForm.reset();
    this.registrationStatus = { success: false, message: 'Not attempted yet' };
  }

  checkDuplicateEmail() {
    const email = this.userForm.get('email')?.value
    if (email) {
      this.userService.checkEmail(email).subscribe({
        next: (response) => {
          console.log(response)
          this.userForm.get('email')?.setErrors(null)},
        error: (response) => {
          console.log("Exists " + response)
          this.userForm.get('email')?.setErrors({duplicateEmail: true})
        }
      })
    }
  }

  checkOnSubmit() {
    const email = this.userForm.get('email')?.value

    const user : User = {
      id: null, 
      username: this.userForm.get('username')?.value || '',
      role: this.userForm.get('role')?.value || '',
      email: this.userForm.get('email')?.value || '',
      password: this.userForm.get('password')?.value || ''
    }

    if(email) {
      this.userService.checkEmail(email).subscribe({
        next: (response) => {
          this.userService.registerUser(user).subscribe({
            next: (response) => {
              console.log('User registered', response);
              this.registrationStatus = { success: true, message: "Success" };
            },
            error: (response) => {
              console.log('Error registering user', response);
              this.registrationStatus = { success: false, message: "Error" };
            },
          })
        },
        error: (response) => {
          console.log("WRONG", response)
        }
      })
    }  
  }
}
